import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { Button, Surface, Text } from 'react-native-paper';
import { useEffect, useRef, useState } from "react";
import { Platform } from "react-native";
import Constants from "expo-constants";

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldPlaySound: false,
        shouldSetBadge: true,
        shouldShowAlert: true
    })
})

export default function CreateScreen() {

    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState<Notifications.Notification>();
    const notificationListener = useRef<Notifications.Subscription>()
    const responseListener = useRef<Notifications.Subscription>();

    useEffect(() => {
        registerForPushNotificationsAsync().then(token => {
            if (token) {
                setExpoPushToken(token)
                console.log(token);
            }
        });

        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
        });

        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log(response);
        });

        return () => {
            if (notificationListener.current && responseListener.current) {
                Notifications.removeNotificationSubscription(notificationListener.current);
                Notifications.removeNotificationSubscription(responseListener.current);
            }
        };
    }, []);


    return (
        <Surface style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <Text style={{ textAlign: 'center' }} variant='titleLarge'>Create a new app</Text>
            <Text>Your expo push token: {expoPushToken}</Text>
            <Surface style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Text>Title: {notification && notification.request.content.title} </Text>
                <Text>Body: {notification && notification.request.content.body}</Text>
                <Text>Data: {notification && JSON.stringify(notification.request.content.data)}</Text>
            </Surface>
            <Button
                onPress={async () => {
                    await schedulePushNotification();
                }}
            >Pres a Schedule notification</Button>
        </Surface>
    );
}



async function schedulePushNotification() {
    await Notifications.scheduleNotificationAsync({
        content: {
            title: "You've got mail! 📬",
            body: 'Here is the notification body',
            data: { data: 'goes here' },
        },
        trigger: { seconds: 2 },
    });
}

async function registerForPushNotificationsAsync() {
    let token;

    if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

    if (Device.isDevice) {
        const projectId = Constants.expoConfig?.extra ? Constants.expoConfig?.extra.eas.projectId : undefined;
        if (projectId) {
            console.log(projectId);
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
            console.log(token);
        } else {
            alert('Must use physical device for Push Notifications');
        }
    }
    return token;
}
