import { db } from "@/firebase.config";
import type { Product } from "@/global/types";
import { useRouter } from "expo-router";
import { deleteDoc, doc } from "firebase/firestore";
import { Pencil, Trash } from "phosphor-react-native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface ProductListItemProps {
  product: Product;
}

export default function ProductListItem({ product }: ProductListItemProps) {
  const router = useRouter();

  const handleDeleteProduct = async () => {
    try {
      const productRef = doc(db, `product/${product.id}`);
      await deleteDoc(productRef);
      alert("Produto excluido com sucesso!");
      setTimeout(() => {
        router.replace("/(tabs)/products");
      }, 1000);
    } catch (error: any) {
      alert("Erro ao excluir o produto: " + error.message);
    }
  };

  return (
    <View
      style={styles.container}
      className="flex-row items-center justify-between"
    >
      <View className="gap-1">
        <Text className="font-semibold font-sans text-base text-white">
          {product.name}
        </Text>
        <Text className="font-regular font-sans text-xs text-text">
          {product.amount} unidades
        </Text>
      </View>
      <View className="flex-row items-center gap-4">
        <TouchableOpacity
          onPress={() => {
            router.replace(`/products/${product.id}`);
          }}
        >
          <Pencil size={24} color="#006FCE" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleDeleteProduct}>
          <Trash size={24} color="#948F8B" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: "#201E1E",
    marginBottom: 16,
    paddingBottom: 8,
  },
});
