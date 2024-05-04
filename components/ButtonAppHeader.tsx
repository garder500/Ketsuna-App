import { removeApp } from "@/utils/storage";
import { router, useGlobalSearchParams } from "expo-router";
import { IconButton, Surface } from "react-native-paper";

export function ButtonAppHeader(){
    const { id } = useGlobalSearchParams<{
        id: string
    }>()
    return(
        <Surface
            style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                padding: 10,
                backgroundColor: "transparent",
            }}
            mode="elevated"
        >
        <IconButton
            icon="delete"
            onPress={async() => await removeApp(id) && router.back()}
        />
        <IconButton
            icon="pencil"
            onPress={() => router.navigate("apps/"+id+"/edit")}
        />
        </Surface>
    )
}
