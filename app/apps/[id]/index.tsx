import { Button, Divider, Surface, Text, Title } from "react-native-paper"
import { useNavigation, useLocalSearchParams, Link, router } from "expo-router"
import { App, AppContent } from "@/types/app"
import { useEffect, useState } from "react"
import { getItem, getPages, updateAppContent } from "@/utils/storage"
import { ScrollView } from "react-native"
export default function AppCreateScreen() {
    const { id } = useLocalSearchParams<{
        id: string;
    }>()
    const [App, setApp] = useState<App>()
    const [pages, setPages] = useState<string[]>([])
    const navigation = useNavigation();
    useEffect(() => {
        getItem<App>("apps/" + id).then((app) => {
            if (app) {
                setApp(app)
                navigation.setOptions({
                    title: app.name
                })
            } else {
                getItem<string>("defaultAppName").then((appName) => {
                    const appToUpdate: App = {
                        name: appName || 'App Name',
                        description: 'App Description',
                        createdAt: id,
                        updatedAt: Date.now().toString(),
                    }
                    updateAppContent(id, appToUpdate)
                    setApp(appToUpdate)
                })
            }
        });

        const suscriber = setInterval(() => {
            getItem<App>("apps/" + id).then((app) => {
                if (app) {
                    setApp(app)
                    navigation.setOptions({
                        title: app.name
                    })
                }
            })
            getPages(id).then((pages) => {
                setPages(pages)
            })
        }, 5000)
        return () => {
            clearInterval(suscriber)
        }
    }, [id])
    return (
        <Surface style={{
            flex: 1,
            justifyContent: 'center',
        }}>
            <Text style={{ textAlign: 'center' }} variant="bodyMedium">{App?.description}</Text>
            <Divider style={{ marginVertical: 20, backgroundColor: "white"}} />

            <Title style={{ textAlign: 'center' }}>Pages</Title>
                <Button icon={"plus"} mode={"contained"}
                onPress={() => {
                    router.navigate("apps/" + id + "/" + Date.now().toString())
                }}
                    style={{
                        marginTop: 10
                    }}>Create new page</Button>
            <ScrollView contentContainerStyle={{
                justifyContent: 'center',
                flexDirection: 'row',
                flexWrap: 'wrap',
                marginTop: 10,
            }}>
                {pages.map((page, index) => {
                    return (
                        <Button key={index} onPress={() => {
                            router.navigate("apps/" + id + "/" + page.split("/").pop())
                        }} style={{ margin: 5 }}>Page {index + 1}</Button>
                        )
                } )}
            </ScrollView>
        </Surface>
    )
}
