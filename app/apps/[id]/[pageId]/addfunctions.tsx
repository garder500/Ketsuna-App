import { useLocalSearchParams } from "expo-router";
import { ScrollView } from "react-native";
import { Button, Surface } from "react-native-paper";

export default function AppsPageAddFunctionScreen(){
    const { id, pageId } = useLocalSearchParams<{
        id: string;
        pageId: string;
    }>();

    return (
        <Surface style={{ flex: 1 }}>
           <ScrollView contentContainerStyle={{ padding: 16, margin: 16 }}>
                <Button onPress={() => console.log('Add Component')}
                style={{ marginBottom: 8 }}
                >Add Fetch URL(With params)</Button>
                <Button onPress={() => console.log('Add Component')} style={{ marginBottom: 8 }}>Add calculation</Button>
                <Button onPress={() => console.log('Add Component')} style={{ marginBottom: 8 }}>Add condition</Button>
            </ScrollView>
        </Surface>
    )
}
