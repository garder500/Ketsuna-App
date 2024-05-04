import { AppItem } from '@/components/AppItem';
import { AppRecentlyCreated } from '@/types/app';
import { getAllApps } from '@/utils/storage';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { Button, Divider, List, Surface, Title } from 'react-native-paper';

export default function CreateScreen() {

    const [recentlyOpenedApps, setRecentlyOpenedApps] = useState<AppRecentlyCreated[]>([]);

    useEffect(() => {
        const suscriber = setInterval(() => {
        getAllApps().then((apps) => {
            if (apps.length > 0) {
                setRecentlyOpenedApps(apps);
            }else{
                setRecentlyOpenedApps([])
            }
        })
        }, 1000)
        return () => {
            clearInterval(suscriber)
        }
    }, []);


    return (
        <Surface style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <Button icon={"plus"} mode={"contained"} onPress={() => router.navigate("apps/" + Date.now().toString())}
                style={{
                    marginTop: 40
                }}>Create new app</Button>

            <Divider style={{ marginVertical: 20 }} />

            <Title>Recently created app</Title>
            <ScrollView contentContainerStyle={{
                justifyContent: 'center',
                flexDirection: 'row',
                flexWrap: 'wrap',
                marginTop: 10,
            }}>
                {recentlyOpenedApps.length > 0 ? recentlyOpenedApps.map((app) => (
                    <AppItem name={app.name} description={app.description} trigger={() => router.navigate("apps/" + app.createdAt)} key={app.updatedAt} />
                )) : <List.Item
                    title="No apps created yet"
                    left={(props) => <List.Icon {...props} icon="information" />}
                />}
            </ScrollView>
        </Surface>
    );
}
