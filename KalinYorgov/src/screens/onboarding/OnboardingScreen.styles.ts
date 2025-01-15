import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    backgroundImage: {
        ...StyleSheet.absoluteFillObject,
        width: '100%',
        height: '100%',
        opacity: 0.5,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        ...typography.textStyles.screenTitle,
        color: colors.text.primary,
        marginBottom: 8,
    },
    subtitle: {
        ...typography.textStyles.bodyText,
        color: colors.text.secondary,
        marginBottom: 24,
    },
    benefitsContainer: {
        alignSelf: 'stretch',
        marginBottom: 32,
    },
    benefitText: {
        ...typography.textStyles.bodyText,
        color: colors.text.primary,
        marginVertical: 4,
    },
    optInButton: {
        backgroundColor: colors.primary,
        paddingVertical: 16,
        paddingHorizontal: 32,
        borderRadius: 8,
        width: '100%',
        marginBottom: 16,
    },
    optInButtonText: {
        ...typography.textStyles.button,
        color: colors.white,
        textAlign: 'center',
    },
    skipText: {
        ...typography.textStyles.bodyText,
        color: colors.text.secondary,
        textDecorationLine: 'underline',
    },
});