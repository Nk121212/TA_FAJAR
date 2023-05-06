import {ToastAndroid} from 'react-native';
import axios from '../../config/axios/Axios.config';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ReqGetProfile = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await axios.get('/api_user', {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
        // 'Content-Type': 'multipart/form-data',
        Accept: 'application/json',
      },
    });

    return response?.data;
  } catch (err) {
    console.log('err__ReqGetDashboard', err);
    ToastAndroid.show(
      err?.response?.data?.message
        ? err?.response?.data?.message
        : 'Network Error',
      2000,
    );
    return err?.response?.data;
  }
};

export const ReqUpdateProfile = async data => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await axios.post('/api_update_profile', data, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
        'Content-Type': 'multipart/form-data',
        Accept: 'application/json',
      },
    });

    ToastAndroid.show('Berhasil Update Profil', 2000);
    return {
      success: true,
      user: response.data,
    };
  } catch (err) {
    console.log('err__ReqUpdateProfile', err);
    ToastAndroid.show(
      err?.response?.data?.message
        ? err?.response?.data?.message
        : err?.response?.data
        ? err.response.data
        : 'Network Error',
      2000,
    );
    return {
      success: false,
    };
  }
};
