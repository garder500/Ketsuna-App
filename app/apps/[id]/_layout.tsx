import { ButtonAppHeader } from "@/components/ButtonAppHeader";
import { Stack } from "expo-router";

export default function AppsLayout(){
    return (
        <Stack>
            <Stack.Screen name="edit" options={{ title: "Edit" }} />
            <Stack.Screen name="index" options={{ headerRight: ButtonAppHeader }} />
            <Stack.Screen name="[pageId]" options={{
                headerShown: false
            }} />
      </Stack>
    )
}
