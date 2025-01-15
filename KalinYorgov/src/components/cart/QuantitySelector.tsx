import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Typography } from '../base/Typography';
import { styles } from './QuantitySelector.styles';

interface QuantitySelectorProps {
    quantity: number;
    onQuantityChange: (quantity: number) => void;
    maxQuantity: number;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({
    quantity,
    onQuantityChange,
    maxQuantity
}) => {
    const handleDecrease = () => {
        if (quantity > 1) {
            onQuantityChange(quantity - 1);
        }
    };

    const handleIncrease = () => {
        if (quantity < maxQuantity) {
            onQuantityChange(quantity + 1);
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={handleDecrease}
                style={[styles.button, quantity <= 1 && styles.buttonDisabled]}
                disabled={quantity <= 1}
            >
                <Typography style={styles.buttonText}>-</Typography>
            </TouchableOpacity>

            <Typography style={styles.quantity}>{quantity}</Typography>

            <TouchableOpacity
                onPress={handleIncrease}
                style={[styles.button, quantity >= maxQuantity && styles.buttonDisabled]}
                disabled={quantity >= maxQuantity}
            >
                <Typography style={styles.buttonText}>+</Typography>
            </TouchableOpacity>
        </View>
    );
};

export default QuantitySelector;