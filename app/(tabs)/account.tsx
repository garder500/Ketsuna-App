import ModalToShow from '@/components/modal';
import { clear, getItem, setItem } from '@/utils/storage';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useEffect, useState } from 'react';
import { Alert, ScrollView, View, useWindowDimensions } from 'react-native';

import { Avatar, Button, Icon, List, Surface, Switch, Text, TextInput, Title, Tooltip } from 'react-native-paper';
export default function TabOneScreen() {

  const [canEdit, setCanEdit] = useState(false);
  const [canSend, setCanSend] = useState(true);
  const [defaultAppName, setDefaultAppName] = useState('App Name');
  const [visible, setVisible] = useState(false);
  const clearStorage = async () => {
    await clear();
    setCanEdit(false);
    setCanSend(true);
    setDefaultAppName('App Name');
    Alert.alert('App Cleared', 'App has been cleared successfully');
  }
  useEffect(() => {
    getItem<boolean>('canEdit').then((value) => {
      if (value !== null) {
        setCanEdit(value);
      }
    });

    getItem<boolean>('canSend').then((value) => {
      if (value !== null) {
        setCanSend(value);
      }
    });

    getItem<string>('defaultAppName').then((value) => {
      if (value !== null) {
        setDefaultAppName(value);
      }
    });
  }, []);


  useEffect(() => {
    setItem('canEdit', canEdit);
    setItem('canSend', canSend);
    setItem('defaultAppName', defaultAppName);
  }, [canEdit, canSend, defaultAppName]);

  const { width } = useWindowDimensions();
  return (
    <ScrollView>
      <Surface >
        <ModalToShow visible={visible} setVisible={setVisible} >
          <View style={{ padding: 20, flexDirection: "row", alignItems: "center", justifyContent: "center" }} >
            <Tooltip title='This action is irreversible' >
              <MaterialCommunityIcons name="alert-circle" size={24} color="white" style={{ marginRight: 10 }} />
            </Tooltip>
            <Text style={{ flex: 1 }} variant="bodyMedium">Are you sure you want to clear the storage and settings?</Text>
          </View>
          <Button onPress={() => { setVisible(!visible); clearStorage() }} style={{ paddingBottom: 25 }}>Clear Storage And Settings</Button>
        </ModalToShow>
        <Avatar.Image size={200} source={require("../../assets/images/icon.png")} style={{ alignSelf: 'center', marginTop: 20 }} />
        <Title style={{ textAlign: 'center' }}>Manage your Settings</Title>
        <Options title="Notifications" value={canEdit} onValueChange={setCanEdit} />
        <Options title="Send statistics" value={canSend} onValueChange={setCanSend} />
        <TextInput label="Default App Name" value={defaultAppName} onChangeText={setDefaultAppName} style={{ margin: 12 }} />
        <Button mode="contained" onPress={() => setVisible(!visible)} style={{ margin: 12 }}>Clear Storage And Settings</Button>
      </Surface>
    </ScrollView>
  );
}

function Options({ title, value, onValueChange }: { title: string, value: boolean, onValueChange: (value: boolean) => void }) {
  return (
    <Surface style={{ margin: 12, flexDirection: 'row', alignItems: 'center' }} mode="flat">
      <Text style={{ flex: 1 }}>{title}</Text>
      <Switch value={value} onValueChange={onValueChange} />
    </Surface>
  );
}
