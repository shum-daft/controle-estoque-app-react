import { db } from "@/firebase.config";
import { useRouter } from "expo-router";
import { addDoc, collection } from "firebase/firestore";
import { BellSimple, Package } from "phosphor-react-native";
import { useState } from "react";
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSession } from "../ctx";

export default function NewProduct() {
  const router = useRouter();
  const { signOut } = useSession();

  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const newProduct = {
        name,
        description,
        price,
        amount: parseInt(amount),
      };

      const productsCollectionRef = collection(db, "product");
      await addDoc(productsCollectionRef, newProduct);

      setName("");
      setDescription("");
      setPrice("");
      setAmount("");
    } catch (error: any) {
      alert("Erro ao cadastrar o produto: " + error.message);
    } finally {
      setIsLoading(false);
      alert("Produto cadastrado com sucesso!");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-primary px-7 pt-7 pb-24 gap-8">
      <View className="w-full flex flex-row items-center justify-between">
        <Text className="font-bold font-sans text-4xl text-white text-left">
          Cadastre{"\n"}um novo produto
        </Text>
        <TouchableOpacity
          onPress={() => signOut}
          className="w-24 h-8 bg-white rounded-md justify-center items-center gap-2"
        >
          <Text className="font-bold font-sans text-md text-black">Sair</Text>
        </TouchableOpacity>
      </View>
      <Text className="font-semibold font-sans text-xl text-text text-left">
        Preencha os campos abaixo{"\n"}para cadastrar um novo produto
      </Text>
      <View className="w-full flex flex-col gap-8">
        <TextInput
          className="w-full h-12 rounded-md border border-border px-4 text-text"
          placeholderTextColor="#948F8B"
          placeholder="Nome do produto"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          className="w-full h-12 rounded-md border border-border px-4 text-text"
          placeholderTextColor="#948F8B"
          placeholder="Descrição do produto"
          value={description}
          onChangeText={setDescription}
        />
        <TextInput
          className="w-full h-12 rounded-md border border-border px-4 text-text"
          placeholderTextColor="#948F8B"
          placeholder="Quantidade em estoque"
          value={amount}
          onChangeText={setAmount}
        />
        <TextInput
          className="w-full h-12 rounded-md border border-border px-4 text-text"
          placeholderTextColor="#948F8B"
          placeholder="Valor unitário"
          value={price}
          onChangeText={setPrice}
        />
      </View>
      <TouchableOpacity
        onPress={handleSubmit}
        className="w-full h-12 rounded-md flex items-center justify-center bg-blue"
      >
        {isLoading ? (
          <ActivityIndicator size="large" color="#fff" />
        ) : (
          <Text className="font-bold font-sans text-base text-white">
            Cadastrar
          </Text>
        )}
      </TouchableOpacity>
    </SafeAreaView>
  );
}
