import { Stack } from "expo-router";

export default function AppsLayout(){
    return (
        <Stack screenOptions={{ headerShown: true }}>
        <Stack.Screen name="index" options={{ title: "Page Screen" }} />
        <Stack.Screen name="addcomponent" options={{ title: "Add Component" }} />
        <Stack.Screen name="addfunctions" options={{ title: "Add Function" }} />
      </Stack>
    )
}
