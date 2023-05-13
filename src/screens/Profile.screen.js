import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import BottomNavbar from '../components/organisms/BottomNavbar.organism';
import Tailwind from '../libs/tailwinds/Tailwind.lib';
import TopBar from '../components/organisms/TopBar.organism';
import Spacer from '../components/atoms/Spacer.atom';
import {
  EnvelopeIcon,
  EyeIcon,
  EyeSlashIcon,
  InformationCircleIcon,
  LockClosedIcon,
  MapPinIcon,
  PencilSquareIcon,
  PhoneIcon,
  UserCircleIcon,
  XCircleIcon,
} from 'react-native-heroicons/outline';
import CustomButtonNoFlex from '../components/molecules/CustomButtonNoFlex.molecule';
import CustomButton from '../components/molecules/CustomButton.molecule';
import Divider from '../components/atoms/Divider.atom';
import {useDispatch, useSelector} from 'react-redux';
import {ReqGetProfile, ReqUpdateProfile} from '../libs/fetchings/Profile.lib';
import {LoginReducer} from '../config/reducers/Auth.reducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ReqLogout} from '../libs/fetchings/Auth.lib';
import {DEFAULT_IMG_URI, IMG_URL} from '../helper/constant.helper';
import {PlusCircleIcon} from 'react-native-heroicons/solid';
import {launchImageLibrary} from 'react-native-image-picker';

export default function Profile({navigation}) {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth.user);
  const [isEdit, setIsEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingLogout, setIsLoadingLogout] = useState(false);
  const [imgSource, setImgSource] = useState(null);
  const [user, setUser] = useState({
    name: '',
    no_telp: '',
    alamat: '',
    email: '',
    foto: '',
  });
  const [password, setPassword] = useState({
    old: '',
    new: '',
    confirm: '',
  });

  const [showPassword, setShowPassword] = useState({
    old: false,
    new: false,
    confirm: false,
  });

  const initData = async () => {
    setIsLoading(true);
    const response = await ReqGetProfile();
    setUser(prev => ({
      ...prev,
      name: response.name,
      no_telp: response.no_telp,
      alamat: response.alamat,
      email: response.email,
      foto: response.foto,
    }));
    setIsLoading(false);
  };

  useEffect(() => {
    initData();
  }, []);

  const handleEnableEdit = async () => {
    setIsEdit(prev => !prev);
  };

  const handleLogout = async () => {
    setIsLoadingLogout(true);
    await ReqLogout();
    AsyncStorage.getAllKeys().then(keys => AsyncStorage.multiRemove(keys));
    return navigation.reset({index: 0, routes: [{name: 'Login'}]});
  };

  const handleUpdate = async () => {
    setIsLoading(true);

    const formData = new FormData();
    formData.append('name', user.name);
    formData.append('no_telp', user.no_telp);
    formData.append('alamat', user.alamat);

    if (password.old !== '') {
      formData.append('old_password', password.old);
    }
    if (password.new !== '') {
      formData.append('password', password.new);
    }
    if (password.confirm !== '') {
      formData.append('password_confirmation', password.confirm);
    }
    if (imgSource !== null) {
      formData.append('foto', {
        type: imgSource.type,
        name: imgSource.fileName,
        uri: imgSource.uri,
      });
    }

    const response = await ReqUpdateProfile(formData);
    if (response?.success) {
      setIsLoading(false);
      dispatch(LoginReducer(response?.user));
      handleEnableEdit();
      setPassword(prev => ({...prev, old: '', new: '', confirm: ''}));
    } else {
      setIsLoading(false);
    }

    setIsLoading(false);
  };

  const handleImagePick = () => {
    const options = {
      title: 'Select Image',
      mediaType: 'photo',
      quality: 0.6,
      presentationStyle: 'fullScreen',
    };

    launchImageLibrary(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = response.assets[0];

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };

        // Set the image source state variable:

        setImgSource(source);
      }
    });
  };
  return (
    <SafeAreaView style={Tailwind`min-w-full min-h-full`}>
      <TopBar
        title={'Profil'}
        showGoBack={false}
        subTitle={auth.level === 1 ? 'Administrator' : 'Pegawai'}
      />
      <ScrollView>
        <Spacer height={'18'} width={'full'} />
        {/* Content Start --- */}
        <View style={Tailwind`p-6`}>
          <View style={Tailwind`items-center justify-center overflow-hidden`}>
            <TouchableOpacity
              disabled={!isEdit}
              activeOpacity={0.7}
              onPress={() => handleImagePick()}>
              <Image
                source={{
                  uri: imgSource
                    ? imgSource.uri
                    : user.foto
                    ? IMG_URL + user.foto
                    : DEFAULT_IMG_URI,
                }}
                resizeMethod="scale"
                resizeMode="contain"
                style={Tailwind`h-32 w-32 rounded-full`}
              />
              {isEdit && (
                <View style={Tailwind`absolute bottom-0 right-0`}>
                  <PlusCircleIcon
                    style={Tailwind`text-primary--purple`}
                    size={32}
                  />
                </View>
              )}
            </TouchableOpacity>
          </View>

          <View style={Tailwind`mt-8 bg-white p-4 rounded-md flex-col gap-3`}>
            <View style={Tailwind`items-end`}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={handleEnableEdit}
                style={Tailwind`${
                  isEdit ? 'bg-red-500' : 'bg-primary--purple'
                } px-3 py-1 rounded-md flex-row items-center justify-center gap-1`}>
                {isEdit ? (
                  <>
                    <XCircleIcon style={Tailwind`text-white`} size={16} />
                    <Text
                      style={Tailwind`font-gothic--regular text-sm text-white`}>
                      Batal
                    </Text>
                  </>
                ) : (
                  <>
                    <PencilSquareIcon style={Tailwind`text-white`} size={16} />
                    <Text
                      style={Tailwind`font-gothic--regular text-sm text-white`}>
                      Edit
                    </Text>
                  </>
                )}
              </TouchableOpacity>
            </View>
            <View
              style={Tailwind`flex-row items-center border-b border-gray-300 gap-2`}>
              <UserCircleIcon style={Tailwind`text-primary--purple`} />
              <TextInput
                placeholder="Nama"
                placeholderTextColor={'#10101040'}
                style={Tailwind`font-gothic--regular text-sm text-black flex-1 py-1`}
                editable={isEdit}
                value={user?.name}
                onChangeText={v => setUser(prev => ({...prev, name: v}))}
              />
            </View>
            <View
              style={Tailwind`flex-row items-center border-b border-gray-300 gap-2`}>
              <PhoneIcon style={Tailwind`text-primary--purple`} />
              <TextInput
                placeholder="No. Telepon"
                placeholderTextColor={'#10101040'}
                keyboardType="number-pad"
                style={Tailwind`font-gothic--regular text-sm text-black flex-1 py-1`}
                editable={isEdit}
                value={user?.no_telp}
                onChangeText={v => setUser(prev => ({...prev, no_telp: v}))}
              />
            </View>
            <View
              style={Tailwind`flex-row items-center border-b border-gray-300 gap-2`}>
              <MapPinIcon style={Tailwind`text-primary--purple`} />
              <TextInput
                placeholder="Alamat"
                placeholderTextColor={'#10101040'}
                style={Tailwind`font-gothic--regular text-sm text-black flex-1 py-1`}
                editable={isEdit}
                value={user?.alamat}
                onChangeText={v => setUser(prev => ({...prev, alamat: v}))}
              />
            </View>
            <View
              style={Tailwind`flex-row items-center border-b border-gray-300 gap-2 ${
                isEdit ? 'bg-gray-100' : ''
              }`}>
              <EnvelopeIcon style={Tailwind`text-primary--purple`} />
              <TextInput
                placeholder="Email"
                placeholderTextColor={'#10101040'}
                style={Tailwind`font-gothic--regular text-sm text-black flex-1 py-1`}
                editable={false}
                value={user?.email}
              />
            </View>
            <View
              style={Tailwind`flex-row items-center border-b border-gray-300 gap-2`}>
              <LockClosedIcon style={Tailwind`text-primary--purple`} />

              <TextInput
                placeholder="Password Lama"
                placeholderTextColor={'#10101040'}
                style={Tailwind`font-gothic--regular text-sm text-black flex-1 py-1`}
                editable={isEdit}
                secureTextEntry={!showPassword.old}
                value={password.old}
                onChangeText={v => setPassword(prev => ({...prev, old: v}))}
              />
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() =>
                  setShowPassword(prev => ({...prev, old: !prev.old}))
                }>
                {showPassword.old ? (
                  <EyeIcon style={Tailwind`text-gray-400`} />
                ) : (
                  <EyeSlashIcon style={Tailwind`text-gray-400`} />
                )}
              </TouchableOpacity>
            </View>
            <View
              style={Tailwind`flex-row items-center border-b border-gray-300 gap-2`}>
              <LockClosedIcon style={Tailwind`text-primary--purple`} />
              <TextInput
                placeholder="Password Baru"
                placeholderTextColor={'#10101040'}
                style={Tailwind`font-gothic--regular text-sm text-black flex-1 py-1`}
                editable={isEdit}
                secureTextEntry={!showPassword.new}
                value={password.new}
                onChangeText={v => setPassword(prev => ({...prev, new: v}))}
              />
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() =>
                  setShowPassword(prev => ({...prev, new: !prev.new}))
                }>
                {showPassword.new ? (
                  <EyeIcon style={Tailwind`text-gray-400`} />
                ) : (
                  <EyeSlashIcon style={Tailwind`text-gray-400`} />
                )}
              </TouchableOpacity>
            </View>
            <View
              style={Tailwind`flex-row items-center border-b border-gray-300 gap-2`}>
              <LockClosedIcon style={Tailwind`text-primary--purple`} />
              <TextInput
                placeholder="Konfiramsi Passwird Baru"
                placeholderTextColor={'#10101040'}
                style={Tailwind`font-gothic--regular text-sm text-black flex-1 py-1`}
                editable={isEdit}
                secureTextEntry={!showPassword.confirm}
                value={password.confirm}
                onChangeText={v => setPassword(prev => ({...prev, confirm: v}))}
              />
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() =>
                  setShowPassword(prev => ({...prev, confirm: !prev.confirm}))
                }>
                {showPassword.confirm ? (
                  <EyeIcon style={Tailwind`text-gray-400`} />
                ) : (
                  <EyeSlashIcon style={Tailwind`text-gray-400`} />
                )}
              </TouchableOpacity>
            </View>

            <View style={Tailwind`mt-4 ${isEdit ? '' : 'hidden'}`}>
              <View style={Tailwind`flex-row items-center gap-1 mb-2`}>
                <InformationCircleIcon
                  style={Tailwind`text-gray-500`}
                  size={16}
                />
                <Text
                  style={Tailwind`font-gothic--regular text-xs text-gray-500`}>
                  Abaikan password jika tidak mengubahnya
                </Text>
              </View>

              <CustomButtonNoFlex
                onPress={() => handleUpdate()}
                color={isLoading ? 'bg-gray-300' : 'bg-primary--purple'}
                text={'Update'}
                height={'3'}
                disabled={isLoading}
              />
            </View>
          </View>

          <View style={Tailwind`mt-12 mb-4`}>
            <Divider color={'gray-300'} />
            <CustomButtonNoFlex
              color={isLoadingLogout ? 'bg-gray-300' : 'bg-red-600 mt-4'}
              text={'Logout'}
              onPress={() => handleLogout()}
            />
          </View>
        </View>
        {/* Content End --- */}
        <Spacer height={'8'} width={'full'} />
      </ScrollView>
      <BottomNavbar />
    </SafeAreaView>
  );
}
