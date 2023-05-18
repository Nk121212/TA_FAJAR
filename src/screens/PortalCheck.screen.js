import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  TextInput,
  ToastAndroid,
  FlatList,
} from 'react-native';
import TopBar from '../components/organisms/TopBar.organism';
import BottomNavbar from '../components/organisms/BottomNavbar.organism';
import Tailwind from '../libs/tailwinds/Tailwind.lib';
import Spacer from '../components/atoms/Spacer.atom';
import CustomButton from '../components/molecules/CustomButton.molecule';
import CustomButtonNoFlex from '../components/molecules/CustomButtonNoFlex.molecule';
import TextCols from '../components/molecules/TextCols.organism';
import {InformationCircleIcon} from 'react-native-heroicons/outline';
import {useState} from 'react';
import {ReqStokPortlet} from '../libs/fetchings/Portlet.lib';
import {ToRupiah} from '../helper/NumberFormat.lib';
import LoadingFetch from '../components/organisms/LoadingFetch.organism';
import {useSelector} from 'react-redux';

export default function PortalCheck() {
  const user = useSelector(state => state.auth.user);
  const [isExist, setIsExist] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [product, setProduct] = useState(null);
  const [form, setForm] = useState({
    kode_produk: '',
    nama_produk: '',
  });

  const handleSearch = async () => {
    if (form.kode_produk == '' && form.nama_produk == '') {
      return ToastAndroid.show('Masukan kode atau nama bahan.', 2000);
    }
    setIsLoading(true);
    const response = await ReqStokPortlet(form.kode_produk, form.nama_produk);
    if (response && response?.result && response.data[0] !== null) {
      setProduct(response?.data);
      setIsExist(true);
    } else {
      setProduct(null);
      setIsExist(false);
      ToastAndroid.show('Data tidak ditemukan', 2000);
    }
    setIsLoading(false);
  };

  return (
    <SafeAreaView style={Tailwind`w-full h-full`}>
      <TopBar
        title={'Portal Pengecekan'}
        subTitle={user.level === 1 ? 'Administrator' : 'Pegawai'}
      />
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
            value={form.kode_produk}
            onChangeText={text =>
              setForm(prev => ({...prev, kode_produk: text}))
            }
          />
          <Text
            style={Tailwind`font-gothic--regular text-sm text-gray-400 text-center my-1`}>
            atau
          </Text>
          <TextInput
            placeholder="Masukan Nama Bahan"
            placeholderTextColor={'#10101040'}
            style={Tailwind`font-gothic--regular text-sm text-gray-900 bg-white border border-gray-300 px-3 text-center rounded-md`}
            value={form.nama_produk}
            onChangeText={text =>
              setForm(prev => ({...prev, nama_produk: text}))
            }
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

        <View style={Tailwind`${isExist ? '' : 'hidden'}`}>
          <Text
            style={Tailwind`font-gothic--semibold text-sm text-primary--purple mt-4 mb-2`}>
            Hasil Pencarian
          </Text>
          <FlatList
            data={product}
            keyExtractor={(item, index) => index}
            ListFooterComponent={() => <Spacer height={'20'} width={'full'} />}
            renderItem={({item, index}) => (
              <View
                style={Tailwind`bg-white rounded-md p-3 mt-4 border ${
                  item?.stok < 3 ? 'border-red-500' : 'border-white'
                } ${isExist ? '' : 'hidden'}`}>
                <View style={Tailwind`px-3 bg-primary--purple/05 rounded my-3`}>
                  <TextCols title="Kode" value={item?.kode_produk} />
                  <TextCols title="Kategori" value={item?.nama_kategori} />
                  <TextCols title="Nama" value={item?.nama_produk} />
                  <TextCols title="Stok" value={item?.stok} />
                  <TextCols
                    title="Harga beli"
                    value={`Rp${ToRupiah(item?.harga_beli)}`}
                  />
                </View>

                {item?.stok < 3 && (
                  <View
                    style={Tailwind`flex-row items-center gap-1 bg-red-50 px-3 py-1 rounded-md`}>
                    <InformationCircleIcon color={'red'} size={18} />
                    <Text
                      style={Tailwind`font-gothic--regular text-xs text-red-500`}>
                      Stok harus lebih dari 3
                    </Text>
                  </View>
                )}
              </View>
            )}
          />
        </View>
      </View>

      {isLoading && <LoadingFetch />}
    </SafeAreaView>
  );
}
