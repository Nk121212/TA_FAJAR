import React from 'react';
import Tailwind from '../../libs/tailwinds/Tailwind.lib';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  Dimensions,
  KeyboardAvoidingView,
  TouchableHighlight,
  View,
} from 'react-native';
import {
  HomeIcon as HomeIconOutline,
  ShoppingCartIcon as ShoppingCartIconOutline,
  UserIcon as UserIconOutline,
} from 'react-native-heroicons/outline';
import {
  HomeIcon as HomeIconSolid,
  ShoppingCartIcon as ShoppingCartIconSolid,
  UserIcon as UserIconSolid,
} from 'react-native-heroicons/solid';

const BottomNavbar = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const height = Dimensions.get('window').height;

  const _renderIcons = (condition, iconActive, iconDeactive) => (
    <>{condition ? iconActive : iconDeactive}</>
  );

  return (
    <View
      style={Tailwind`absolute top-[${
        height - 56
      }px] w-full shadow-lg bg-white flex-row z-10`}>
      <TouchableHighlight
        underlayColor={'#605CA840'}
        onPress={() =>
          route.name === 'Dashboard' ? null : navigation.push('Dashboard')
        }
        style={Tailwind`flex-1 py-4 items-center justify-center`}>
        {_renderIcons(
          route.name === 'Dashboard',
          <HomeIconSolid style={Tailwind`text-primary--purple`} />,
          <HomeIconOutline style={Tailwind`text-gray-900`} />,
        )}
      </TouchableHighlight>
      <TouchableHighlight
        underlayColor={'#605CA840'}
        onPress={() =>
          route.name === 'Transaction' ? null : navigation.push('Transaction')
        }
        style={Tailwind`flex-1 py-4 items-center justify-center`}>
        {_renderIcons(
          route.name === 'Transaction',
          <ShoppingCartIconSolid style={Tailwind`text-primary--purple`} />,
          <ShoppingCartIconOutline style={Tailwind`text-gray-900`} />,
        )}
      </TouchableHighlight>
      <TouchableHighlight
        underlayColor={'#605CA840'}
        onPress={() =>
          route.name === 'Profile' ? null : navigation.push('Profile')
        }
        style={Tailwind`flex-1 py-4 items-center justify-center`}>
        {_renderIcons(
          route.name === 'Profile',
          <UserIconSolid style={Tailwind`text-primary--purple`} />,
          <UserIconOutline style={Tailwind`text-gray-900`} />,
        )}
      </TouchableHighlight>
    </View>
  );
};

export default BottomNavbar;
