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
      <Stack.Screen name="recipeDetails"
      // options={{
      //   'animation': 'slide_from_bottom'
      // }}
      />
    </Stack>
  );
}
