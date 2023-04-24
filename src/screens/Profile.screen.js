import React, {useState} from 'react';
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

export default function Profile({navigation}) {
  const [isEdit, setIsEdit] = useState(false);

  const handleEnableEdit = () => {
    setIsEdit(prev => !prev);
  };

  const handleLogout = () => {
    return navigation.reset({index: 0, routes: [{name: 'Login'}]});
  };

  return (
    <SafeAreaView style={Tailwind`min-w-full min-h-full`}>
      <TopBar title={'Profil'} subTitle={'Adminisatrator'} showGoBack={false} />
      <ScrollView>
        <Spacer height={'18'} width={'full'} />
        {/* Content Start --- */}
        <View style={Tailwind`p-6`}>
          <View style={Tailwind`items-center justify-center overflow-hidden`}>
            <Image
              source={{
                uri: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
              }}
              resizeMethod="scale"
              resizeMode="contain"
              style={Tailwind`h-32 w-32 rounded-full`}
            />
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
              />
            </View>
            <View
              style={Tailwind`flex-row items-center border-b border-gray-300 gap-2`}>
              <MapPinIcon style={Tailwind`text-primary--purple`} />
              <TextInput
                placeholder="Alamat"
                placeholderTextColor={'#10101040'}
                keyboardType="number-pad"
                style={Tailwind`font-gothic--regular text-sm text-black flex-1 py-1`}
                editable={isEdit}
              />
            </View>
            <View
              style={Tailwind`flex-row items-center border-b border-gray-300 gap-2`}>
              <EnvelopeIcon style={Tailwind`text-primary--purple`} />
              <TextInput
                placeholder="Email"
                placeholderTextColor={'#10101040'}
                style={Tailwind`font-gothic--regular text-sm text-black flex-1 py-1`}
                editable={isEdit}
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
              />
              <EyeSlashIcon style={Tailwind`text-gray-400`} />
            </View>
            <View
              style={Tailwind`flex-row items-center border-b border-gray-300 gap-2`}>
              <LockClosedIcon style={Tailwind`text-primary--purple`} />
              <TextInput
                placeholder="Password Baru"
                placeholderTextColor={'#10101040'}
                style={Tailwind`font-gothic--regular text-sm text-black flex-1 py-1`}
                editable={isEdit}
              />
              <EyeSlashIcon style={Tailwind`text-gray-400`} />
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
                color={'bg-primary--purple'}
                text={'Update'}
                height={'3'}
              />
            </View>
          </View>

          <View style={Tailwind`mt-12 mb-4`}>
            <Divider color={'gray-300'} />
            <CustomButtonNoFlex
              color={'bg-red-600 mt-4'}
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
