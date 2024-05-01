import { useState } from 'react';
import { Image, ScrollView } from 'react-native';

import { Button, Surface, TextInput, Title } from 'react-native-paper';
export default function TabOneScreen() {

  const [canEdit, setCanEdit] = useState(true);

  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('********');
  return (
    <ScrollView>
    <Surface >
      <Image source={require("../../assets/images/icon.png")} style={{
        width: 200,
        height: 200,
        alignSelf: 'center',
      }} />
      <Title style={{ textAlign: 'center' }}>Manage your account</Title>
      <TextInput label="Username" style={{ margin: 10 }} value={username} disabled={canEdit} onChangeText={setUsername} />
      <TextInput label="Password" style={{ margin: 10 }} value={password} disabled={canEdit} onChangeText={setPassword} secureTextEntry/>
      <Button mode="contained" style={{ margin: 10 }} onPress={() => setCanEdit(!canEdit)}>{canEdit ? 'Edit' : 'Save'}</Button>
    </Surface>
    </ScrollView>
  );
}



