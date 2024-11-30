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
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSession } from "./ctx";

export default function Login() {
  const router = useRouter();
  const { signIn } = useSession();

  const [hide, setHide] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    try {
      const auth = signIn({ email, password });
    } catch (error: Error | any) {
      alert("Falha no login, verifique suas credenciais: " + error.message);
    } finally {
      setLoading(false);
      router.replace("/(tabs)");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <SafeAreaView className="flex-1 items-center justify-center bg-primary px-10">
        <Image source={logoImg} className="scale-[.45]" />
        <View className="flex-1 w-full flex flex-col gap-14 px-10">
          <View className="flex flex-col">
            <Text className="font-bold font-sans text-3xl text-white text-center">
              Entrar
            </Text>
            <Text className="font-regular font-sans text-base text-text text-center">
              Preencha os campos para fazer login.
            </Text>
          </View>
          <View className="flex flex-col gap-8">
            <TextInput
              autoCapitalize="none"
              value={email}
              onChangeText={(text) => setEmail(text)}
              className="w-full h-12 rounded-md border border-border px-4 text-text"
              placeholderTextColor="#948F8B"
              placeholder="Endereço de e-mail"
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
            onPress={handleLogin}
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
              Ainda não possui uma conta?
            </Text>
            <TouchableOpacity onPress={() => router.replace("/signup")}>
              <Text className="font-regular font-sans text-base text-blue text-center">
                {" "}
                Crie agora!
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
