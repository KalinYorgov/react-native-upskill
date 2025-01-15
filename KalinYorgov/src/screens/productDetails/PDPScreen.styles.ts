import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        paddingBottom: 88,
    },
    header: {
        padding: 16,
        backgroundColor: colors.white,
        borderBottomWidth: 1,
        borderBottomColor: colors.border.primary,
    },
    carouselContainer: {
        alignItems: 'center',
        marginVertical: 16,
    },
    carousel: {
        alignSelf: 'center',
    },
    carouselImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    paginationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 8,
    },
    dotsContainer: {
        flexDirection: 'row',
        marginRight: 8,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: colors.border.secondary,
        marginHorizontal: 4,
    },
    activeDot: {
        backgroundColor: colors.primary,
    },
    paginationText: {
        fontSize: 14,
        color: colors.text.secondary,
        marginLeft: 8,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
        color: colors.primary,
    },
    price: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.text.secondary,
    },
    variationsContainer: {
        marginTop: 16,
        paddingHorizontal: 16,
    },
    variationsTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.primary,
        marginBottom: 12,
    },
    variationsScrollContent: {
        paddingVertical: 8,
    },
    variationItem: {
        marginRight: 16,
        alignItems: 'center',
    },
    variationImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: colors.border.primary,
    },
    variationColor: {
        marginTop: 8,
        fontSize: 14,
        color: colors.text.secondary,
    },
    selectedVariationItem: {
        opacity: 1,
        transform: [{ scale: 1.1 }],
        shadowColor: colors.primary,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    errorContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.background.secondary,
    },
    variationErrorContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.background.secondary,
        padding: 4,
    },
    carouselImageContainer: {
        width: '100%',
        height: '100%',
    },
});
