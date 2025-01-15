import React, { useEffect, useRef } from 'react';
import { View, TouchableOpacity, findNodeHandle } from 'react-native';
import { Typography } from '../base/Typography';
import { Container } from '../base/Container';
import { styles } from './EmptyCart.styles';

interface EmptyCartProps {
    onContinueShopping: () => void;
}

const EmptyCart: React.FC<EmptyCartProps> = ({ onContinueShopping }) => {
    const headerRef = useRef<View>(null);

    useEffect(() => {
        if (headerRef.current) {
            const tag = findNodeHandle(headerRef.current);
            if (tag) {
                setTimeout(() => {
                    tag && headerRef.current?.setNativeProps({ accessibilityFocus: true });
                }, 100);
            }
        }
    }, []);

    return (
        <Container style={styles.container}>
            <View
                ref={headerRef}
                accessible={true}
                accessibilityRole="header"
                accessibilityLabel="Your Cart is Empty"
            >
                <Typography variant="h2">
                    Your Cart is Empty
                </Typography>
            </View>
            <Typography
                variant="body1"
                style={styles.message}
                accessible={true}
                accessibilityRole="text"
                accessibilityHint="This message indicates that no items have been added to your cart"
            >
                Looks like you haven't added any items to your cart yet
            </Typography>
            <TouchableOpacity
                style={styles.button}
                onPress={onContinueShopping}
                accessible={true}
                accessibilityRole="button"
                accessibilityLabel="Continue Shopping"
                accessibilityHint="Navigate to the product list to start shopping"
            >
                <Typography style={styles.buttonText}>Continue Shopping</Typography>
            </TouchableOpacity>
        </Container>
    );
};

export default EmptyCart;