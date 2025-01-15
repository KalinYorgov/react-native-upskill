import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

export const styles = StyleSheet.create({
    container: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: colors.border.primary,
    },
    welcomeText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.primary,
    },
    button: {
        backgroundColor: colors.primary,
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: colors.white,
        fontSize: 16,
        fontWeight: 'bold',
    },
});
