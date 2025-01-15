import HomeScreen from '../screens/home/HomeScreen';
import PLPScreen from '../screens/productListing/PLPScreen';
import PDPScreen from '../screens/productDetails/PDPScreen';
import AccountScreen from '../screens/account/AccountScreen';
import CartScreen from '../screens/cart/CartScreen';
import { SCREEN_NAMES, TAB_NAMES } from '../constants';
import HomeStack from './HomeStack';
import { AccountStack } from './AccountStack';
import { CartStack } from './CartStack';
import HelpScreen from '../screens/help/HelpScreen';
import { NavigatorScreenParams } from '@react-navigation/native';

export type TabParamList = {
    [TAB_NAMES.HOME_TAB]: undefined;
    [TAB_NAMES.ACCOUNT_TAB]: undefined;
    [TAB_NAMES.CART_TAB]: undefined;
    [TAB_NAMES.HELP_TAB]: undefined;
};

export type HomeStackParamList = {
    [SCREEN_NAMES.HOME]: undefined;
    [SCREEN_NAMES.PRODUCT_LIST]: { categoryId: string };
    [SCREEN_NAMES.PRODUCT_DETAILS]: { productId: string };
    [SCREEN_NAMES.CART]: undefined;
    [SCREEN_NAMES.HELP_DESK]: undefined;
};

export type AccountStackParamList = {
    [SCREEN_NAMES.ACCOUNT]: undefined;
    [SCREEN_NAMES.ORDER_HISTORY]: undefined;
    [SCREEN_NAMES.LEGAL]: undefined;
};

export type CartStackParamList = {
    [SCREEN_NAMES.CART]: undefined;
};

export type RootStackParamList = {
    [TAB_NAMES.MAIN_TABS]: NavigatorScreenParams<TabParamList>;
    MenCategory: undefined;
    WomenCategory: undefined;
    [SCREEN_NAMES.HELP_DESK]: undefined;
};

export const stackRoutes = {
    [SCREEN_NAMES.HOME]: HomeScreen,
    [SCREEN_NAMES.PRODUCT_LIST]: PLPScreen,
    [SCREEN_NAMES.PRODUCT_DETAILS]: PDPScreen,
    [SCREEN_NAMES.CART]: CartScreen,
    [SCREEN_NAMES.ACCOUNT]: AccountScreen,
};

export const tabRoutes = {
    [TAB_NAMES.HOME_TAB]: HomeStack,
    [TAB_NAMES.ACCOUNT_TAB]: AccountStack,
    [TAB_NAMES.CART_TAB]: CartStack,
    [TAB_NAMES.HELP_TAB]: HelpScreen,
};

export const stackScreenOptions = {
    [SCREEN_NAMES.HOME]: { title: 'Home' },
    [SCREEN_NAMES.PRODUCT_LIST]: { title: 'Product List' },
    [SCREEN_NAMES.PRODUCT_DETAILS]: { title: 'Product Details' },
    [SCREEN_NAMES.CART]: { title: 'Cart' },
    [SCREEN_NAMES.ACCOUNT]: { title: 'Account' },
};
