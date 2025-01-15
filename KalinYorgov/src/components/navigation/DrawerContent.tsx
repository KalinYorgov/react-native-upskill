import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { DrawerContentComponentProps, DrawerItemList, DrawerContentScrollView,DrawerItem } from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TAB_NAMES } from '../../constants';
import { ICON_NAMES } from '../../constants/iconNames';
import UserSection from '../drawer/UserSection';
import { useAuth } from '../../hooks/useAuth';
import { NavigationIconProps } from './types';

export function CustomDrawerContent(props: DrawerContentComponentProps) {
    const { isAuthenticated, user } = useAuth();
    const navigation = useNavigation();

    const navigateToHelp = () => {
        props.navigation.closeDrawer();
        props.navigation.navigate(TAB_NAMES.MAIN_TABS, {
            screen: TAB_NAMES.HELP_TAB
        });
    };

    const renderIcon = ({ color, size }: NavigationIconProps) => (
        <Ionicons
            name={ICON_NAMES.HELP}
            size={size}
            color={color}
        />
    );

    return (
        <DrawerContentScrollView {...props}>
            <UserSection isLoggedIn={isAuthenticated} user={user} />
            <DrawerItemList {...props} />
        </DrawerContentScrollView>
    );
}