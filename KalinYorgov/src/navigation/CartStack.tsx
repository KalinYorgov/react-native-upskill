import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CartScreen from '../screens/cart/CartScreen';
import CommonHeader from '../components/CommonHeader';
import { CartStackParamList } from '../types';
import { SCREEN_NAMES } from '../constants';

const Stack = createStackNavigator<CartStackParamList>();

export const CartStack = () => {
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
            <Stack.Screen name={SCREEN_NAMES.CART} component={CartScreen} />
        </Stack.Navigator>
    );
};
