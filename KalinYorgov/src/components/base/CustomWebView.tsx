import React, { useState, useRef } from 'react';
import { View, Platform, Alert, Text, TouchableOpacity } from 'react-native';
import WebView from 'react-native-webview';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import Spinner from '../spinner/Spinner';
import { colors } from '../../theme/colors';
import { styles } from './CustomWebView.styles';

interface CustomWebViewProps {
    source: { uri: string };
    onMessage?: (event: any) => void;
    requiresCamera?: boolean;
}

const CustomWebView: React.FC<CustomWebViewProps> = ({
    source,
    onMessage,
    requiresCamera = false
}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const webViewRef = useRef<WebView>(null);

    const checkAndRequestCameraPermission = async () => {
        if (!requiresCamera) return;

        try {
            const permission = Platform.select({
                ios: PERMISSIONS.IOS.CAMERA,
                android: PERMISSIONS.ANDROID.CAMERA,
            });

            if (!permission) return;

            const result = await check(permission);

            if (result === RESULTS.DENIED) {
                const permissionResult = await request(permission);
                if (permissionResult !== RESULTS.GRANTED) {
                    Alert.alert(
                        'Camera Permission Required',
                        'Please enable camera access in your device settings to use this feature.',
                        [{ text: 'OK' }]
                    );
                }
            } else if (result === RESULTS.BLOCKED) {
                Alert.alert(
                    'Camera Permission Required',
                    'Please enable camera access in your device settings to use this feature.',
                    [{ text: 'OK' }]
                );
            }
        } catch (error) {
            console.error('Camera permission error:', error);
            Alert.alert(
                'Error',
                'Failed to request camera permission. Please try again.',
                [{ text: 'OK' }]
            );
        }
    };

    React.useEffect(() => {
        checkAndRequestCameraPermission();
    }, []);

    const createWebViewBridge = () => `
    (function() {
        window.AppBridge = {
            navigate: function(route, data = {}) {
                window.ReactNativeWebView.postMessage(JSON.stringify({
                    type: 'NAVIGATION',
                    route: route,
                    data: data
                }));
            },

            _interceptedElements: new WeakSet(),

            interceptClick: function(element, route) {
                if (this._interceptedElements.has(element)) return;

                element.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();

                    const data = {
                        href: element.href || '',
                        text: element.textContent || '',
                    };

                    this.navigate(route, data);
                    return false;
                });

                this._interceptedElements.add(element);
            },

            setupObserver: function() {
                const config = { childList: true, subtree: true };
                const callback = (mutationsList, observer) => {
                    this.setupInterceptors();
                };

                const observer = new MutationObserver(callback);
                observer.observe(document.body, config);

                window.addEventListener('unload', () => observer.disconnect());
            },

            setupInterceptors: function() {
                const routes = {
                    cart: {
                        selectors: [
                            '.cart-icon',
                            '[data-testid="cart-icon"]',
                            'a[href*="cart"]',
                            'button[aria-label*="cart"]',
                            '.minicart-link'
                        ],
                        route: 'navigation:CartTab'
                    },
                    account: {
                        selectors: [
                            '.account-link',
                            '[data-testid="account-link"]',
                            'a[href*="login"]',
                            'a[href*="account"]',
                            '.user-info',
                            '.login-link'
                        ],
                        route: 'navigation:AccountTab'
                    }
                };

                Object.values(routes).forEach(({ selectors, route }) => {
                    selectors.forEach(selector => {
                        document.querySelectorAll(selector).forEach(element => {
                            this.interceptClick(element, route);
                        });
                    });
                });
            },

            init: function() {
                this.setupInterceptors();
                this.setupObserver();

                window.addEventListener('error', (event) => {
                    console.error('AppBridge error:', event.error);
                });
            }
        };

        window.AppBridge.init();
    })();
`;

    const handleError = () => {
        setHasError(true);
        setIsLoading(false);
        Alert.alert(
            'Error',
            'Failed to load the page. Please check your internet connection and try again.',
            [{ text: 'Retry', onPress: () => webViewRef.current?.reload() }]
        );
    };

    if (hasError) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>Failed to load the page</Text>
                <TouchableOpacity
                    style={styles.retryButton}
                    onPress={() => {
                        setHasError(false);
                        setIsLoading(true);
                        webViewRef.current?.reload();
                    }}
                >
                    <Text style={styles.retryButtonText}>Retry</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <WebView
                ref={webViewRef}
                source={source}
                style={styles.webview}
                onLoadStart={() => setIsLoading(true)}
                onLoadEnd={() => {
                    setIsLoading(false);
                    webViewRef.current?.injectJavaScript(createWebViewBridge()  + '; true;');
                }}
                onError={handleError}
                onMessage={onMessage}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                allowsInlineMediaPlayback={true}
                mediaPlaybackRequiresUserAction={false}
                allowsFullscreenVideo={true}
                onShouldStartLoadWithRequest={() => true}
            />
            {isLoading && (
                <View style={styles.spinnerContainer}>
                    <Spinner size="large" color={colors.primary} />
                </View>
            )}
        </View>
    );
};

export default CustomWebView;