import { AppContent } from "@/types/app";
import { getItem, removePage, setItem } from "@/utils/storage";
import { Link, router, useLocalSearchParams } from "expo-router";
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
                <Link href={`/apps/${id}/${pageId}/addcomponent`}>
                    <Button>Add Component</Button>
                </Link>
                <Link href={`/apps/${id}/${pageId}/addfunctions`}>
                    <Button>Add Function</Button>
                </Link>
                <Link href={`/apps/${id}`}>
                    <Button>Go Back</Button>
                </Link>
            </ScrollView>


        </Surface>
    )
}
