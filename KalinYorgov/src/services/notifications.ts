import messaging from '@react-native-firebase/messaging';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ONBOARDING_COMPLETED_KEY = '@onboarding_completed';
const ANDROID_API_LEVEL_TIRAMISU = 33;

export const isAndroidTiramisuOrHigher = Platform.OS === 'android' && Platform.Version >= ANDROID_API_LEVEL_TIRAMISU;

export const checkNotificationsPermission = async () => {
    const authStatus = await messaging().hasPermission();
    return authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL;
};

export const requestNotificationsPermission = async () => {
    try {
        const authStatus = await messaging().requestPermission();
        return authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    } catch (error) {
        console.error('Permission request failed:', error);
        return false;
    }
};

export const setOnboardingCompleted = async () => {
    try {
        await AsyncStorage.setItem(ONBOARDING_COMPLETED_KEY, 'true');
    } catch (error) {
        console.error('Error saving onboarding status:', error);
    }
};

export const isOnboardingCompleted = async () => {
    try {
        const completed = await AsyncStorage.getItem(ONBOARDING_COMPLETED_KEY);
        return completed === 'true';
    } catch (error) {
        console.error('Error reading onboarding status:', error);
        return false;
    }
};

export const setupNotifications = async () => {
    try {
        await messaging().registerDeviceForRemoteMessages();
        const token = await messaging().getToken();
        console.log('FCM Token:', token);
        // Here you would typically send this token to your backend
    } catch (error) {
        console.error('Failed to setup notifications:', error);
    }
};