import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import RNBootSplash from 'react-native-bootsplash';
import { RootNavigation } from './src/components/navigation/RootNavigation';
import { store } from './src/store/store';
import { loadInitialState, initializeCart } from './src/store/slices/cartSlice';
import { getStoredCredentials } from './src/services/authentication';
import { login } from './src/store/slices/authSlice';
import { initializeFirebase } from './src/services/firebase';

function App() {
    useEffect(() => {
        const init = async () => {
            const unsubscribeFirebase = await initializeFirebase();

            const initialCartState = await loadInitialState();
            store.dispatch(initializeCart(initialCartState));

            const credentials = await getStoredCredentials();
            if (credentials) {
                store.dispatch(login({
                    email: credentials.username,
                    password: credentials.password
                }));
            }

            await RNBootSplash.hide({ fade: true });

            return () => {
                unsubscribeFirebase();
            };
        };
        init();
    }, []);

    const linking = {
        prefixes: ['myapp://'],
        config: {
            screens: {
                ProductDetails: 'productDetails/:productId',
            },
        },
    };

    return (
        <Provider store={store}>
            <SafeAreaProvider>
                <NavigationContainer linking={linking}>
                    <RootNavigation />
                </NavigationContainer>
            </SafeAreaProvider>
        </Provider>
    );
}

export default App;