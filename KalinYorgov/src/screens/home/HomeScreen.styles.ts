import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

export const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.primary,
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        margin: 10,
    },
    buttonText: {
        color: colors.white,
        fontSize: 16,
    },
});
