import {
  Alert,
  FlatList,
  SafeAreaView,
  Text,
  TextInput,
  ToastAndroid,
  View,
} from 'react-native';
import TopBar from '../components/organisms/TopBar.organism';
import Spacer from '../components/atoms/Spacer.atom';
import Tailwind from '../libs/tailwinds/Tailwind.lib';
import {MagnifyingGlassIcon} from 'react-native-heroicons/outline';
import Divider from '../components/atoms/Divider.atom';
import CustomButton from '../components/molecules/CustomButton.molecule';
import {useEffect, useState} from 'react';
import {
  ReqDeleteOrder,
  ReqSendOrder,
  ReqWaitingOrdeList,
} from '../libs/fetchings/WaitListOrder.lib';
import LoadingFetch from '../components/organisms/LoadingFetch.organism';

export default function WaitingOrder() {
  const [listOrder, setListOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const initData = async () => {
    const response = await ReqWaitingOrdeList();

    setListOrder(response.data);
  };

  useEffect(() => {
    initData();
  }, []);

  const onDelete = async id => {
    setIsLoading(true);
    const response = await ReqDeleteOrder(id);
    if (response && response?.status) {
      ToastAndroid.show(response?.message, 2000);
      await initData();
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  };

  const onSend = async id => {
    setIsLoading(true);
    const response = await ReqSendOrder(id);
    if (response && response?.status) {
      ToastAndroid.show(response?.message, 2000);
      await initData();
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  };

  const handleDelete = id => {
    Alert.alert(
      'Konfirmasi Hapus Pesanan',
      'Apakah Anda ingin menghapus pesanan ini?',
      [
        {text: 'Batal', onPress: () => console.log('Batal Hapus')},
        {
          text: 'Hapus',
          onPress: () => onDelete(id),
          style: 'destructive',
        },
      ],
    );
  };

  const handleSent = id => {
    Alert.alert(
      'Konfirmasi Kirim Pesanan',
      'Apakah Anda ingin mengirim pesanan ini?',
      [
        {text: 'Batal', onPress: () => console.log('Batal Kirim')},
        {
          text: 'Kirim',
          onPress: () => onSend(id),
          style: 'destructive',
        },
      ],
    );
  };

  return (
    <SafeAreaView style={Tailwind`w-full h-full`}>
      <TopBar title={'Pesanan Tunggu'} subTitle={'Administrator'} />
      <Spacer height={'18'} width={'full'} />

      {/* Content Start --- */}
      <View style={Tailwind`px-6 mt-4 flex-1`}>
        {/* <View
          style={Tailwind`flex-row items-center gap-2 bg-white rounded-md px-3 shadow`}>
          <MagnifyingGlassIcon style={Tailwind`text-gray-400`} />
          <TextInput
            placeholder="Cari jenis pesanan"
            placeholderTextColor={'#10101040'}
            style={Tailwind`font-gothic--regular text-sm text-gray-900 flex-1`}
          />
        </View> */}

        <View style={Tailwind``}>
          <FlatList
            data={listOrder}
            // initialNumToRender={10}
            ListHeaderComponent={() => <Spacer height={'4'} width={'full'} />}
            ListFooterComponent={() => <Spacer height={'18'} width={'full'} />}
            ItemSeparatorComponent={() => (
              <Spacer height={'4'} width={'full'} />
            )}
            keyExtractor={(item, index) => index}
            renderItem={({item, index}) => (
              <View style={Tailwind`p-3 bg-white rounded-md shadow`}>
                <View style={Tailwind`p-4 bg-primary--purple rounded-md`}>
                  <Text
                    style={Tailwind`font-gothic--semibold text-base text-white text-center`}>
                    {item?.nama_catalog || '-'}
                  </Text>
                </View>
                <View style={Tailwind`my-4 flex-col gap-2`}>
                  <View style={Tailwind`flex-row items-start justify-between`}>
                    <Text
                      style={Tailwind`font-gothic--regular text-sm text-gray-500 flex-1`}>
                      No. Pesanan
                    </Text>
                    <Text
                      style={Tailwind`font-gothic--medium text-sm text-gray-900 flex-2 text-right`}>
                      {item?.id_penjualan || '-'}
                    </Text>
                  </View>
                  <View style={Tailwind`flex-row items-start`}>
                    <Text
                      style={Tailwind`font-gothic--regular text-sm text-gray-500 flex-1`}>
                      Nama
                    </Text>
                    <Text
                      style={Tailwind`font-gothic--medium text-sm text-gray-900 flex-2 text-right`}>
                      {item?.nama_pemesan || '-'}
                    </Text>
                  </View>
                  <View style={Tailwind`flex-row items-start`}>
                    <Text
                      style={Tailwind`font-gothic--regular text-sm text-gray-500 flex-1`}>
                      No. Telp
                    </Text>
                    <Text
                      style={Tailwind`font-gothic--medium text-sm text-gray-900 flex-2 text-right`}>
                      {item?.telepon || '-'}
                    </Text>
                  </View>
                  <View style={Tailwind`flex-row items-start`}>
                    <Text
                      style={Tailwind`font-gothic--regular text-sm text-gray-500 flex-1`}>
                      Alamat
                    </Text>
                    <Text
                      style={Tailwind`font-gothic--medium text-sm text-gray-900 flex-2 text-right`}>
                      {item?.alamat || '-'}
                    </Text>
                  </View>
                </View>
                <Divider />
                <View
                  style={Tailwind`w-full flex-row justify-between gap-2 mt-4`}>
                  <CustomButton
                    color={'bg-red-500'}
                    text={'Hapus'}
                    height={'2'}
                    onPress={() => handleDelete(item?.id_penjualan)}
                  />
                  <CustomButton
                    color={'bg-green-500'}
                    text={'Kirim'}
                    height={'2'}
                    onPress={() => handleSent(item?.id_penjualan)}
                  />
                </View>
              </View>
            )}
          />
        </View>
      </View>
      {/* Content Start --- */}
      {isLoading && <LoadingFetch />}
    </SafeAreaView>
  );
}
