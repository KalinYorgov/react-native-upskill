import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { SCREEN_NAMES } from '../constants';
import HomeScreen from '../screens/home/HomeScreen';
import PLPScreen from '../screens/productListing/PLPScreen';
import PDPScreen from '../screens/productDetails/PDPScreen';
import CartScreen from '../screens/cart/CartScreen';
import HelpDeskScreen from '../screens/help/HelpDeskScreen';
import { HomeStackParamList } from './routes';
import CommonHeader from '../components/CommonHeader';

const Stack = createStackNavigator<HomeStackParamList>();

export const HomeStack: React.FC = () => {
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
            <Stack.Screen
                name={SCREEN_NAMES.HOME}
                component={HomeScreen}
                options={{ title: 'Home' }}
            />
            <Stack.Screen
                name={SCREEN_NAMES.PRODUCT_LIST}
                component={PLPScreen}
                options={{ title: 'Product List' }}
            />
            <Stack.Screen
                name={SCREEN_NAMES.PRODUCT_DETAILS}
                component={PDPScreen}
                options={{ title: 'Product Details' }}
            />
            <Stack.Screen
                name={SCREEN_NAMES.CART}
                component={CartScreen}
                options={{ title: 'Cart' }}
            />
            <Stack.Screen
                name={SCREEN_NAMES.HELP_DESK}
                component={HelpDeskScreen}
                options={{ title: 'Help Desk' }}
            />
        </Stack.Navigator>
    );
};

export default HomeStack;
