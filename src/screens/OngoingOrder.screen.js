import {FlatList, SafeAreaView, Text, TextInput, View} from 'react-native';
import TopBar from '../components/organisms/TopBar.organism';
import Spacer from '../components/atoms/Spacer.atom';
import Tailwind from '../libs/tailwinds/Tailwind.lib';
import {MagnifyingGlassIcon} from 'react-native-heroicons/outline';
import Divider from '../components/atoms/Divider.atom';
import CustomButton from '../components/molecules/CustomButton.molecule';
import {useEffect, useState} from 'react';
import {ReqOnProcessOrderList} from '../libs/fetchings/OnProcessOrder.lib';

export default function OngoingOrder({navigation}) {
  const [listOrder, setListOrder] = useState(null);
  useEffect(() => {
    const initData = async () => {
      const response = await ReqOnProcessOrderList();

      setListOrder(response.data);
    };
    initData();
  }, []);
  const handleNavToEdit = () => {
    return navigation.push('OngoingEdit');
  };

  const handleNavToDetail = item => {
    return navigation.push('DetailOrder', {id: item.no_pesanan});
  };

  return (
    <SafeAreaView style={Tailwind`w-full h-full`}>
      <TopBar title={'Pesanan Berjalan'} subTitle={'Administrator'} />
      <Spacer height={'18'} width={'full'} />

      {/* Content Start --- */}
      <View style={Tailwind`px-6 mt-4 flex-1`}>
        <View
          style={Tailwind`flex-row items-center gap-2 bg-white rounded-md px-3 shadow`}>
          <MagnifyingGlassIcon style={Tailwind`text-gray-400`} />
          <TextInput
            placeholder="Cari jenis pesanan"
            placeholderTextColor={'#10101040'}
            style={Tailwind`font-gothic--regular text-sm text-gray-900 flex-1`}
          />
        </View>

        <View style={Tailwind``}>
          <FlatList
            data={listOrder}
            initialNumToRender={10}
            ListHeaderComponent={() => <Spacer height={'4'} width={'full'} />}
            ListFooterComponent={() => <Spacer height={'18'} width={'full'} />}
            ItemSeparatorComponent={() => (
              <Spacer height={'4'} width={'full'} />
            )}
            keyExtractor={(item, index) => index}
            renderItem={({item, index}) => (
              <View style={Tailwind`p-3 bg-white rounded-md shadow`}>
                <View style={Tailwind`flex-row items-center gap-2`}>
                  <View
                    style={Tailwind`px-4 py-2 flex-1 bg-primary--purple rounded-md flex-row items-center justify-between`}>
                    <Text
                      style={Tailwind`font-gothic--semibold text-base text-white text-center`}>
                      {item?.kode_po}
                    </Text>
                    <View style={Tailwind`bg-white/30 px-3 py-1 rounded-md`}>
                      <Text
                        style={Tailwind`font-gothic--semibold text-white text-xs`}>
                        {item?.status.toUpperCase()}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={Tailwind`my-4 flex-col gap-2`}>
                  <View style={Tailwind`flex-row items-start`}>
                    <Text
                      style={Tailwind`font-gothic--semibold text-sm text-gray-900 flex-1`}>
                      Estimasi Pengerjaan
                    </Text>
                  </View>
                  <View style={Tailwind`flex-row items-start justify-between`}>
                    <Text
                      style={Tailwind`font-gothic--regular text-sm text-gray-500 flex-1`}>
                      Mulai
                    </Text>
                    <Text
                      style={Tailwind`font-gothic--medium text-sm text-gray-900 flex-2 text-right`}>
                      {item?.mulai || '-'}
                    </Text>
                  </View>
                  <View style={Tailwind`flex-row items-start`}>
                    <Text
                      style={Tailwind`font-gothic--regular text-sm text-gray-500 flex-1`}>
                      Selesai
                    </Text>
                    <Text
                      style={Tailwind`font-gothic--medium text-sm text-gray-900 flex-2 text-right`}>
                      {item?.selesai || '-'}
                    </Text>
                  </View>
                  <View style={Tailwind`flex-row items-start`}>
                    <Text
                      style={Tailwind`font-gothic--regular text-sm text-gray-500 flex-1`}>
                      Dikerjakan
                    </Text>
                    <Text
                      style={Tailwind`font-gothic--medium text-sm text-gray-900 flex-2 text-right`}>
                      {item?.pegawai || '-'}
                    </Text>
                  </View>
                  <View style={Tailwind`flex-row items-start`}>
                    <Text
                      style={Tailwind`font-gothic--regular text-sm text-gray-500 flex-1`}>
                      No.Pesanan
                    </Text>
                    <Text
                      style={Tailwind`font-gothic--medium text-sm text-gray-900 flex-2 text-right`}>
                      {item?.no_pesanan || '-'}
                    </Text>
                  </View>
                </View>
                <Divider />
                <View
                  style={Tailwind`w-full flex-row justify-between gap-2 mt-4`}>
                  <CustomButton
                    color={'bg-blue-400'}
                    text={'Lihat Detail'}
                    height={'2'}
                    onPress={() => handleNavToDetail(item)}
                  />
                  <CustomButton
                    color={'bg-green-500'}
                    text={'Edit'}
                    height={'2'}
                    onPress={() => handleNavToEdit()}
                  />
                </View>
              </View>
            )}
          />
        </View>
      </View>
      {/* Content Start --- */}
    </SafeAreaView>
  );
}
