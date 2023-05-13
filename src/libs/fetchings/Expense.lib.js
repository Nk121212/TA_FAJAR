import {ToastAndroid} from 'react-native';
import axios from '../../config/axios/Axios.config';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ReqGetExpenseUntillToday = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await axios.get('/api_pengeluaran', {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
        // 'Content-Type': 'multipart/form-data',
        Accept: 'application/json',
      },
    });

    return response?.data;
  } catch (err) {
    console.log('err__ReqGetExpenseUntillToday', err);
    ToastAndroid.show(
      err?.response?.data?.message ? 'Gagal mendapatkan data' : 'Network Error',
      2000,
    );
    return err?.response?.data;
  }
};

export const ReqGetExpenseByDate = async (tanggal_awal, tanggal_akhir) => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await axios.get('/api_pengeluaran_by_date', {
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
    console.log('err__ReqGetExpenseByDate', err);
    ToastAndroid.show(
      err?.response?.data?.message ? 'Gagal mendapatkan data' : 'Network Error',
      2000,
    );
    return err?.response?.data;
  }
};

export const ReqGetExpenseById = async id_pengeluaran => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await axios.get('/api_pengeluaran_get/' + id_pengeluaran, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
        // 'Content-Type': 'multipart/form-data',
        Accept: 'application/json',
      },
    });

    return response?.data;
  } catch (err) {
    console.log('err__ReqGetExpenseById', err);
    ToastAndroid.show(
      err?.response?.data?.message ? 'Gagal mendapatkan data' : 'Network Error',
      2000,
    );
    return err?.response?.data;
  }
};

export const ReqUpdateExpenseById = async (
  id_pengeluaran,
  deskripsi,
  nominal,
) => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await axios.get(
      '/api_pengeluaran_update/' + id_pengeluaran,
      {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
          // 'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
        },
        params: {
          deskripsi,
          nominal,
        },
      },
    );

    return true;
  } catch (err) {
    console.log('err__ReqUpdateExpenseById', err);
    ToastAndroid.show(
      err?.response?.data?.message ? 'Gagal mendapatkan data' : 'Network Error',
      2000,
    );
    return false;
  }
};

export const ReqAddExpense = async (deskripsi, nominal) => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await axios.get('/api_pengeluaran_store', {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
        // 'Content-Type': 'multipart/form-data',
        Accept: 'application/json',
      },
      params: {
        deskripsi,
        nominal,
      },
    });

    return true;
  } catch (err) {
    console.log('err__ReqUpdateExpenseById', err);
    ToastAndroid.show(
      err?.response?.data?.message ? 'Gagal mendapatkan data' : 'Network Error',
      2000,
    );
    return false;
  }
};

export const ReqDeleteExpenseById = async id_pengeluaran => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await axios.get(
      '/api_pengeluaran_delete/' + id_pengeluaran,
      {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
          // 'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
        },
      },
    );

    return true;
  } catch (err) {
    console.log('err__ReqDeleteExpenseById', err);
    ToastAndroid.show(
      err?.response?.data?.message ? 'Gagal mendapatkan data' : 'Network Error',
      2000,
    );
    return false;
  }
};
