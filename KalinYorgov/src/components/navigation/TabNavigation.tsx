import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useAppSelector } from '../../store/hooks';
import { TAB_NAMES, SCREEN_NAMES } from '../../constants';
import { HomeStack } from '../../navigation/HomeStack';
import { AccountStack } from '../../navigation/AccountStack';
import { CartStack } from '../../navigation/CartStack';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { NavigationIconProps } from './types';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TabParamList } from '../../navigation/routes';

const Tab = createBottomTabNavigator<TabParamList>();

const TabNavigator: React.FC = () => {
    const cartItemsCount = useAppSelector(state =>
        state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
    );

    const iconMap: Record<string, string> = {
        [TAB_NAMES.HOME_TAB]: 'home-outline',
        [TAB_NAMES.ACCOUNT_TAB]: 'person-outline',
        [TAB_NAMES.CART_TAB]: 'cart-outline',
    };

    const renderTabIcon = ({ color, size }: NavigationIconProps) => (route: keyof typeof iconMap) => {
        const iconName = iconMap[route];
        return <Ionicons name={iconName} size={24} color={color} />;
    };

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => renderTabIcon({ color, size })(route.name),
                headerShown: false,
                tabBarActiveTintColor: colors.primary,
                tabBarInactiveTintColor: colors.text.secondary,
                tabBarLabelStyle: {
                    fontSize: typography.sizes.sm,
                    fontFamily: typography.families.regular,
                    marginBottom: 8,
                },
                tabBarStyle: {
                    height: 56,
                    backgroundColor: colors.white,
                    borderTopWidth: 0,
                    position: 'absolute',
                    bottom: 16,
                    left: 16,
                    right: 16,
                    borderRadius: 8,
                    paddingTop: 8,
                    elevation: 8,
                    shadowColor: colors.shadow,
                    shadowOffset: {
                        width: 0,
                        height: 4,
                    },
                    shadowOpacity: 0.15,
                    shadowRadius: 8,
                },
                tabBarIconStyle: {
                    marginTop: 4,
                },
            })}
        >
            <Tab.Screen
                name={TAB_NAMES.HOME_TAB}
                component={HomeStack}
                options={{ title: SCREEN_NAMES.HOME }}
            />
            <Tab.Screen
                name={TAB_NAMES.ACCOUNT_TAB}
                component={AccountStack}
                options={{ title: SCREEN_NAMES.ACCOUNT }}
            />
            <Tab.Screen
                name={TAB_NAMES.CART_TAB}
                component={CartStack}
                options={{
                    title: SCREEN_NAMES.CART,
                    tabBarBadge: cartItemsCount > 0 ? cartItemsCount : undefined,
                }}
            />
        </Tab.Navigator>
    );
};

export default TabNavigator;