import React from 'react';
import Tailwind from '../../libs/tailwinds/Tailwind.lib';
import {View, Text, TouchableHighlight} from 'react-native';
import {ChevronLeftIcon} from 'react-native-heroicons/outline';
import {useNavigation} from '@react-navigation/native';

const TopBar = ({showGoBack = true, title, subTitle}) => {
  const navigation = useNavigation();
  return (
    <View
      style={Tailwind`absolute top-0 flex-row items-center bg-white h-18 w-full shadow-lg z-10 ${
        showGoBack ? 'gap-1' : 'px-6'
      }`}>
      <TouchableHighlight
        underlayColor={'#605CA820'}
        onPress={() => navigation.goBack()}
        style={Tailwind`px-4 h-full items-center justify-center ${
          showGoBack ? '' : 'hidden'
        }`}>
        <ChevronLeftIcon style={Tailwind`text-black`} size={20} />
      </TouchableHighlight>
      <View styl={Tailwind`flex-1`}>
        <Text style={Tailwind`font-gothic--semibold text-xl text-gray-900`}>
          {title}
        </Text>
        <Text style={Tailwind`font-gothic--medium text-xs text-gray-400`}>
          {subTitle}
        </Text>
      </View>
    </View>
  );
};
export default TopBar;
