import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AccountScreen from '../screens/account/AccountScreen';
import OrderHistory from '../screens/OrderHistory/OrderHistory';
import LegalScreen from '../screens/account/LegalScreen';
import { AccountStackParamList } from './routes';
import { SCREEN_NAMES } from '../constants';
import CommonHeader from '../components/CommonHeader';

const Stack = createStackNavigator<AccountStackParamList>();

export const AccountStack = () => {
    return (
        <Stack.Navigator
            screenOptions={({ route }) => ({
                header: () => (
                    <CommonHeader
                        title={route.name}
                    />
                ),
            })}
        >
            <Stack.Screen name={SCREEN_NAMES.ACCOUNT} component={AccountScreen} />
            <Stack.Screen
                name={SCREEN_NAMES.ORDER_HISTORY}
                component={OrderHistory}
                options={{ title: 'Order History' }}
            />
            <Stack.Screen
                name={SCREEN_NAMES.LEGAL}
                component={LegalScreen}
                options={{ title: 'Legal' }}
            />
        </Stack.Navigator>
    );
};
