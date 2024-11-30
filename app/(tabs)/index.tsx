import ProductListItem from "@/components/product-list-item";
import { db } from "@/firebase.config";
import type { Product } from "@/global/types";
import { useRouter } from "expo-router";
import { usePathname } from "expo-router/build/hooks";
import SkeletonLoading from "expo-skeleton-loading";
import { collection, getDocs } from "firebase/firestore";
import { Package } from "phosphor-react-native";
import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSession } from "../ctx";

export default function HomeScreen() {
  const router = useRouter();
  const pathname = usePathname();
  const { signOut } = useSession();

  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);

  const getData = async () => {
    try {
      setIsLoading(true);
      const productsCollectionRef = collection(db, "product");
      const querySnapshot = await getDocs(productsCollectionRef);

      const products: Product[] = querySnapshot.docs.map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
          } as Product)
      );

      setProducts(products.reverse());
      setIsLoading(false);
    } catch (error: any) {
      alert("Erro ao buscar os produtos: " + error.message);
    }
  };

  useEffect(() => {
    getData();
  }, [pathname]);

  return (
    <SafeAreaView className="flex-1 items-center bg-primary px-7 pt-7 pb-24 gap-8">
      <View className="w-full flex flex-row items-center justify-between">
        <Text className="font-bold font-sans text-4xl text-white text-left">
          Olá,{"\n"}bem vindo!
        </Text>
        <TouchableOpacity
          onPress={() => signOut()}
          className="w-24 h-8 bg-white rounded-md justify-center items-center gap-2"
        >
          <Text className="font-bold font-sans text-md text-black">Sair</Text>
        </TouchableOpacity>
      </View>
      <View className="w-full flex flex-col gap-6 border border-border px-4 py-4 rounded-md">
        <View className="flex-row items-center justify-between">
          <Text className="font-semibold font-sans text-[22px] text-white">
            Produtos cadastrados
          </Text>
          <Package size={24} color="#948F8B" />
        </View>
        {isLoading ? (
          <SkeletonLoading background={"#201E1E"} highlight={"#ffffff"}>
            <View className="bg-border rounded-md h-[32px] w-1/3"></View>
          </SkeletonLoading>
        ) : (
          <Text className="font-bold font-sans text-[32px] text-white">
            {products.length}
          </Text>
        )}
        {isLoading ? (
          <SkeletonLoading background={"#201E1E"} highlight={"#ffffff"}>
            <View className="bg-border rounded-md h-[14px] w-full"></View>
          </SkeletonLoading>
        ) : (
          <Text className="font-regular font-sans text-sm text-text">
            {products.filter((product) => product.amount < 10).length} produtos
            com menos de 10 unidades
          </Text>
        )}
      </View>
      <View className="flex-1 w-full border border-border px-4 py-4 rounded-md">
        <View className="flex-row items-center justify-between">
          <Text className="font-semibold font-sans text-[22px] text-white">
            Últimos cadastros
          </Text>
          <Package size={24} color="#948F8B" />
        </View>
        <View className="pt-6 pb-6 flex-1" style={{ overflow: "hidden" }}>
          {isLoading ? (
            <SkeletonLoading background={"#201E1E"} highlight={"#ffffff"}>
              <View className="bg-border rounded-md h-[32px] w-full">
                <View className="bg-border rounded-md h-[32px] w-1/3"></View>
              </View>
            </SkeletonLoading>
          ) : (
            products.map((item, index) => (
              <ProductListItem product={item} key={index} />
            ))
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}
