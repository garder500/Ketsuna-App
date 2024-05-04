import { useWindowDimensions } from "react-native";
import { List } from "react-native-paper";
import React from "react";
export function AppItem({name, trigger, description }: { name: string, description?: string, trigger: Function }) {
  const { width } = useWindowDimensions();
  return (
    <List.Item
      style={{
        justifyContent: 'center',
        width: width / 2 - 20,
        alignItems: 'center',
        margin: 10,
        backgroundColor: 'rgb(44,40,49)',
        borderRadius: 15,
      }}
      title={name}
      descriptionNumberOfLines={1}
      {...description && { description }}
      onPress={() => trigger()}
      left={props => <List.Icon {...props} icon="apps" />}
    />
  )
}
