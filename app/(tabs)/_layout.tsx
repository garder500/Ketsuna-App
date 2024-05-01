import React from 'react';
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Tabs, useNavigation } from 'expo-router';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  color: string;
  size: number;
}) {
  return <MaterialCommunityIcons style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const navigation = useNavigation();

  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarShowLabel:false,
        headerTitleAlign: "center",
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) =><TabBarIcon size={30} name={focused ? "home" : "home-outline"} color={color} />,
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: 'Create',
          tabBarIcon: ({ color, focused }) => <TabBarIcon name={focused ? "plus-circle" : "plus-circle-outline"} color={color} size={40}/>,
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: 'Account',
          tabBarIcon: ({ color, focused }) => <TabBarIcon size={30} name={focused ? "account-circle" : "account-circle-outline"} color={color} />,
        }}
      />
    </Tabs>
  );
}
