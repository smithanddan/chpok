import { Tabs } from "expo-router";
import { View, Text } from "react-native";

function TabIcon({
  label,
  focused
}: {
  label: string;
  focused: boolean;
}) {
  return (
    <View
      style={{
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 999,
        backgroundColor: focused ? "#FF418E" : "transparent"
      }}
    >
      <Text
        style={{
          fontSize: 11,
          fontWeight: "700",
          color: focused ? "#FFF8ED" : "#67758C"
        }}
      >
        {label}
      </Text>
    </View>
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#FFF8ED",
          borderTopColor: "#E9E3D7",
          height: 64,
          paddingBottom: 12,
          paddingTop: 8
        }
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Главная",
          tabBarIcon: ({ focused }) => (
            <TabIcon label="Главная" focused={focused} />
          )
        }}
      />
      <Tabs.Screen
        name="new-report"
        options={{
          title: "Чпок",
          tabBarIcon: ({ focused }) => (
            <TabIcon label="Чпокнуть" focused={focused} />
          )
        }}
      />
      <Tabs.Screen
        name="my-reports"
        options={{
          title: "Мои",
          tabBarIcon: ({ focused }) => (
            <TabIcon label="Мои" focused={focused} />
          )
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Профиль",
          tabBarIcon: ({ focused }) => (
            <TabIcon label="Профиль" focused={focused} />
          )
        }}
      />
    </Tabs>
  );
}

