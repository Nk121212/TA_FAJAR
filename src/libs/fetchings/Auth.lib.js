import {ToastAndroid} from 'react-native';
import axios from '../../config/axios/Axios.config';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const RequestLogin = async (email = '', password = '') => {
  try {
    const response = await axios.post(
      '/api_login',
      {email, password},
      {
        headers: {
          // Authorization: `Bearer ${token}`,
          // 'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
        },
      },
    );

    return response?.data;
  } catch (err) {
    console.log('err__RequestLogin', err);
    ToastAndroid.show(
      err?.response?.data?.message
        ? err?.response?.data?.message
        : 'Network Error',
      2000,
    );
    return err?.response?.data;
  }
};

export const ReqLogout = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await axios.post('/api_logout', null, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
        // 'Content-Type': 'multipart/form-data',
        Accept: 'application/json',
      },
    });

    return response?.data;
  } catch (err) {
    console.log('err__ReqLogout', err);
    ToastAndroid.show(
      err?.response?.data?.message
        ? err?.response?.data?.message
        : 'Network Error',
      2000,
    );
    return err?.response?.data;
  }
};
