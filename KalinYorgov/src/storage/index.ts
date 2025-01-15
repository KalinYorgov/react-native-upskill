import * as Keychain from 'react-native-keychain';

export const setData = async (key: string, value: string) => {
    try {
        await Keychain.setGenericPassword(key, value);
    } catch (error) {
        console.error('Error saving data:', error);
    }
};

export const getData = async (key: string) => {
    try {
        const credentials = await Keychain.getGenericPassword();
        if (credentials && typeof credentials !== 'boolean') {
            return credentials.password;
        }
        return null;
    } catch (error) {
        console.error('Error retrieving data:', error);
        return null;
    }
};

export const removeData = async (key: string) => {
    try {
        await Keychain.resetGenericPassword();
    } catch (error) {
        console.error('Error removing data:', error);
    }
};