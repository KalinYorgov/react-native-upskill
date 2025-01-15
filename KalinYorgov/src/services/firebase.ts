import { Platform } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import firebase from '@react-native-firebase/app';

const isDevelopment = __DEV__;

const log = {
    debug: (...args: any[]) => isDevelopment && console.debug('[Firebase]', ...args),
    info: (...args: any[]) => isDevelopment && console.info('[Firebase]', ...args),
    error: (...args: any[]) => console.error('[Firebase]', ...args),
};

export const initializeFirebase = async () => {
    try {
        if (!firebase.apps.length) {
            firebase.app();
        }

        if (Platform.OS === 'ios') {
            await messaging().requestPermission();
            await messaging().registerDeviceForRemoteMessages();
        }

        const token = await messaging().getToken();
        log.debug('Firebase initialized with token:', token);

        messaging().setBackgroundMessageHandler(async remoteMessage => {
            log.info('Background message received:', remoteMessage);
        });

        const unsubscribe = messaging().onMessage(async remoteMessage => {
            log.info('Foreground message received:', remoteMessage);
        });

        return unsubscribe;
    } catch (error) {
        log.error('Firebase initialization failed:', error);
        return () => {};
    }
};