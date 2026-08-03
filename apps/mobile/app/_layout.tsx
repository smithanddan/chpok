import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ReportDraftProvider } from "../lib/report-draft-context";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <ReportDraftProvider>
        <Stack
          screenOptions={{
            headerStyle: { backgroundColor: "#FFF8ED" },
            headerTintColor: "#17233B",
            headerTitleStyle: { fontWeight: "700" },
            contentStyle: { backgroundColor: "#FFF8ED" }
          }}
        >
          <Stack.Screen
            name="onboarding"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="(tabs)"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="report/capture"
            options={{ title: "Новый чпок" }}
          />
          <Stack.Screen
            name="report/violation-type"
            options={{ title: "Что случилось" }}
          />
          <Stack.Screen
            name="report/object-type"
            options={{ title: "Кого/что чпокаем" }}
          />
          <Stack.Screen
            name="report/company-select"
            options={{ title: "Бренд или сервис" }}
          />
          <Stack.Screen
            name="report/review"
            options={{ title: "Проверка и отправка" }}
          />
          <Stack.Screen
            name="report/success"
            options={{ title: "Отправлено" }}
          />
          <Stack.Screen
            name="reports/index"
            options={{ title: "Мои обращения" }}
          />
          <Stack.Screen
            name="reports/[id]"
            options={{ title: "Обращение" }}
          />
        </Stack>
      </ReportDraftProvider>
    </SafeAreaProvider>
  );
}
