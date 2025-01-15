import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { TAB_NAMES } from '../../constants';
import { RootStackParamList } from '../../navigation/routes';
import { styles } from './UserSection.styles';

interface UserSectionProps {
    isLoggedIn: boolean;
    user: {
        name?: string;
        email?: string;
        firstName?: string;
        lastName?: string;
    } | null;
}

const UserSection: React.FC<UserSectionProps> = ({ isLoggedIn, user }) => {
    const navigation = useNavigation<DrawerNavigationProp<RootStackParamList>>();

    const capitalizeWord = (word: string) => {
        if (!word) return '';
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    };

    const formatEmailName = (email: string) => {
        const name = email.split('@')[0];
        const parts = name.split(/[._]/);
        return parts.map(capitalizeWord).join(' ');
    };

    const getUserDisplayName = () => {
        if (!user) return '';
        if (user.firstName && user.lastName) {
            return `${capitalizeWord(user.firstName)} ${capitalizeWord(user.lastName)}`;
        }
        if (user.name) {
            if (user.name.includes('@')) {
                return formatEmailName(user.name);
            }
            if (user.name.includes('.')) {
                return user.name.split('.').map(capitalizeWord).join(' ');
            }
            return capitalizeWord(user.name);
        }
        if (user.firstName) return capitalizeWord(user.firstName);
        if (user.email) return formatEmailName(user.email);
        return 'User';
    };

    if (isLoggedIn && user) {
        return (
            <View style={styles.container}>
                <Text style={styles.welcomeText}>Welcome, {getUserDisplayName()}!</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate(TAB_NAMES.MAIN_TABS, { screen: TAB_NAMES.ACCOUNT_TAB })}
            >
                <Text style={styles.buttonText}>Login / Sign Up</Text>
            </TouchableOpacity>
        </View>
    );
};

export default UserSection;
