import { StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

export const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.primary,
        height: 56,
        paddingHorizontal: 16,
    },
    burgerMenu: {
        marginRight: 16,
    },
    title: {
        color: colors.white,
    },
});
