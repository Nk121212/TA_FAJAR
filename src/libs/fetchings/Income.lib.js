import {ToastAndroid} from 'react-native';
import axios from '../../config/axios/Axios.config';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ReqGetIncome = async (tanggal_awal, tanggal_akhir) => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await axios.get('/api_pendapatan', {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
        // 'Content-Type': 'multipart/form-data',
        Accept: 'application/json',
      },
      params: {
        tanggal_awal,
        tanggal_akhir,
      },
    });

    return response?.data;
  } catch (err) {
    console.log('err__ReqGetIncome', err);
    ToastAndroid.show(
      err?.response?.data?.message
        ? err?.response?.data?.message
        : 'Network Error',
      2000,
    );
    return err?.response?.data;
  }
};
