import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AccountStackParamList, RootStackParamList } from '../../navigation/routes';
import { TAB_NAMES } from '../../constants';
import eventEmitter, { EVENTS } from '../../services/eventEmitter';
import { CompositeNavigationProp } from '@react-navigation/native';
import { styles } from './LegalScreen.styles';

type LegalScreenNavigationProp = CompositeNavigationProp<
    StackNavigationProp<AccountStackParamList>,
    StackNavigationProp<RootStackParamList>
>;

const LegalScreen: React.FC = () => {
    const navigation = useNavigation<LegalScreenNavigationProp>();

    const handleTermsPress = () => {
        navigation.navigate(TAB_NAMES.MAIN_TABS, {
            screen: TAB_NAMES.HOME_TAB
        });
        eventEmitter.emit(EVENTS.SHOW_TERMS);
    };

    const handleCookiesPress = () => {
        navigation.navigate(TAB_NAMES.MAIN_TABS, {
            screen: TAB_NAMES.HOME_TAB
        });
        eventEmitter.emit(EVENTS.SHOW_COOKIES);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={handleTermsPress}>
                <Text style={styles.buttonText}>Terms & Conditions</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={handleCookiesPress}>
                <Text style={styles.buttonText}>Cookie Settings</Text>
            </TouchableOpacity>
        </View>
    );
};

export default LegalScreen;