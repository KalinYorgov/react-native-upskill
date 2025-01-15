import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { Typography } from '../base/Typography';
import { styles } from './CartItem.styles';
import QuantitySelector from './QuantitySelector';
import CloseIcon from '../../assets/icons/close.svg';
import { colors } from '../../theme/colors';

interface CartItemProps {
    item: {
        id: string;
        title: string;
        price: number;
        quantity: number;
        size: string;
        thumbnail: string;
    };
    onQuantityChange: (quantity: number) => void;
    onRemove: () => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, onQuantityChange, onRemove }) => {
    return (
        <View style={styles.container}>
            <Image source={{ uri: item.thumbnail }} style={styles.image} />
            <View style={styles.details}>
                <View style={styles.header}>
                    <Typography variant="h3" style={styles.title}>{item.title}</Typography>
                    <TouchableOpacity 
                        onPress={onRemove} 
                        style={styles.removeButton}
                        accessible={true}
                        accessibilityRole="button"
                        accessibilityLabel={`Remove ${item.title} from cart`}
                        accessibilityHint="Double tap to remove this item from your shopping cart"
                    >
                        <CloseIcon width={20} height={20} fill={colors.text.secondary} />
                    </TouchableOpacity>
                </View>
                <Typography style={styles.size}>Size: {item.size}</Typography>
                <View style={styles.footer}>
                    <QuantitySelector
                        quantity={item.quantity}
                        onQuantityChange={onQuantityChange}
                        maxQuantity={10}
                    />
                    <Typography style={styles.price}>
                        ${(item.price * item.quantity).toFixed(2)}
                    </Typography>
                </View>
            </View>
        </View>
    );
};

export default CartItem;