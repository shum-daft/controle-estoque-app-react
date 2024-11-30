import logoImg from "@/assets/images/logo.png";
import { useRouter } from "expo-router";
import { Eye, EyeSlash } from "phosphor-react-native";
import { useState } from "react";
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSession } from "./ctx";

export default function SignUp() {
  const router = useRouter();
  const { signUp } = useSession();

  const [hide, setHide] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const isValidEmail = (email: string) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
  };

  const handleSignUp = async () => {
    setLoading(true);
    try {
      if (!isValidEmail(email)) {
        alert("Erro: Email inválido");
        return null;
      }
      const auth = signUp({ email, password });
    } catch (error: Error | any) {
      alert("Falha no cadastro: " + error.message);
    } finally {
      setLoading(false);
      router.replace("/(tabs)");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-primary px-10">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "center",
            alignItems: "center", // Centraliza todos os itens
          }}
        >
          {/* Centralizando a imagem dentro do ScrollView */}
          <View style={{ alignItems: "center", marginBottom: 30 }}>
            <Image source={logoImg} className="scale-[.45]" />
          </View>

          <View className="flex-1 w-full flex flex-col gap-14 px-10">
            <View className="flex flex-col">
              <Text className="font-bold font-sans text-3xl text-white text-center">
                Cadastro
              </Text>
              <Text className="font-regular font-sans text-base text-text text-center">
                Preencha os campos para fazer realizar seu cadastro.
              </Text>
            </View>
            <View className="flex flex-col gap-8">
              <TextInput
                className="w-full h-12 rounded-md border border-border px-4 text-text"
                placeholderTextColor="#948F8B"
                placeholder="Nome completo"
              />
              <TextInput
                className="w-full h-12 rounded-md border border-border px-4 text-text"
                placeholderTextColor="#948F8B"
                placeholder="Endereço de e-mail"
                autoCapitalize="none"
                value={email}
                onChangeText={(text) => setEmail(text)}
              />
              <View className="w-full h-12 flex flex-row items-center justify-between rounded-md border border-border px-4">
                <TextInput
                  className="flex-1 text-text"
                  placeholderTextColor="#948F8B"
                  placeholder="Senha"
                  secureTextEntry={hide}
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                />
                <TouchableOpacity onPress={() => setHide(!hide)}>
                  {(hide && <EyeSlash size={24} color="#948F8B" />) || (
                    <Eye size={24} color="#948F8B" />
                  )}
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity
              className="w-full h-12 rounded-md flex items-center justify-center bg-blue"
              onPress={handleSignUp}
            >
              {loading ? (
                <ActivityIndicator color="#fff" size="large" />
              ) : (
                <Text className="font-bold font-sans text-base text-white">
                  Entrar
                </Text>
              )}
            </TouchableOpacity>
            <View className="flex flex-row items-center justify-center">
              <Text className="font-regular font-sans text-base text-text text-center">
                Já possui uma conta?
              </Text>
              <TouchableOpacity onPress={() => router.replace("/login")}>
                <Text className="font-regular font-sans text-base text-blue text-center">
                  {" "}
                  Entre agora!
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
