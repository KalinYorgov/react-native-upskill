import React, { useRef, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { CompositeNavigationProp } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { StackNavigationProp } from '@react-navigation/stack';
import { TAB_NAMES, WEB_NAVIGATION_EVENTS } from '../../constants';
import { Container } from '../../components/base/Container';
import CustomWebView from '../../components/base/CustomWebView';
import { OCAPI_INSTANCE_HOST, OCAPI_SITE } from '../../services/config';
import { RootStackParamList, HomeStackParamList } from '../../navigation/routes';
import { WebViewMessageEvent } from 'react-native-webview';
import eventEmitter, { EVENTS } from '../../services/eventEmitter';
import { Alert } from 'react-native';

type HomeScreenNavigationProp = CompositeNavigationProp<
    StackNavigationProp<HomeStackParamList>,
    DrawerNavigationProp<RootStackParamList>
>;

interface WebViewNavigationMessage {
    type: 'NAVIGATION';
    route: string;
    data: Record<string, any>;
}

const HomeScreen: React.FC = () => {
    const navigation = useNavigation<HomeScreenNavigationProp>();
    const lastNavigationTime = useRef<number>(0);

    useEffect(() => {
        const handleTerms = () => {
            Alert.alert('Terms & Conditions', 'Welcome to our Terms & Conditions. These terms outline your rights and responsibilities when using our service.');
        };

        const handleCookies = () => {
            Alert.alert('Cookie Settings', 'We use cookies to enhance your browsing experience and analyze site traffic.');
        };

        eventEmitter.on(EVENTS.SHOW_TERMS, handleTerms);
        eventEmitter.on(EVENTS.SHOW_COOKIES, handleCookies);

        return () => {
            eventEmitter.off(EVENTS.SHOW_TERMS, handleTerms);
            eventEmitter.off(EVENTS.SHOW_COOKIES, handleCookies);
        };
    }, []);

    const handleMessage = (event: WebViewMessageEvent) => {
        const currentTime = Date.now();
        if (currentTime - lastNavigationTime.current < 1000) return;

        try {
            const message: WebViewNavigationMessage = JSON.parse(event.nativeEvent.data);

            if (message.type === 'NAVIGATION') {
                switch (message.route) {
                    case WEB_NAVIGATION_EVENTS.ACCOUNT_TAB:
                        navigation.navigate(TAB_NAMES.MAIN_TABS, {
                            screen: TAB_NAMES.ACCOUNT_TAB
                        });
                        break;
                    case WEB_NAVIGATION_EVENTS.CART_TAB:
                        navigation.navigate(TAB_NAMES.MAIN_TABS, {
                            screen: TAB_NAMES.CART_TAB
                        });
                        break;
                    default:
                        console.warn('Unrecognized route:', message.route);
                }

                lastNavigationTime.current = currentTime;
            }
        } catch (error) {
            console.error('Message handling error:', error);
        }
    };

    return (
        <Container>
            <CustomWebView
                source={{ uri: `${OCAPI_INSTANCE_HOST}${OCAPI_SITE}` }}
                onMessage={handleMessage}
            />
        </Container>
    );
};

export default HomeScreen;
