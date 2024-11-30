import { Tabs } from "expo-router";
import { House, Package, PlusCircle } from "phosphor-react-native";
import { Text, View } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 30,
          left: 28,
          right: 28,
          height: 65,
          marginHorizontal: 30,
          borderRadius: 8,
          overflow: "hidden",
          backgroundColor: "#09090B",
          borderWidth: 1,
          borderColor: "#201E1E",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingVertical: 0,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => {
            return (
              <View
                className={`${
                  focused ? "bg-white" : "bg-transparent"
                } rounded-md min-h-10 px-5 flex-1 gap-1 flex items-center justify-center`}
              >
                <House
                  size={24}
                  weight={focused ? "fill" : "regular"}
                  color={focused ? "#09090B" : "#948F8B"}
                />
              </View>
            );
          },
        }}
      />
      <Tabs.Screen
        name="new-product"
        options={{
          title: "Novo Produto",
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => {
            return (
              <View
                className={`${
                  focused ? "bg-white" : "bg-transparent"
                } rounded-md min-h-10 px-5 flex-1 gap-1 flex items-center justify-center`}
              >
                <PlusCircle
                  size={24}
                  weight={focused ? "fill" : "regular"}
                  color={focused ? "#09090B" : "#948F8B"}
                />
              </View>
            );
          },
        }}
      />
      <Tabs.Screen
        name="products"
        options={{
          title: "Produtos",
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => {
            return (
              <View
                className={`${
                  focused ? "bg-white" : "bg-transparent"
                } rounded-md min-h-10 px-5 flex-1 gap-1 flex items-center justify-center`}
              >
                <Package
                  size={24}
                  weight={focused ? "fill" : "regular"}
                  color={focused ? "#09090B" : "#948F8B"}
                />
              </View>
            );
          },
        }}
      />
      <Tabs.Screen
        name="products/[id]"
        options={{
          title: "Produtos",
          tabBarShowLabel: false,
          href: null,
        }}
      />
    </Tabs>
  );
}
