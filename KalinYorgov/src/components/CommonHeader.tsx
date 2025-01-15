import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../theme/colors';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { RootStackParamList } from '../navigation/routes';
import { Typography } from './base/Typography';
import { styles } from './CommonHeader.styles';

type Props = {
    title: string;
    navigation?: any;
};

const CommonHeader: React.FC<Props> = ({ title, navigation }) => {
    const nav = useNavigation<DrawerNavigationProp<RootStackParamList>>();

    const openDrawer = () => {
        (navigation || nav).dispatch(DrawerActions.openDrawer());
    };

    return (
        <View style={styles.header}>
            <TouchableOpacity onPress={openDrawer} style={styles.burgerMenu}>
                <Icon name="menu" size={24} color={colors.white} />
            </TouchableOpacity>
            <Typography variant="h3" style={styles.title}>{title}</Typography>
        </View>
    );
};

export default CommonHeader;
