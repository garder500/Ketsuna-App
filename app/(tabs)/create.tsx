import * as Notifications from "expo-notifications";
import { Button, Surface, Text } from 'react-native-paper';

export default function CreateScreen() {

    return (
        <Surface style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <Text style={{ textAlign: 'center' }} variant='titleLarge'>Create a new app</Text>
            <Button
                onPress={async () => {
                    await schedulePushNotification();
                }}
            >Press a Schedule notification</Button>
        </Surface>
    );
}



async function schedulePushNotification() {
    await Notifications.setNotificationCategoryAsync('test', [
        {
            identifier: 'textInput',
            buttonTitle: 'Reply',
            textInput: {
                placeholder: 'Enter your response',
                submitButtonTitle: 'Send',
            }
        }
    ]);
    await Notifications.scheduleNotificationAsync({
        content: {
            title: "You've got mail! 📬",
            body: 'Here is the notification body',
            data: { data: 'test' },
            badge: 1,
            sticky: true,
            subtitle: 'This is a subtitle',
            launchImageName: 'icon.png',
            color: '#FF231F7C',
            categoryIdentifier: 'test',
        },
        trigger: { seconds: 2 },
    });
}
