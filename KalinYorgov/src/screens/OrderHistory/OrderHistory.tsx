import React, { useState, useEffect } from 'react';
import { WebView } from 'react-native-webview';
import { View, Text } from 'react-native';
import { Container } from '../../components/base/Container';
import Spinner from '../../components/spinner/Spinner';
import { colors } from '../../theme/colors';
import { STOREFRONT_ORDER_HISTORY } from '../../services/config';
import { styles } from './OrderHistory.styles';
import { useSelector } from 'react-redux';
import { getUser } from '../../store/account/selectors';
import { authenticate } from '../../services/authentication';

export const OrderHistory = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [cookiesSet, setCookiesSet] = useState(false);
    const userData = useSelector(getUser);
    const authToken = userData?.token;

    useEffect(() => {
        const setAuthToken = async () => {
            if (authToken) {
                await authenticate(authToken);
                setTimeout(() => {
                    setCookiesSet(true);
                }, 1000);
            }
        };
        setAuthToken();
    }, [authToken]);

    if (!authToken) {
        return (
            <Container>
                <Text style={{ color: 'red', padding: 20 }}>
                    Please log in to view your order history
                </Text>
            </Container>
        );
    }

    return (
        <Container>
            {isLoading && (
                <View style={styles.loadingContainer}>
                    <Spinner color={colors.primary} size="large" />
                    <Text style={styles.loadingText}>Loading order history...</Text>
                </View>
            )}
            {cookiesSet && (
                <WebView
                    source={{
                        uri: STOREFRONT_ORDER_HISTORY,
                        headers: {
                            Authorization: authToken,
                        }
                    }}
                    startInLoadingState
                    onLoad={() => setIsLoading(false)}
                    sharedCookiesEnabled={true}
                    javaScriptEnabled={true}
                    thirdPartyCookiesEnabled={true}
                />
            )}
        </Container>
    );
};

export default OrderHistory;