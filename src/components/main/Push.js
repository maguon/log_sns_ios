/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @flow
 */

import React, {useEffect} from 'react';
import {
    Alert,
    StyleSheet,
    View,
} from 'react-native';
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import localStorageKey from '../../utils/LocalStorageKey'
import localStorage from '../../utils/LocalStorage'


export const Push = () => {

    useEffect(() => {
        PushNotificationIOS.addEventListener('register', onRegistered);
        PushNotificationIOS.addEventListener(
            'registrationError',
            onRegistrationError,
        );
        PushNotificationIOS.addEventListener('notification', onRemoteNotification);
        PushNotificationIOS.addEventListener(
            'localNotification',
            onLocalNotification,
        );

        PushNotificationIOS.requestPermissions().then(
            (data) => {
                console.log('PushNotificationIOS.requestPermissions', data);
            },
            (data) => {
                console.log('PushNotificationIOS.requestPermissions failed', data);
            },
        );

        return () => {
            PushNotificationIOS.removeEventListener('register', onRegistered);
            PushNotificationIOS.removeEventListener(
                'registrationError',
                onRegistrationError,
            );
            PushNotificationIOS.removeEventListener(
                'notification',
                onRemoteNotification,
            );
            PushNotificationIOS.removeEventListener(
                'localNotification',
                onLocalNotification,
            );
        };
    }, []);


    const onRegistered = (deviceToken) => {
        localStorage.save({ key: localStorageKey.DEVICETOKEN, data: deviceToken })
        // console.log(deviceToken)
        // Alert.alert('Registered For Remote Push', `Device Token: ${deviceToken}`, [
        //     {
        //         text: 'Dismiss',
        //         onPress: null,
        //     },
        // ]);
    };

    const onRegistrationError = (error) => {
        Alert.alert(
            'Failed To Register For Remote Push',
            `Error (${error.code}): ${error.message}`,
            [
                {
                    text: 'Dismiss',
                    onPress: null,
                },
            ],
        );
    };

    const onRemoteNotification = (notification) => {
        const result = `
      Title:  ${notification.getTitle()};\n
      Message: ${notification.getMessage()};\n
      badge: ${notification.getBadgeCount()};\n
      sound: ${notification.getSound()};\n
      category: ${notification.getCategory()};\n
      content-available: ${notification.getContentAvailable()}.`;

        Alert.alert('Push Notification Received', result, [
            {
                text: 'Dismiss',
                onPress: null,
            },
        ]);
    };

    const onLocalNotification = (notification) => {
        Alert.alert(
            'Local Notification Received',
            `Alert title:  ${notification.getTitle()},
      'Alert message:  ${notification.getMessage()}`,
            [
                {
                    text: 'Dismiss',
                    onPress: null,
                },
            ],
        );
    };


    return (
        <View style={styles.container}>

        </View>
    );

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    button: {
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonLabel: {
        color: 'blue',
    },
});
