import {SafeAreaView, View, Text, ScrollView, TextInput} from 'react-native';
import TopBar from '../components/organisms/TopBar.organism';
import BottomNavbar from '../components/organisms/BottomNavbar.organism';
import Tailwind from '../libs/tailwinds/Tailwind.lib';
import Spacer from '../components/atoms/Spacer.atom';
import CustomButton from '../components/molecules/CustomButton.molecule';
import CustomButtonNoFlex from '../components/molecules/CustomButtonNoFlex.molecule';
import TextCols from '../components/molecules/TextCols.organism';
import {InformationCircleIcon} from 'react-native-heroicons/outline';
import {useState} from 'react';

export default function PortalCheck() {
  const [isExist, setIsExist] = useState(false);

  const handleSearch = () => {
    setIsExist(prev => !prev);
  };

  return (
    <SafeAreaView style={Tailwind`w-full h-full`}>
      <TopBar title={'Portal Pengecekan'} subTitle={'Administrator'} />
      <Spacer height={'18'} width={'full'} />

      <View style={Tailwind`p-6`}>
        <View style={Tailwind`bg-white rounded-md p-3`}>
          <Text
            style={Tailwind`font-gothic--semibold text-sm text-primary--purple mb-2`}>
            Masukan Kata Kunci
          </Text>

          <TextInput
            placeholder="Masukan Kode Bahan"
            placeholderTextColor={'#10101040'}
            style={Tailwind`font-gothic--regular text-sm text-gray-900 bg-white border border-gray-300 px-3 text-center rounded-md`}
          />
          <Text
            style={Tailwind`font-gothic--regular text-sm text-gray-400 text-center my-1`}>
            atau
          </Text>
          <TextInput
            placeholder="Masukan Nama Bahan"
            placeholderTextColor={'#10101040'}
            style={Tailwind`font-gothic--regular text-sm text-gray-900 bg-white border border-gray-300 px-3 text-center rounded-md`}
          />
          <View style={Tailwind`mt-6`}>
            <CustomButtonNoFlex
              color={'bg-primary--purple'}
              text={'Cari'}
              height={3}
              onPress={() => handleSearch()}
            />
          </View>
        </View>

        <View
          style={Tailwind`bg-white rounded-md p-3 mt-8 border border-red-500 ${
            isExist ? '' : 'hidden'
          }`}>
          <Text
            style={Tailwind`font-gothic--semibold text-sm text-primary--purple`}>
            Hasil Pencarian
          </Text>

          <View style={Tailwind`px-3 bg-primary--purple/05 rounded my-3`}>
            <TextCols title="Kode" value="1234567890" />
            <TextCols title="Kategori" value="Kayu" />
            <TextCols title="Nama" value="Box Heagon" />
            <TextCols title="Stok" value="3" />
          </View>

          <View
            style={Tailwind`flex-row items-center gap-1 bg-red-50 px-3 py-1 rounded-md`}>
            <InformationCircleIcon color={'red'} size={18} />
            <Text style={Tailwind`font-gothic--regular text-xs text-red-500`}>
              Stok harus lebih dari 3
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
