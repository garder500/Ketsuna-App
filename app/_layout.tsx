import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import {
  MD3DarkTheme,
  MD3LightTheme,
  adaptNavigationTheme,
} from 'react-native-paper';
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { useEffect, useRef, useState } from "react";
import Constants from "expo-constants";
import { Stack, router } from 'expo-router';
import { PaperProvider } from 'react-native-paper';
import { Platform, useColorScheme } from 'react-native';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';
const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

const CombinedDefaultTheme = {
  ...MD3LightTheme,
  ...LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    ...LightTheme.colors,
  },
};
const CombinedDarkTheme = {
  ...MD3DarkTheme,
  ...DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    ...DarkTheme.colors,
    primaryContainer: "rgb(44,40,49)",
  },
};

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: true,
  }),
});

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          lightColor: '#FF231F7C',
      });
  }

  if (Device.isDevice) {
      const projectId = Constants.expoConfig?.extra ? Constants.expoConfig?.extra.eas.projectId : undefined;
      if (projectId) {
          const { status: existingStatus } = await Notifications.getPermissionsAsync();
          let finalStatus = existingStatus;
          if (existingStatus !== 'granted') {
              const { status } = await Notifications.requestPermissionsAsync();
              finalStatus = status;
          }
          if (finalStatus !== 'granted') {
              alert('Failed to get push token for push notification!');
              return;
          }
          // Learn more about projectId:
          // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
          token = (await Notifications.getExpoPushTokenAsync({ projectId })).data;
      } else {
          alert('Must use physical device for Push Notifications');
      }
  }
  return token;
}


export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

export default function RootLayout() {
  return <RootLayoutNav />;
}

function RootLayoutNav() {
  useEffect(() => {
    registerForPushNotificationsAsync();
    let isMounted = true;

    function redirect(notification: Notifications.Notification) {
      Notifications.dismissNotificationAsync(notification.request.identifier);
      const url = notification.request.content.data?.url;
      if (url) {
        router.push(url);
      }
    }

    Notifications.getLastNotificationResponseAsync()
      .then(response => {
        if (!isMounted || !response?.notification) {
          return;
        }
        redirect(response?.notification);
      });

    const subscription = Notifications.addNotificationResponseReceivedListener(response => {
      // aknowledge the notification

      redirect(response.notification);
    });

    return () => {
      isMounted = false;
      subscription.remove();0
    };
  }, []);
  const colorScheme = useColorScheme();

  return (
    <PaperProvider theme={colorScheme === 'dark' ? CombinedDarkTheme : CombinedDefaultTheme}>
      <ThemeProvider value={colorScheme === 'dark' ? CombinedDarkTheme : CombinedDefaultTheme}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)"  />
        </Stack>
      </ThemeProvider>
    </PaperProvider>
  );
}
