import { useRouter } from "expo-router";
import { Check } from "phosphor-react-native";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface NotificationItemProps {
  message: string;
  date: string;
  viewed: boolean;
}

export default function NotificationItem({
  date,
  message,
  viewed,
}: NotificationItemProps) {
  const router = useRouter();

  const [isViewed, setIsViewed] = useState(viewed);

  return (
    <View
      style={styles.container}
      className="flex-row items-center justify-between"
    >
      <View className="gap-1">
        <Text className="font-semibold font-sans text-base text-white">
          {message}
        </Text>
        <Text className="font-regular font-sans text-xs text-text">{date}</Text>
      </View>
      <View className="flex-row items-center gap-4">
        <TouchableOpacity onPress={() => setIsViewed(!isViewed)}>
          <Check
            size={24}
            color={isViewed ? "#006FCE" : "#948F8B"}
            weight="bold"
          />
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
