import {SafeAreaView, View, Text, ScrollView, TextInput} from 'react-native';
import TopBar from '../components/organisms/TopBar.organism';
import BottomNavbar from '../components/organisms/BottomNavbar.organism';
import Tailwind from '../libs/tailwinds/Tailwind.lib';
import Spacer from '../components/atoms/Spacer.atom';
import CustomButton from '../components/molecules/CustomButton.molecule';

export default function ExpenseEdit() {
  return (
    <SafeAreaView style={Tailwind`w-full h-full`}>
      <TopBar title={'Edit'} subTitle={'Administartor'} />
      <ScrollView>
        <Spacer height={'18'} width={'full'} />

        <View style={Tailwind`mt-4 bg-white p-6`}>
          <Text
            style={Tailwind`font-gothic--regular text-sm text-primary--purple mb-3`}>
            Deskripsi
          </Text>
          <TextInput
            placeholder="Masukan deskripsi"
            placeholderTextColor={'#10101040'}
            textAlignVertical="top"
            maxLength={200}
            style={Tailwind`font-gothic--regular text-sm text-gray-900 border border-gray-300 p-3 rounded-md`}
            numberOfLines={5}
            multiline
          />
          <Text
            style={Tailwind`font-gothic--regular text-sm text-primary--purple mt-6 mb-3`}>
            Nominal
          </Text>
          <View
            style={Tailwind`flex-row items-center border border-gray-300 px-3 py-0 rounded-md`}>
            <Text
              style={Tailwind`font-gothic--regular text-base text-gray-900`}>
              Rp
            </Text>
            <TextInput
              placeholder="Masukan nominal"
              placeholderTextColor={'#10101040'}
              maxLength={9}
              style={Tailwind`font-gothic--regular text-sm text-gray-900 flex-1`}
              keyboardType="number-pad"
            />
          </View>

          <View style={Tailwind`mt-8`}>
            <CustomButton color={'bg-primary--purple'} text={'Simpan'} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
