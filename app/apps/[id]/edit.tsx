import { Button, Surface, Text, TextInput } from "react-native-paper"
import { useLocalSearchParams } from "expo-router"
import { App } from "@/types/app"
import { useEffect, useState } from "react"
import { getItem, updateAppContent } from "@/utils/storage"
import { Alert } from "react-native"

export default function AppCreateScreen() {
    const { id } = useLocalSearchParams<{
        id: string;
    }>()
    const [App, setApp] = useState<App>()

    const updateApp = (App: App) => {
        setApp(App)
    }

    const confirmUpdate = () => {
        if(App) updateAppContent(id, App).then(() => {
            Alert.alert("App Updated", "App has been updated successfully")
            getItem<App>("apps/" + id).then((app) => {
                if (app) {
                    setApp(app)
                }
            })
        });
    }

    useEffect(() => {
        getItem<App>("apps/" + id).then((app) => {
            if (app) {
                setApp(app)
            }
        })
    }, [id])


    if (App) {
        return (
            <Surface style={{
                flex: 1,
            }}>
                <TextInput label="App Name" value={App?.name} onChangeText={(text) => { updateApp({ ...App, name: text }) }} style={{ margin: 10 }} />
                <TextInput label="App Description" value={App?.description} onChangeText={(text) => { updateApp({ ...App, description: text }) }} style={{ margin: 10 }} />
                <Button onPress={confirmUpdate} mode="contained" style={{ margin: 10 }}>Update App</Button>
            </Surface>
        )
    } else {
        return (
            <Surface style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <Text>Loading...</Text>
            </Surface>
        )
    }
}
