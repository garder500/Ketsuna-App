import { Surface, Text } from "react-native-paper"
import { useLocalSearchParams } from "expo-router"
import { App } from "@/types/app"
import { useEffect, useState } from "react"
import { getAllKeys, getItem, updateAppContent } from "@/utils/storage"
export default function AppCreateScreen(){
    const { id } = useLocalSearchParams<{
        id: string;
    }>()
    const [App, setApp] = useState<App>()
    useEffect(() => {
        getItem<App>("apps/"+id).then((app) => {
            if (app) {
                setApp(app)
            }else{
                getItem<string>("defaultAppName").then((appName) => {
                    if(appName){
                        const app: App = {
                            name: appName,
                            description: 'App Description',
                            createdAt: id,
                            updatedAt: Date.now().toString(),
                        }
                        updateAppContent(id, app)
                        setApp(app)
                    }else{
                        const appToUpdate: App = {
                            name: 'App Name',
                            description: 'App Description',
                            createdAt: id,
                            updatedAt: Date.now().toString(),
                        }
                        updateAppContent(id, appToUpdate)
                        setApp(appToUpdate)
                    }
                })
            }
        })

        getAllKeys().then((keys) => {
            console.log(keys)
        });
    setInterval(() => {
        getItem<App>("apps/"+id).then((app) => {
            if (app) {
                setApp(app)
            }
        })
    },5000)
    }, [id])
    return(
        <Surface style={{
            flex: 1,
            justifyContent: 'center',
        }}>
            <Text style={{textAlign: 'center'}} variant="titleMedium">{App?.name}</Text>
            <Text style={{textAlign: 'center'}} variant="bodyMedium">{App?.description}</Text>

        </Surface>
    )
}
