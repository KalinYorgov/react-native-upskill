import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Linking, Platform } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AccountStackParamList } from '../../navigation/routes';
import { SCREEN_NAMES } from '../../constants';
import { colors } from '../../theme/colors';
import { styles } from './AccountScreen.styles';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { login, register, logout } from '../../store/slices/authSlice';
import { useSessionRefresh } from '../../hooks/useSessionRefresh';
import { openInAppBrowser } from '../../utils/browser';
import { STOREFRONT_CONTACT_US } from '../../services/config';

type AccountScreenNavigationProp = StackNavigationProp<AccountStackParamList, typeof SCREEN_NAMES.ACCOUNT>;

const AccountScreen: React.FC = () => {
    const navigation = useNavigation<AccountScreenNavigationProp>();
    const dispatch = useAppDispatch();
    const { isAuthenticated, user, loading, error } = useAppSelector(state => state.auth);

    const [isLoginMode, setIsLoginMode] = useState(true);
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');

    useSessionRefresh();

    const handleAuth = useCallback(async () => {
        try {
            if (isLoginMode) {
                await dispatch(login({ email, password })).unwrap();
            } else {
                if (!firstName.trim() || !lastName.trim()) {
                    Alert.alert('Error', 'Please enter your full name');
                    return;
                }
                await dispatch(register({ firstName, lastName, email, password })).unwrap();
            }
        } catch (error) {
            Alert.alert('Error', error instanceof Error ? error.message : 'Authentication failed');
        }
    }, [isLoginMode, email, firstName, lastName, password, dispatch]);

    const handleLogout = useCallback(async () => {
        try {
            await dispatch(logout()).unwrap();
        } catch (error) {
            console.error('Logout error:', error);
        }
    }, [dispatch]);

    const handleOrderHistory = useCallback(() => {
        navigation.navigate(SCREEN_NAMES.ORDER_HISTORY);
    }, [navigation]);

    const handleContactUs = useCallback(async () => {
        await openInAppBrowser(STOREFRONT_CONTACT_US);
    }, []);

    const openAppSettings = useCallback(() => {
        if (Platform.OS === 'ios') {
            Linking.openURL('app-settings:');
        } else {
            Linking.openSettings();
        }
    }, []);

    if (isAuthenticated && user) {
        return (
            <LinearGradient colors={[colors.primary, colors.shadow]} style={styles.container}>
                <View style={styles.logoContainer}>
                    <FontAwesomeIcon name="user-circle" size={80} color={colors.white} />
                </View>
                <View style={styles.formContainer}>
                    <Text style={styles.settingsTitle}>Account Settings</Text>
                    <View style={styles.settingsRow}>
                        <Text style={styles.settingsLabel}>Name:</Text>
                        <Text style={styles.settingsValue}>{user.name}</Text>
                    </View>
                    <View style={styles.settingsRow}>
                        <Text style={styles.settingsLabel}>Email:</Text>
                        <Text style={styles.settingsValue}>{user.email}</Text>
                    </View>

                    <TouchableOpacity style={styles.linkButton} onPress={handleOrderHistory}>
                        <Text style={styles.linkButtonText}>View Order History</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.linkButton} onPress={handleContactUs}>
                        <Text style={styles.linkButtonText}>Contact Us</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.linkButton} onPress={openAppSettings}>
                        <Text style={styles.linkButtonText}>App Settings</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={styles.linkButton} 
                        onPress={() => navigation.navigate(SCREEN_NAMES.LEGAL)}
                    >
                        <Text style={styles.linkButtonText}>Legal</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                        <Text style={styles.buttonText}>Logout</Text>
                    </TouchableOpacity>
                </View>
            </LinearGradient>
        );
    }

    return (
        <LinearGradient colors={[colors.primary, colors.shadow]} style={styles.container}>
            <View style={styles.logoContainer}>
                <FontAwesomeIcon name="user-circle" size={80} color={colors.white} />
            </View>
            <View style={styles.formContainer}>
                <Text style={styles.title}>{isLoginMode ? 'Login' : 'Register'}</Text>

                {!isLoginMode && (
                    <>
                        <View style={styles.inputContainer}>
                            <Icon name="account" size={20} color={colors.primary} style={styles.inputIcon} />
                            <TextInput
                                style={[styles.input, styles.inputText]}
                                placeholder="First Name"
                                placeholderTextColor={colors.text.secondary}
                                value={firstName}
                                onChangeText={setFirstName}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <Icon name="account" size={20} color={colors.primary} style={styles.inputIcon} />
                            <TextInput
                                style={[styles.input, styles.inputText]}
                                placeholder="Last Name"
                                placeholderTextColor={colors.text.secondary}
                                value={lastName}
                                onChangeText={setLastName}
                            />
                        </View>
                    </>
                )}

                <View style={styles.inputContainer}>
                    <Icon name="email" size={20} color={colors.primary} style={styles.inputIcon} />
                    <TextInput
                        style={[styles.input, styles.inputText]}
                        placeholder="Email"
                        placeholderTextColor={colors.text.secondary}
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Icon name="lock" size={20} color={colors.primary} style={styles.inputIcon} />
                    <TextInput
                        style={[styles.input, styles.inputText]}
                        placeholder="Password"
                        placeholderTextColor={colors.text.secondary}
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                    />
                </View>

                {error && <Text style={styles.errorText}>{error}</Text>}

                <TouchableOpacity
                    style={[styles.authButton, loading && styles.authButtonDisabled]}
                    onPress={handleAuth}
                    disabled={loading}
                >
                    <Text style={styles.buttonText}>
                        {loading ? 'Please wait...' : (isLoginMode ? 'Login' : 'Register')}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.switchModeButton}
                    onPress={() => setIsLoginMode(!isLoginMode)}
                    disabled={loading}
                >
                    <Text style={styles.switchModeText}>
                        {isLoginMode ? 'Create an account' : 'Already have an account?'}
                    </Text>
                </TouchableOpacity>
            </View>
        </LinearGradient>
    );
};

export default React.memo(AccountScreen);
