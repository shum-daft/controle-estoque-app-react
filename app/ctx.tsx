import { createContext, useContext } from "react";
import { useStorageState } from "../hooks/UseStorageState";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "@/firebase.config";
import { router, useRouter } from "expo-router";

const AuthContext = createContext<{
  signIn: ({ email, password }: { email: string; password: string }) => void;
  signUp: ({ email, password }: { email: string; password: string }) => void;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
}>({
  signIn: ({ email, password }) => null,
  signUp: ({ email, password }) => null,
  signOut: () => null,
  session: null,
  isLoading: false,
});

export function useSession() {
  const value = useContext(AuthContext);
  return value;
}

export default function SessionProvider(props: React.PropsWithChildren) {
  const router = useRouter();
  const [[isLoading, session], setSession] = useStorageState("session");
  return (
    <AuthContext.Provider
      value={{
        signIn: async ({ email, password }) => {
          const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
          );
          const user = userCredential.user;

          onAuthStateChanged(auth, async (user: any) => {
            if (user) {
              await AsyncStorage.setItem("@user_id", user.uid);
              return user;
            } else {
              alert("Usuário não autenticado");
            }
          });

          return user;
        },
        signUp: async ({ email, password }) => {
          const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );
          const user = userCredential;

          onAuthStateChanged(auth, async (user: any) => {
            if (user) {
              await AsyncStorage.setItem("@user_id", user.uid);
              return user;
            } else {
              alert("Usuário não autenticado");
            }
          });
          return user;
        },
        signOut: async () => {
          setSession(null);
          await AsyncStorage.removeItem("@user_id");
          router.push("/login");
        },
        session,
        isLoading,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
