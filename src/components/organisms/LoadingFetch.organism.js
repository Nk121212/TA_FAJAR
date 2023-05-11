import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import Tailwind from '../../libs/tailwinds/Tailwind.lib';

export default function LoadingFetch() {
  return (
    <View
      style={Tailwind`absolute inset-0 bg-white w-full h-full items-center justify-center z-15`}>
      <ActivityIndicator size={'large'} color={'#605CA8'} />
    </View>
  );
}
