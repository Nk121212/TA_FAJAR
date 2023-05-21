import {ToastAndroid} from 'react-native';
import axios from '../../config/axios/Axios.config';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ReqWaitingOrdeList = async search => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await axios.get('/get_pesanan_menunggu', {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
        // 'Content-Type': 'multipart/form-data',
        Accept: 'application/json',
      },
      params: {
        search,
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

export const ReqDeleteOrder = async id_penjualan => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await axios.delete(`/delete_pesanan/${id_penjualan}`, {
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

export const ReqSendOrder = async id_penjualan => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await axios.get(`/kirim_pesanan/${id_penjualan}`, {
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
