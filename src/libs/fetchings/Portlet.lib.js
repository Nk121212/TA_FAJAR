import {ToastAndroid} from 'react-native';
import axios from '../../config/axios/Axios.config';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ReqStokPortlet = async (kode_produk, nama_produk) => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await axios.get('/api_portlet', {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
        // 'Content-Type': 'multipart/form-data',
        Accept: 'application/json',
      },
      params: {
        kode_produk,
        nama_produk,
      },
    });

    return response?.data;
  } catch (err) {
    console.log('err__ReqStokPortlet', err);
    ToastAndroid.show(
      err?.response?.data?.message
        ? 'Gagal mendapatkan data.'
        : 'Network Error',
      2000,
    );
    return err?.response?.data;
  }
};
