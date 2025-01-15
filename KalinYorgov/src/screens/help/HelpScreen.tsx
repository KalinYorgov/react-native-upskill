import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { RootStackParamList, TabParamList } from '../../navigation/routes';
import CommonHeader from '../../components/CommonHeader';
import { Container } from '../../components/base/Container';
import { Typography } from '../../components/base/Typography';
import { TAB_NAMES } from '../../constants';
import { styles } from './HelpScreen.styles';

type HelpScreenNavigationProp = CompositeNavigationProp<
    BottomTabNavigationProp<TabParamList, typeof TAB_NAMES.HELP_TAB>,
    DrawerNavigationProp<RootStackParamList>
>;

const HelpScreen: React.FC = () => {
    const navigation = useNavigation<HelpScreenNavigationProp>();

    return (
        <Container>
            <CommonHeader title="Help" />
            <Container scroll scrollProps={{ contentContainerStyle: styles.content }}>
                <Typography variant="h1" style={styles.title}>Help & Support</Typography>
                <Typography variant="body1">
                    If you need assistance, please contact our customer support team at support@example.com or call us at 1-800-123-4567.
                </Typography>
            </Container>
        </Container>
    );
};

export default HelpScreen;
