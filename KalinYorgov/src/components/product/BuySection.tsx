import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { styles } from './BuySection.styles';

interface BuySectionProps {
    onAddToCart: () => void;
    price?: number;
    hasError?: boolean;
    errorMessage?: string | null;
    disabled?: boolean;
}

const BuySection: React.FC<BuySectionProps> = ({
    onAddToCart,
    price,
    hasError,
    errorMessage,
    disabled
}) => {
    return (
        <View style={styles.container}>
            {hasError && errorMessage && (
                <Text style={styles.errorText}>{errorMessage}</Text>
            )}
            <TouchableOpacity
                style={[
                    styles.addToCartButton,
                    disabled && styles.disabledButton
                ]}
                onPress={onAddToCart}
                disabled={disabled}
            >
                <Text style={[
                    styles.buttonText,
                    disabled && styles.disabledButtonText
                ]}>
                    Add to Cart {price !== undefined ? `- $${price.toFixed(2)}` : ''}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default BuySection;