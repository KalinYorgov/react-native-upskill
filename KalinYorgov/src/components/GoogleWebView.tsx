import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';
import { styles } from './GoogleWebView.styles';

const GoogleWebView: React.FC = () => {
    const [hasError, setHasError] = useState(false);
    const [errorInfo, setErrorInfo] = useState<string>('');
    const webViewRef = useRef<WebView>(null);

    const handleError = (syntheticEvent: any) => {
        const { nativeEvent } = syntheticEvent;
        console.error('WebView error:', JSON.stringify(nativeEvent, null, 2));
        setErrorInfo(JSON.stringify(nativeEvent, null, 2));
        setHasError(true);
    };

    const handleHttpError = (syntheticEvent: any) => {
        const { nativeEvent } = syntheticEvent;
        console.warn('WebView HTTP error:', JSON.stringify(nativeEvent, null, 2));
        setErrorInfo(JSON.stringify(nativeEvent, null, 2));
    };

    const handleLoad = () => {
        console.log('WebView loaded successfully');
        setHasError(false);
    };

    const handleLoadStart = (syntheticEvent: any) => {
        const { nativeEvent } = syntheticEvent;
        console.log('WebView started loading:', nativeEvent.url);
    };

    const handleLoadEnd = (syntheticEvent: any) => {
        const { nativeEvent } = syntheticEvent;
        console.log('WebView finished loading:', nativeEvent.url);
    };

    const retry = () => {
        console.log('Retrying to load WebView');
        setHasError(false);
        setErrorInfo('');
        if (webViewRef.current) {
            webViewRef.current.reload();
        }
    };

    if (hasError) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>Unable to load the webpage. Please check your internet connection.</Text>
                <Text style={styles.errorInfo}>{errorInfo}</Text>
                <TouchableOpacity style={styles.retryButton} onPress={retry}>
                    <Text style={styles.retryButtonText}>Retry</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <WebView
            ref={webViewRef}
            source={{ uri: 'https://google.com' }}
            style={styles.webview}
            onError={handleError}
            onHttpError={handleHttpError}
            onLoad={handleLoad}
            onLoadStart={handleLoadStart}
            onLoadEnd={handleLoadEnd}
            cacheEnabled={false}
            cacheMode="LOAD_NO_CACHE"
            domStorageEnabled={true}
            javaScriptEnabled={true}
            startInLoadingState={true}
            originWhitelist={['*']}
            mixedContentMode="always"
            allowsBackForwardNavigationGestures
            onShouldStartLoadWithRequest={() => true}
            onContentProcessDidTerminate={retry}
        />
    );
};

export default GoogleWebView;
