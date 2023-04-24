import React from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Tailwind from '../libs/tailwinds/Tailwind.lib';
import {
  CheckIcon,
  EnvelopeIcon,
  EyeSlashIcon,
  LockClosedIcon,
} from 'react-native-heroicons/outline';
import CustomButton from '../components/molecules/CustomButton.molecule';

export default function Login({navigation}) {
  const height = Dimensions.get('window').height;

  const handleLogin = () => {
    return navigation.push('Dashboard');
  };

  return (
    <SafeAreaView style={Tailwind`min-w-full min-h-full bg-white`}>
      <ScrollView
        contentContainerStyle={Tailwind`h-[${height}px] items-center justify-center`}>
        <View style={Tailwind` w-full items-center justify-center`}>
          <Image
            source={require('../assets/logo/logo.png')}
            resizeMethod="scale"
            resizeMode="contain"
            style={Tailwind`w-48 h-48`}
          />
          <Text
            style={Tailwind`font-gothic--semibold text-xl text-primary--purple my-8`}>
            SISTEM MANAJEMEN STOK
          </Text>

          <View style={Tailwind`mt-4 px-12 w-full flex-col gap-8`}>
            <View
              style={Tailwind`flex-row items-center border-b border-gray-300 gap-2`}>
              <EnvelopeIcon style={Tailwind`text-primary--purple`} />
              <TextInput
                placeholder="Email"
                placeholderTextColor={'#10101040'}
                style={Tailwind`font-gothic--regular text-sm text-black flex-1 py-1`}
              />
            </View>
            <View
              style={Tailwind`flex-row items-center border-b border-gray-300 gap-2`}>
              <LockClosedIcon style={Tailwind`text-primary--purple`} />
              <TextInput
                placeholder="Password"
                placeholderTextColor={'#10101040'}
                style={Tailwind`font-gothic--regular text-sm text-black flex-1 py-1`}
              />
              <TouchableOpacity activeOpacity={0.7}>
                <EyeSlashIcon style={Tailwind`text-gray-500`} />
              </TouchableOpacity>
            </View>
            <View style={Tailwind`flex-row items-center gap-2`}>
              <View
                style={Tailwind`border border-gray-400 bg-white rounded-md w-5 h-5 items-center justify-center`}>
                <CheckIcon style={Tailwind`text-gray-900`} size={15} />
              </View>
              <Text
                style={Tailwind`font-gothic--regular text-sm text-gray-600`}>
                Remember Password
              </Text>
            </View>

            <View style={Tailwind`w-full h-13`}>
              <CustomButton
                onPress={handleLogin}
                text={'Login'}
                color={'bg-primary--purple'}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
