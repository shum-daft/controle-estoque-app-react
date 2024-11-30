import { collection, onSnapshot } from "firebase/firestore";
import * as Notifications from "expo-notifications";
import { db } from "@/firebase.config";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function monitorLowStockProducts() {
  const productsRef = collection(db, "product");

  onSnapshot(productsRef, async (snapshot) => {
    if (snapshot.empty) {
      return;
    }

    const notifiedProducts = JSON.parse(
      (await AsyncStorage.getItem("notifiedProducts")) || "[]"
    );

    snapshot.docs.forEach((doc) => {
      const data = doc.data();
      const productId = doc.id;

      if (data.amount < 10 && !notifiedProducts.includes(productId)) {
        notifiedProducts.push(productId);

        sendNotification(
          "Produto com baixo estoque",
          `O produto ${data.name} está com apenas ${data.amount} unidades!`
        );

        AsyncStorage.setItem(
          "notifiedProducts",
          JSON.stringify(notifiedProducts)
        );
      } else if (data.amount >= 10 && notifiedProducts.includes(productId)) {
        const updatedNotifiedProducts = notifiedProducts.filter(
          (id: any) => id !== productId
        );
        AsyncStorage.setItem(
          "notifiedProducts",
          JSON.stringify(updatedNotifiedProducts)
        );
      }
    });
  });
}

async function sendNotification(title: string, body: string) {
  try {
    const token = "ExponentPushToken[GqT-JyN1q6P2ABsxwv1r3K]";

    const message = {
      to: token,
      sound: "default",
      title: title,
      body: body,
      data: { someData: "goes here" },
    };

    const response = await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });

    const data = await response.json();
    if (response.status === 200) {
      console.log("Notificação enviada com sucesso:", data);
    } else {
      console.error("Falha ao enviar notificação:", data);
    }
  } catch (error) {
    console.error("Erro ao enviar notificação:", error);
  }
}
