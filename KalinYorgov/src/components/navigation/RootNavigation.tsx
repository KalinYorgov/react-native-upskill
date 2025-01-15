import React, { useRef } from 'react';
import { NavigationContainerRef } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { RootStackParamList, TabParamList } from '../../navigation/routes';
import { TAB_NAMES, SCREEN_NAMES, CATEGORY_NAMES, CATEGORIES } from '../../constants';
import { ICON_NAMES } from '../../constants/iconNames';
import { colors } from '../../theme/colors';
import TabNavigator from './TabNavigation';
import { CustomDrawerContent } from './DrawerContent';
import { CategoryWrapper } from './CategoryWrapper';
import HelpDeskScreen from '../../screens/help/HelpDeskScreen';
import { NavigationIconProps } from './types';
import { OnboardingNavigator } from './OnboardingNavigator';

const Drawer = createDrawerNavigator<RootStackParamList>();
const RootStack = createStackNavigator();

export const DrawerNavigator = () => {
    const navigationRef = useRef<NavigationContainerRef<RootStackParamList>>(null);

    const navigateToMainTab = (screenName: keyof TabParamList) => {
        navigationRef.current?.navigate(TAB_NAMES.MAIN_TABS, {
            screen: screenName
        });
    };

    const renderIcon = (iconName: keyof typeof ICON_NAMES) => ({ color, size }: NavigationIconProps) => (
        <Ionicons name={ICON_NAMES[iconName]} size={size} color={color} />
    );

    return (
        <Drawer.Navigator
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            screenOptions={{
                headerShown: false,
                drawerActiveTintColor: colors.primary,
                drawerInactiveTintColor: 'gray',
                drawerStyle: {
                    backgroundColor: 'white',
                },
                drawerType: 'front',
            }}
        >
            <Drawer.Screen
                name={TAB_NAMES.MAIN_TABS}
                component={TabNavigator}
                options={{
                    title: SCREEN_NAMES.HOME,
                    drawerIcon: renderIcon('HOME'),
                }}
                listeners={({ navigation }) => ({
                    drawerItemPress: () => {
                        navigation.closeDrawer();
                        navigateToMainTab(TAB_NAMES.HOME_TAB);
                    }
                })}
            />
            <Drawer.Screen
                name="MenCategory"
                children={() => <CategoryWrapper categoryId={CATEGORIES.MEN_CAT} />}
                options={{
                    title: CATEGORY_NAMES.MEN,
                    drawerIcon: renderIcon('MEN'),
                }}
            />
            <Drawer.Screen
                name="WomenCategory"
                children={() => <CategoryWrapper categoryId={CATEGORIES.WOMEN_CAT} />}
                options={{
                    title: CATEGORY_NAMES.WOMEN,
                    drawerIcon: renderIcon('WOMEN'),
                }}
            />
            <Drawer.Screen
                name={SCREEN_NAMES.HELP_DESK}
                component={HelpDeskScreen}
                options={{
                    title: SCREEN_NAMES.HELP,
                    drawerIcon: renderIcon('HELP'),
                }}
            />
        </Drawer.Navigator>
    );
};

export const RootNavigation: React.FC = () => {
    return (
        <RootStack.Navigator screenOptions={{ headerShown: false }}>
            <RootStack.Screen name="Onboarding" component={OnboardingNavigator} />
            <RootStack.Screen name="MainApp" component={DrawerNavigator} />
        </RootStack.Navigator>
    );
};