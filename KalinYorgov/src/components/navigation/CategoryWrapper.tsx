import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { HomeStackParamList } from '../../navigation/routes';
import { SCREEN_NAMES } from '../../constants';
import HomeStack from '../../navigation/HomeStack';
import { CategoryWrapperProps } from './types';

export const CategoryWrapper: React.FC<CategoryWrapperProps> = ({ categoryId }) => {
    const navigation = useNavigation<StackNavigationProp<HomeStackParamList>>();

    React.useEffect(() => {
        navigation.navigate(SCREEN_NAMES.PRODUCT_LIST, { categoryId });
    }, [categoryId, navigation]);

    return <HomeStack />;
};