import * as React from 'react';
import {View} from 'react-native';
import Tailwind from '../../libs/tailwinds/Tailwind.lib';

export default function Divider({color}) {
  return (
    <View
      style={Tailwind`border-b  border-${color ? color : 'gray-200'} w-full`}
    />
  );
}
