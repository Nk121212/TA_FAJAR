import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  TextInput,
  ToastAndroid,
} from 'react-native';
import TopBar from '../components/organisms/TopBar.organism';
import BottomNavbar from '../components/organisms/BottomNavbar.organism';
import Tailwind from '../libs/tailwinds/Tailwind.lib';
import Spacer from '../components/atoms/Spacer.atom';
import CustomButton from '../components/molecules/CustomButton.molecule';
import {useEffect, useState} from 'react';
import {
  ReqGetExpenseById,
  ReqUpdateExpenseById,
} from '../libs/fetchings/Expense.lib';
import CustomButtonNoFlex from '../components/molecules/CustomButtonNoFlex.molecule';

export default function ExpenseEdit({route, navigation}) {
  const rId = route?.params?.id;
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    deskripsi: '',
    nominal: '',
  });

  const initData = async () => {
    setIsLoading(true);
    const response = await ReqGetExpenseById(rId);

    setForm(prev => ({
      ...prev,
      deskripsi: response?.deskripsi,
      nominal: response?.nominal,
    }));
    setIsLoading(false);
  };

  const handleSimpan = async () => {
    setIsLoading(true);
    const response = await ReqUpdateExpenseById(
      rId,
      form.deskripsi,
      Number(form.nominal),
    );

    if (response) {
      navigation.goBack();
      ToastAndroid.show('Data berhasil disimpan', 2000);
    } else {
      ToastAndroid.show('Terjadi Kesalahan', 2000);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    initData();
  }, []);
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
            value={form.deskripsi}
            onChangeText={text => setForm(prev => ({...prev, deskripsi: text}))}
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
              value={form.nominal.toString()}
              onChangeText={text => setForm(prev => ({...prev, nominal: text}))}
            />
          </View>

          <View style={Tailwind`mt-8`}>
            <CustomButtonNoFlex
              color={'bg-primary--purple'}
              text={'Simpan'}
              onPress={handleSimpan}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
