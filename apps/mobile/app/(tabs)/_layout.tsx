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
        backgroundColor: focused ? "#FF2D8A" : "transparent"
      }}
    >
      <Text
        style={{
          fontSize: 11,
          fontWeight: "700",
          color: focused ? "#020617" : "#9CA3AF"
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
          backgroundColor: "#020617",
          borderTopColor: "#111827",
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

