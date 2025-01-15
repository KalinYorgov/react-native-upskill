import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Typography } from '../base/Typography';
import { styles } from './OrderSummary.styles';
import PaymentMethods from './PaymentMethods';

interface OrderSummaryProps {
    total: number;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ total }) => {
    return (
        <View style={styles.container}>
            <Typography variant="h2" style={styles.title}>Order Summary</Typography>
            <View style={styles.row}>
                <Typography>Subtotal</Typography>
                <Typography>${total.toFixed(2)}</Typography>
            </View>
            <View style={styles.row}>
                <Typography>Shipping</Typography>
                <Typography>Free</Typography>
            </View>
            <View style={styles.divider} />
            <View style={styles.totalRow}>
                <Typography variant="h3">Total</Typography>
                <Typography variant="h3">${total.toFixed(2)}</Typography>
            </View>

            <PaymentMethods />

            <TouchableOpacity style={styles.checkoutButton}>
                <Typography style={styles.checkoutButtonText}>Proceed to Checkout</Typography>
            </TouchableOpacity>
        </View>
    );
};

export default OrderSummary;