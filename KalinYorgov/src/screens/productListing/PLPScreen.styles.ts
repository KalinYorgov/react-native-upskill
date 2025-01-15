import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: spacing.screenPadding,
        backgroundColor: colors.background.primary,
        paddingBottom: 88,
    },
    header: {
        ...typography.textStyles.sectionHeader,
        marginBottom: spacing.itemSpacing,
    },
    title: {
        fontSize: typography.sizes.xxxl,
        fontWeight: typography.weights.bold,
        color: colors.text.primary,
        marginBottom: 32,
        textAlign: 'center',
    },
    searchContainer: {
        position: 'relative',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#d1d5db',
        borderRadius: 8,
        backgroundColor: 'white',
        marginBottom: 20,
    },
    input: {
        flex: 1,
        height: 50,
        padding: 12,
        fontSize: 16,
    },
    buttonContainer: {
        position: 'absolute',
        right: 4,
        top: 4,
        bottom: 4,
    },
    button: {
        backgroundColor: colors.primary,
        borderRadius: 6,
        paddingHorizontal: 16,
        height: '100%',
        justifyContent: 'center',
    },
    buttonText: {
        color: colors.white,
        fontSize: 16,
        fontWeight: 'bold',
    },
    productList: {
        paddingBottom: 20,
    },
    productCard: {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
        flexDirection: 'row',
        alignItems: 'center',
    },
    productImage: {
        width: 80,
        height: 80,
        borderRadius: 8,
        marginRight: 16,
    },
    productInfo: {
        flex: 1,
    },
    productTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    productPrice: {
        fontSize: 14,
        color: colors.text.secondary,
        fontWeight: 'bold',
    },
    errorText: {
        ...typography.textStyles.error,
        color: colors.status.error,
    },
    emptyListText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
        color: colors.text.secondary,
    },
    backToTopButton: {
        backgroundColor: colors.primary,
        padding: 10,
        borderRadius: 5,
        alignSelf: 'center',
        marginVertical: 10,
    },
    backToTopText: {
        color: colors.white,
        fontWeight: 'bold',
    },
    errorContainer: {
        backgroundColor: '#FEE2E2',
        padding: 16,
        borderRadius: 8,
        marginBottom: 16,
    },
    retryButton: {
        backgroundColor: colors.primary,
        padding: 8,
        borderRadius: 4,
        alignSelf: 'flex-start',
    },
    retryButtonText: {
        color: colors.white,
        fontSize: 14,
        fontWeight: 'bold',
    },
    categoryButtonsContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
    },
    chooseCategoryText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.primary,
        marginBottom: 20,
        textAlign: 'center',
    },
    categoryButton: {
        backgroundColor: colors.primary,
        padding: 15,
        borderRadius: 8,
        width: '80%',
        marginVertical: 10,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    categoryButtonText: {
        color: colors.white,
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
