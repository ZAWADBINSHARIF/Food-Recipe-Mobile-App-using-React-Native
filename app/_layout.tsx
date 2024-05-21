import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false
      }}
      initialRouteName="home"
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="home" />
    </Stack>
  );
}
