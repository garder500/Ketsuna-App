
import ModalToShow from '@/components/modal';
import { useEffect, useState } from 'react';
import { ScrollView, useWindowDimensions } from 'react-native';
import { Avatar, FAB, List, Surface } from 'react-native-paper';
import { ResizeMode, Video } from 'expo-av';


export default function HomeScreen() {

  const [data, _] = useState(Array.from({ length: 20 }));
  const [visible, setVisible] = useState(false);
  const [ModalVisible, setModalVisible] = useState(false);
  const [toggle, setToggle] = useState(false);

  return (
    <>
      <Surface>
        <ModalToShow visible={ModalVisible} setVisible={setModalVisible}>
          <List.Item
            title="Modal"
            description="This is a modal"
            left={(props) => <List.Icon {...props} icon="information" />}
          />
        </ModalToShow>
        <ScrollView contentContainerStyle={{
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  }}>
          {data.map((_, index) => (
            <MenuToggleable key={index} index={index} visible={ModalVisible} setVisible={setModalVisible} toggle={toggle} />
          ))}
        </ScrollView>
      </Surface>
    </>


  );
}

function MenuToggleable({ index, visible, setVisible, toggle }: { index: number, visible: boolean, setVisible: Function, toggle: boolean }) {
  const { width } = useWindowDimensions();
  return (
    <List.Item
    style={{
      justifyContent: 'center',
      width: width/2 - 20,
      alignItems: 'center',
      margin: 10,
      backgroundColor: 'rgb(44,40,49)',
      borderRadius: 15,
    }}
    title={`App ${index+1}`}
    descriptionNumberOfLines={1}
    description="This is App"
    onLongPress={() => setVisible(!visible)}
    left={props => <List.Icon {...props} icon="apps" />}
  />

  )
}
