import logoImg from "@/assets/images/logo.png";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Redirect, useRouter } from "expo-router";
import { useEffect } from "react";
import { Image, SafeAreaView } from "react-native";

export default function Index() {
  const router = useRouter();

  async function handleGetSession() {
    const userId = await AsyncStorage.getItem("@user_id");
    if (!userId) {
      router.push("/login");
    }
    if (userId) {
      router.push("/(tabs)");
    }
  }

  useEffect(() => {
    handleGetSession();
  }, []);

  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-primary">
      <Image source={logoImg} className="scale-[.45]" />
    </SafeAreaView>
  );
}
