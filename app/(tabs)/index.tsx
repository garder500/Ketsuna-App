import { StyleSheet } from 'react-native';

import { Surface, Text } from 'react-native-paper';

export default function TabOneScreen() {
  return (
    <Surface style={styles.container}>
      <Text style={styles.title}>Small change to see if it will take effect</Text>
    </Surface>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
