import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { requestNotificationsPermission, setOnboardingCompleted } from '../../services/notifications';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { styles } from './OnboardingScreen.styles';
import { OnboardingStackParamList } from '../../components/navigation/OnboardingNavigator';

type OnboardingScreenNavigationProp = StackNavigationProp<OnboardingStackParamList, 'OnboardingScreen'>;

export const OnboardingScreen = () => {
    const navigation = useNavigation<OnboardingScreenNavigationProp>();

    const handleOptIn = async () => {
        const granted = await requestNotificationsPermission();
        await setOnboardingCompleted();
        navigation.reset({
            index: 0,
            routes: [{ name: 'MainApp' }],
        });
    };

    const handleOptOut = async () => {
        await setOnboardingCompleted();
        navigation.reset({
            index: 0,
            routes: [{ name: 'MainApp' }],
        });
    };

    return (
        <View style={styles.container}>
            <Image
                source={require('../../assets/notifications/notifications-background.png')}
                style={styles.backgroundImage}
            />
            <View style={styles.content}>
                <Text style={styles.title}>Notifications</Text>
                <Text style={styles.subtitle}>Get the latest updates</Text>

                <View style={styles.benefitsContainer}>
                    <Text style={styles.benefitText}>✓ First access to sales</Text>
                    <Text style={styles.benefitText}>✓ Seasonal offers</Text>
                </View>

                <TouchableOpacity style={styles.optInButton} onPress={handleOptIn}>
                    <Text style={styles.optInButtonText}>Opt into notifications</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleOptOut}>
                    <Text style={styles.skipText}>Continue without notifications</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};