import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { TabParamList, RootStackParamList } from '../../navigation/routes';

export type NavigationIconProps = {
    color: string;
    size: number;
};

export type DrawerScreenProps = {
    navigation: DrawerContentComponentProps['navigation'];
};

export type CategoryWrapperProps = {
    categoryId: string;
};

export type DrawerNavigationProps = DrawerContentComponentProps['navigation'];

export type MainTabNavigationProps = {
    screen: keyof TabParamList;
};

export type DrawerNavigationScreenProps = {
    name: keyof RootStackParamList;
    component: React.ComponentType<any>;
    options: {
        title: string;
        drawerIcon: (props: NavigationIconProps) => JSX.Element;
    };
};