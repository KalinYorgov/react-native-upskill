import React from 'react';
import { View } from 'react-native';
import { Typography } from '../base/Typography';
import { styles } from './PaymentMethods.styles';
import CitiIcon from '../../assets/payment/citi.svg';
import MaestroIcon from '../../assets/payment/maestro.svg';
import PaypalIcon from '../../assets/payment/paypal.svg';
import VisaIcon from '../../assets/payment/visa.svg';

const PaymentMethods: React.FC = () => {
    return (
        <View style={styles.container}>
            <Typography variant="caption" style={styles.title}>
                Accepted Payment Methods
            </Typography>
            <View style={styles.icons}>
                <View style={styles.iconWrapper}>
                    <VisaIcon width={40} height={25} />
                </View>
                <View style={styles.iconWrapper}>
                    <MaestroIcon width={40} height={25} />
                </View>
                <View style={styles.iconWrapper}>
                    <PaypalIcon width={40} height={25} />
                </View>
                <View style={styles.iconWrapper}>
                    <CitiIcon width={40} height={25} />
                </View>
            </View>
        </View>
    );
};

export default PaymentMethods;