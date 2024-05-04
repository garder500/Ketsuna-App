
import { AppItem } from '@/components/AppItem';
import { AppRecentlyCreated } from '@/types/app';
import { getItem } from '@/utils/storage';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import {  Divider, List, Surface, Title } from 'react-native-paper';


export default function HomeScreen() {

  const [data, setData] = useState<AppRecentlyCreated[]>([]);

  useEffect(() => {
    getItem<AppRecentlyCreated[]>("recentlyOpenedApps").then((apps) => {
      if (apps) {
          setData(apps);
      }
  });
    setInterval(() => {
    getItem<AppRecentlyCreated[]>("recentlyOpenedApps").then((apps) => {
      if (apps) {
          setData(apps);
      }else{
        setData([])
      }
  });
    }, 1000);
  }, []);
  return (
    <>
      <Surface style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <ScrollView contentContainerStyle={{
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  }}>
    <Title style={{ textAlign: 'center' }}>Apps Created by You</Title>
    <Divider style={{ margin: 10 }} />
    {data.length > 0 ? data.reverse().map((app, index) => (
      <AppItem name={app.name} description={app.description} trigger={() => router.navigate("/apps/"+app.createdAt)} key={index} />
    )) : <List.Item
      title="No apps created yet"
      left={(props) => <List.Icon {...props} icon="information" />}
    />}
        </ScrollView>
      </Surface>
    </>


  );
}
