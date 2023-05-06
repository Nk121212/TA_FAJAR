import React, {useState} from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import Tailwind from '../libs/tailwinds/Tailwind.lib';
import {
  CheckIcon,
  EnvelopeIcon,
  EyeIcon,
  EyeSlashIcon,
  LockClosedIcon,
} from 'react-native-heroicons/outline';
import CustomButton from '../components/molecules/CustomButton.molecule';
import {RequestLogin} from '../libs/fetchings/Auth.lib';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {LoginReducer} from '../config/reducers/Auth.reducer';

export default function Login({navigation}) {
  const height = Dimensions.get('window').height;
  const dispatch = useDispatch();
  const [secure, setSecure] = useState(true);
  const [remember, setRemember] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const handleLogin = async () => {
    if (!form.email || !form.password)
      return ToastAndroid.show('Harap masukan Email dan Password', 2000);

    setIsLoading(true);
    const response = await RequestLogin(form.email, form.password);

    if (response?.success) {
      await AsyncStorage.setItem('token', JSON.stringify(response?.token));
      await AsyncStorage.setItem('remember_me', JSON.stringify(remember));
      await AsyncStorage.setItem(
        'user',
        JSON.stringify({
          ...response?.user,
          password: form.password,
        }),
      );

      dispatch(LoginReducer(response?.user));
      navigation.reset({index: 0, routes: [{name: 'Dashboard'}]});
      setIsLoading(false);
      return;
    } else {
      setIsLoading(false);
    }
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
                onChangeText={text => setForm(prev => ({...prev, email: text}))}
                placeholder="Email"
                placeholderTextColor={'#10101040'}
                style={Tailwind`font-gothic--regular text-sm text-black flex-1 py-1`}
              />
            </View>
            <View
              style={Tailwind`flex-row items-center border-b border-gray-300 gap-2`}>
              <LockClosedIcon style={Tailwind`text-primary--purple`} />
              <TextInput
                secureTextEntry={secure}
                onChangeText={text =>
                  setForm(prev => ({...prev, password: text}))
                }
                placeholder="Password"
                placeholderTextColor={'#10101040'}
                style={Tailwind`font-gothic--regular text-sm text-black flex-1 py-1`}
              />
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => setSecure(prev => !prev)}>
                {secure ? (
                  <EyeSlashIcon style={Tailwind`text-gray-500`} />
                ) : (
                  <EyeIcon style={Tailwind`text-gray-500`} />
                )}
              </TouchableOpacity>
            </View>
            <View style={Tailwind`flex-row items-center gap-2`}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setRemember(prev => !prev)}
                style={Tailwind`border border-gray-400 bg-white rounded-md w-5 h-5 items-center justify-center`}>
                <CheckIcon
                  style={Tailwind`${
                    remember ? 'text-gray-900' : 'text-transparent'
                  }`}
                  size={15}
                />
              </TouchableOpacity>
              <Text
                style={Tailwind`font-gothic--regular text-sm text-gray-600`}>
                Remember Me
              </Text>
            </View>

            <View style={Tailwind`w-full h-13`}>
              <CustomButton
                onPress={handleLogin}
                text={isLoading ? 'Logging in' : 'Login'}
                color={isLoading ? 'bg-gray-300' : 'bg-primary--purple'}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
