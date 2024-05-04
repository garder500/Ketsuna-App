import { AppContent } from "@/types/app";
import { getItem, removePage, setItem } from "@/utils/storage";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { Button, FAB, Surface, Text } from "react-native-paper";

export default function AppsPageScreen(){
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
            });
        }
    }, [pageId, id]);
    return (
        <Surface style={{ flex: 1 }}>
            <ScrollView>
                <Text>{JSON.stringify(page, null, 2)}</Text>
            </ScrollView>
            <FAB.Group
                open={state}
                visible={true}
                icon={state ? 'close' : 'plus'}
                actions={[
                    { icon: 'plus', label: 'Add Component', onPress: () => router.navigate(`/apps/${id}/${pageId}/addcomponent`) },
                    { icon: 'plus', label: 'Add Function', onPress: () => router.navigate(`/apps/${id}/${pageId}/addfunctions`) },
                    { icon: 'delete', label: 'Delete Page', onPress: () => {
                        removePage(id, pageId); router.back()
                    }},
                ]}
                onStateChange={({ open }) => setState(open)}
            />

        </Surface>
    )
}
