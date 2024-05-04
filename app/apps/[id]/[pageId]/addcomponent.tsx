import { AppContent } from "@/types/app";
import { getItem, setItem } from "@/utils/storage";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { Button, FAB, Surface, Text } from "react-native-paper";

export default function AppsPageAddComponentScreen(){
    const { id, pageId } = useLocalSearchParams<{
        id: string;
        pageId: string;
    }>();
    const [page, setPage] = useState<AppContent>({});
    const [state, setState]= useState(false);

    useEffect(() => {
         getItem<AppContent>(`apps/${id}/pages/${pageId}`).then((data) => {
            if(data) return setPage(data);
              setItem(`apps/${id}/pages/${pageId}`, {});
        });
        return () => {
            getItem<AppContent>(`apps/${id}/pages/${pageId}`).then((data) => {
                if(data) return setPage(data);
                  setItem(`apps/${id}/pages/${pageId}`, {});
            });
        }
    }, [pageId, id]);
    return (
        <Surface style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={{ padding: 16, margin: 16 }}>
                <Button onPress={() => console.log('Add Component')}
                style={{ marginBottom: 8 }}
                >Add Video Element</Button>
                <Button onPress={() => console.log('Add Component')} style={{ marginBottom: 8 }}>Add Image Element</Button>
                <Button onPress={() => console.log('Add Component')} style={{ marginBottom: 8 }}>Add Text Element</Button>
            </ScrollView>
        </Surface>
    )
}
