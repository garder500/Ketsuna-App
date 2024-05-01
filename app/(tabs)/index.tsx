
import { ScrollView } from 'react-native';
import { List, Surface } from 'react-native-paper';

export default function HomeScreen() {
  return (

      <Surface>
        <ScrollView>
        <List.Section title='List of items'>
          {Array.from({ length: 10 }).map((_, i) => (
            <List.Item
              key={i}
              title={`Item ${i + 1}`}
              description={`Description ${i + 1}`}
              left={(props) => <List.Icon {...props} icon="folder" />}
            />
          ))}
        </List.Section>
        </ScrollView>
      </Surface>

  );
}

