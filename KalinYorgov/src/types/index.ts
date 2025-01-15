import { NavigatorScreenParams } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp } from '@react-navigation/native';
import { SCREEN_NAMES, TAB_NAMES } from '../constants';
import { RouteProp } from '@react-navigation/native';

export interface ImageGroupType {
    view_type: string;
    images: Array<{
        link: string;
    }>;
}

export interface VariantType {
    product_id: string;
    variation_values?: {
        color?: string;
        size?: string;
        [key: string]: any;
    };
    [key: string]: any;
}
export interface Product {
    id: number;
    uniqueId: string;
    title: string;
    thumbnail: string;
    price?: string;
}

export interface ProductVariation {
    id: number;
    color: string;
    thumbnail: string;
    product_id: string;
}

export interface VariationAttribute {
    id: string;
    values: VariationAttributeValue[];
}

export interface VariationAttributeValue {
    value: string;
    name: string;
}

export interface ProductDetails {
    id: number;
    title: string;
    description: string;
    shortDescription?: string;
    longDescription?: string;
    price: number;
    thumbnail: string;
    images?: { uri: string }[];
    variations?: ProductVariation[];
    sizes?: string[];
}

export type HomeStackParamList = {
    [SCREEN_NAMES.HOME]: undefined;
    [SCREEN_NAMES.PRODUCT_LIST]: { categoryId: string };
    [SCREEN_NAMES.PRODUCT_DETAILS]: { productId: string };
    [SCREEN_NAMES.CART]: undefined;
};

export type AccountStackParamList = {
    [SCREEN_NAMES.ACCOUNT]: undefined;
};

export type CartStackParamList = {
    [SCREEN_NAMES.CART]: undefined;
};

export type RootStackParamList = {
    [TAB_NAMES.HOME_TAB]: NavigatorScreenParams<HomeStackParamList>;
    [TAB_NAMES.ACCOUNT_TAB]: NavigatorScreenParams<AccountStackParamList>;
    [TAB_NAMES.CART_TAB]: NavigatorScreenParams<CartStackParamList>;
};

export type RootTabNavigationProp = BottomTabNavigationProp<RootStackParamList>;

export type HomeStackNavigationProp = CompositeNavigationProp<
    RootTabNavigationProp,
    StackNavigationProp<HomeStackParamList>
>;

export type AccountStackNavigationProp = CompositeNavigationProp<
    RootTabNavigationProp,
    StackNavigationProp<AccountStackParamList>
>;

export type CartStackNavigationProp = CompositeNavigationProp<
    RootTabNavigationProp,
    StackNavigationProp<CartStackParamList>
>;

export type CompositeScreenNavigationProp<T extends keyof HomeStackParamList> = CompositeNavigationProp<
    StackNavigationProp<HomeStackParamList, T>,
    BottomTabNavigationProp<RootStackParamList>
>;

export type ScreenRouteProp<T extends keyof RootStackParamList> = RouteProp<RootStackParamList, T>;

export type ScreenNavigationProp<T extends keyof RootStackParamList> = StackNavigationProp<RootStackParamList, T>;
