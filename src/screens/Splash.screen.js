import React, {useEffect} from 'react';
import {Image, SafeAreaView, Text, ToastAndroid, View} from 'react-native';
import Tailwind from '../libs/tailwinds/Tailwind.lib';

export default function Splash({navigation}) {
  useEffect(() => {
    ToastAndroid.show('This demo app is made by MY@TH Productions', 10000);
    const redirect = setTimeout(() => {
      navigation.replace('Login');
    }, 2000);
    return () => clearTimeout(redirect);
  }, [navigation]);

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
