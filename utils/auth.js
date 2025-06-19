import AsyncStorage from '@react-native-async-storage/async-storage';

const ACCESS_TOKEN_KEY = 'accessToken';

export const setTokens = async ({ accessToken }) => {
  try {
    if (accessToken) {
      await AsyncStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
      console.log('[setTokens] accessToken saved:', accessToken);
    }
  } catch (err) {
    console.log('[setTokens] Error saving token:', err);
  }
};

export const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem(ACCESS_TOKEN_KEY);
    console.log('[getToken] accessToken:', token);
    return token;
  } catch (err) {
    console.log('[getToken] Error reading token:', err);
    return null;
  }
};

export const removeTokens = async () => {
  try {
    await AsyncStorage.removeItem(ACCESS_TOKEN_KEY);
    console.log('[removeTokens] accessToken removed');
  } catch (err) {
    console.log('[removeTokens] Error removing token:', err);
  }
};