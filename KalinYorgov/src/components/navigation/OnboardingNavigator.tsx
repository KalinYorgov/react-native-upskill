import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { OnboardingScreen } from '../../screens/onboarding/OnboardingScreen';
import { isOnboardingCompleted, isAndroidTiramisuOrHigher } from '../../services/notifications';
import { DrawerNavigator } from './RootNavigation';

export type OnboardingStackParamList = {
    OnboardingScreen: undefined;
    MainApp: undefined;
};

const Stack = createStackNavigator<OnboardingStackParamList>();

export const OnboardingNavigator = () => {
    const [loading, setLoading] = useState(true);
    const [shouldShowOnboarding, setShouldShowOnboarding] = useState(false);

    useEffect(() => {
        const checkOnboarding = async () => {
            try {
                const completed = await isOnboardingCompleted();
                setShouldShowOnboarding(!completed && isAndroidTiramisuOrHigher);
            } catch (error) {
                console.error('Error checking onboarding status:', error);
                setShouldShowOnboarding(false);
            } finally {
                setLoading(false);
            }
        };

        checkOnboarding();
    }, []);

    if (loading) {
        return null;
    }

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {shouldShowOnboarding ? (
                <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} />
            ) : (
                <Stack.Screen name="MainApp" component={DrawerNavigator} />
            )}
        </Stack.Navigator>
    );
};