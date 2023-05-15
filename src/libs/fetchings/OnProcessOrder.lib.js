import {ToastAndroid} from 'react-native';
import axios from '../../config/axios/Axios.config';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ReqOnProcessOrderList = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await axios.get('/get_pesanan_berjalan', {
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

export const ReqGetDetailOrder = async no_pesanan => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await axios.get(`/get_penjualan/${no_pesanan}`, {
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

export const ReqUpdateOrder = async (
  id,
  id_statuses,
  id_user,
  assigne,
  start_date,
  end_date,
) => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await axios.get(`/update_penjualan/${id}`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
        // 'Content-Type': 'multipart/form-data',
        Accept: 'application/json',
      },
      params: {
        id_statuses,
        id_user,
        assigne,
        start_date,
        end_date,
      },
    });

    return response?.data;
  } catch (err) {
    console.log('err__ReqUpdateOrder', err);
    ToastAndroid.show(
      err?.response?.data?.message ? 'Update pesanan gagal' : 'Network Error',
      2000,
    );
    return err?.response?.data;
  }
};
