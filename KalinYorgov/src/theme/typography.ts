export const typography = {
    sizes: {
        xs: 12,
        sm: 14,
        base: 16,
        lg: 18,
        xl: 20,
        xxl: 24,
        xxxl: 32,
    },
    weights: {
        regular: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
    },
    families: {
        regular: 'System',
        medium: 'System',
        semibold: 'System',
        bold: 'System',
    },
    lineHeight: {
        tight: 1.25,
        base: 1.5,
        relaxed: 1.75,
        paragraph: 24,
    },

    textStyles: {
        button: {
            fontSize: 16,
            fontWeight: '700',
        },
        input: {
            fontSize: 16,
        },
        error: {
            fontSize: 16,
            textAlign: 'center',
        },
        caption: {
            fontSize: 12,
            textAlign: 'center',
        },
        screenTitle: {
            fontSize: 24,
            fontWeight: 'bold',
        },
        sectionHeader: {
            fontSize: 18,
            fontWeight: '600',
        },
        bodyText: {
            fontSize: 16,
        },
    },
} as const;
