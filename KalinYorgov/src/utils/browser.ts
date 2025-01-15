import { Linking } from 'react-native';
import InAppBrowser from 'react-native-inappbrowser-reborn';

export const openInAppBrowser = async (url: string) => {
    try {
        if (await InAppBrowser.isAvailable()) {
            const result = await InAppBrowser.open(url, {
                // iOS Options
                dismissButtonStyle: 'close',
                preferredBarTintColor: '#ffffff',
                preferredControlTintColor: '#000000',
                readerMode: false,
                animated: true,
                modalPresentationStyle: 'overFullScreen',
                modalTransitionStyle: 'coverVertical',
                modalEnabled: true,
                enableBarCollapsing: false,
                // Android Options
                showTitle: true,
                toolbarColor: '#ffffff',
                secondaryToolbarColor: '#ffffff',
                enableUrlBarHiding: true,
                enableDefaultShare: false,
                forceCloseOnRedirection: false,
                animations: {
                    startEnter: 'slide_in_right',
                    startExit: 'slide_out_left',
                    endEnter: 'slide_in_left',
                    endExit: 'slide_out_right'
                },
                headers: {
                    'my-custom-header': 'my custom header value'
                },
                hasBackButton: true,
                browserPackage: undefined,
                showInRecents: true
            });
        } else {
            await Linking.openURL(url);
        }
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : 'Failed to open browser');
    }
};