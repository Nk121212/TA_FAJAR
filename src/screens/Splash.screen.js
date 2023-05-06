import React, {useEffect, useState} from 'react';
import {Image, SafeAreaView, Text, ToastAndroid, View} from 'react-native';
import Tailwind from '../libs/tailwinds/Tailwind.lib';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {RequestLogin} from '../libs/fetchings/Auth.lib';
import {LoginReducer} from '../config/reducers/Auth.reducer';
import {useDispatch} from 'react-redux';

export default function Splash({navigation}) {
  const dispatch = useDispatch();
  // useEffect(() => {
  //   ToastAndroid.show('This demo app is made by MY@TH Productions', 10000);
  //   const redirect = setTimeout(() => {
  //     navigation.replace('Login');
  //   }, 2000);
  //   return () => clearTimeout(redirect);
  // }, [navigation]);

  useEffect(() => {
    const initData = async () => {
      const remember = await AsyncStorage.getItem('remember_me');
      if (JSON.parse(remember)) {
        const user = await AsyncStorage.getItem('user');
        const parsedUser = JSON.parse(user);
        const response = await RequestLogin(
          parsedUser.email,
          parsedUser.password,
        );
        if (response?.success) {
          await AsyncStorage.setItem('token', JSON.stringify(response?.token));

          await AsyncStorage.setItem(
            'user',
            JSON.stringify({
              ...response?.user,
              password: parsedUser.password,
            }),
          );

          dispatch(LoginReducer(response?.user));
          return navigation.reset({index: 0, routes: [{name: 'Dashboard'}]});
        } else {
          setTimeout(() => {
            navigation.replace('Login');
          }, 2000);
        }
      } else {
        setTimeout(() => {
          navigation.replace('Login');
        }, 2000);
      }
    };
    initData();
  });

  return (
    <SafeAreaView>
      <View
        style={Tailwind`w-full h-full bg-primary--purple items-center justify-center`}>
        <Image
          source={require('../assets/logo/logo.png')}
          resizeMethod="scale"
          resizeMode="contain"
          style={Tailwind`w-64 h-64 flex-1`}
        />
        <View style={Tailwind`mb-6 items-center justify-center`}>
          <Text style={Tailwind`font-gothic--medium text-sm text-white`}>
            Powered by Wangi Project
          </Text>
          <Text
            style={Tailwind`font-gothic--regular text-sm text-white/70 mt-2`}>
            Versi 1.0
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
