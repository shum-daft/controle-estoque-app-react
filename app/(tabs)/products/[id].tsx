import { useSession } from "@/app/ctx";
import { db } from "@/firebase.config";
import type { Product } from "@/global/types";
import { useRefreshStore } from "@/store/use-refresh-store";
import { useLocalSearchParams, useRouter } from "expo-router";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import {
  BellSimple,
  LineVertical,
  Minus,
  Package,
  Plus,
} from "phosphor-react-native";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type ProductUpdate = Product & { [x: string]: any };

export default function Product() {
  const addRefresh = useRefreshStore((state) => state.addRefresh);
  const refresh = useRefreshStore((state) => state.refresh);
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { signOut } = useSession();

  const [isLoading, setIsLoading] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);
  const [projectToUpdate, setProductToUpdate] = useState<ProductUpdate>({
    id: "",
    name: "",
    amount: 0,
    description: "",
    price: "",
  });
  const [updatedProduct, setUpdatedProduct] = useState<
    Product | null | { [x: string]: any }
  >(null);

  const getData = async () => {
    const productRef = doc(db, `product/${id}`);
    const productSnapshot = await getDoc(productRef);

    if (productSnapshot.exists()) {
      const product = productSnapshot.data() as Product;
      setProduct(product);
      44;
      setProductToUpdate({
        id: id.toString(),
        name: product.name,
        description: product.description,
        price: product.price,
        amount: product.amount,
      });
    } else {
      alert("Produto não encontrado");
    }
  };

  useEffect(() => {
    getData();
  }, [id, updatedProduct]);

  const handleUpdateProduct = async () => {
    setIsLoading(true);
    try {
      const productRef = doc(db, `product/${id}`);
      await updateDoc(productRef, projectToUpdate as { [x: string]: any });
    } catch (error: any) {
      alert("Erro ao atualizar o produto: " + JSON.stringify(projectToUpdate));
    } finally {
      setIsLoading(false);
      alert("Produto atualizado com sucesso!");
      addRefresh(1);
    }
  };

  return (
    <SafeAreaView className="flex-1 items-center bg-primary px-7 pt-7 pb-24 gap-8">
      <View className="w-full flex flex-row items-center justify-between">
        <Text className="font-bold font-sans text-4xl text-white text-left">
          Produto:{"\n"}Água sanitária
        </Text>
        <TouchableOpacity
          onPress={() => signOut}
          className="w-24 h-8 bg-white rounded-md justify-center items-center gap-2"
        >
          <Text className="font-bold font-sans text-md text-black">Sair</Text>
        </TouchableOpacity>
      </View>
      <View className="w-full flex flex-col gap-6 border border-border px-4 py-4 rounded-md">
        <View className="flex-row items-center justify-between">
          <Text className="font-semibold font-sans text-[22px] text-white">
            Quantidade em estoque
          </Text>
          <Package size={24} color="#948F8B" />
        </View>
        <View className="flex-row items-center gap-6">
          <Text className="font-bold font-sans text-[32px] text-white">
            {projectToUpdate.amount}
          </Text>
          <View className="h-10 w-20 bg-white rounded-md flex flex-row items-center justify-center gap-2">
            <TouchableOpacity
              onPress={() =>
                setProductToUpdate({
                  ...projectToUpdate,
                  amount: projectToUpdate.amount + 1,
                })
              }
            >
              <Plus size={16} color="#000000" weight="bold" />
            </TouchableOpacity>
            <LineVertical size={16} color="#000000" weight="bold" />
            <TouchableOpacity
              onPress={() =>
                setProductToUpdate({
                  ...projectToUpdate,
                  amount: projectToUpdate.amount - 1,
                })
              }
            >
              <Minus size={16} color="#000000" weight="bold" />
            </TouchableOpacity>
          </View>
        </View>
        <Text className="font-semibold font-sans text-md text-text">
          Aumente ou diminua a quantidade do produto
        </Text>
      </View>
      <View className="w-full flex flex-col gap-8">
        <TextInput
          className="w-full h-12 rounded-md border border-border px-4 text-text"
          placeholderTextColor="#948F8B"
          placeholder="Nome do produto"
          value={projectToUpdate.name}
          onChangeText={(text) =>
            setProductToUpdate({ ...projectToUpdate, name: text })
          }
        />
        <TextInput
          className="w-full h-12 rounded-md border border-border px-4 text-text"
          placeholderTextColor="#948F8B"
          placeholder="Descrição do produto"
          value={projectToUpdate.description}
          onChangeText={(text) =>
            setProductToUpdate({ ...projectToUpdate, description: text })
          }
        />
        <TextInput
          className="w-full h-12 rounded-md border border-border px-4 text-text"
          placeholderTextColor="#948F8B"
          placeholder="Valor unitário"
          value={projectToUpdate.price}
          onChangeText={(text) =>
            setProductToUpdate({ ...projectToUpdate, price: text })
          }
        />
      </View>
      <TouchableOpacity
        className="w-full h-12 rounded-md flex items-center justify-center bg-blue"
        onPress={handleUpdateProduct}
      >
        {isLoading ? (
          <ActivityIndicator size="large" color="#fff" />
        ) : (
          <Text className="font-bold font-sans text-base text-white">
            Atualizar produto
          </Text>
        )}
      </TouchableOpacity>
    </SafeAreaView>
  );
}
