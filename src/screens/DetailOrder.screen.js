import {SafeAreaView, View, Text, ScrollView} from 'react-native';
import TopBar from '../components/organisms/TopBar.organism';
import BottomNavbar from '../components/organisms/BottomNavbar.organism';
import Tailwind from '../libs/tailwinds/Tailwind.lib';
import Spacer from '../components/atoms/Spacer.atom';
import TextCols from '../components/molecules/TextCols.organism';
import {useEffect, useState} from 'react';
import {ReqGetDetailOrder} from '../libs/fetchings/OnProcessOrder.lib';
import LoadingFetch from '../components/organisms/LoadingFetch.organism';

export default function DetailOrder({route}) {
  const rId = route?.params?.id;
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const initData = async () => {
      setIsLoading(true);
      const response = await ReqGetDetailOrder(rId);

      setProduct(response?.data[0]);
      setIsLoading(false);
    };
    initData();
  }, [rId]);

  return (
    <SafeAreaView style={Tailwind`h-full w-full`}>
      <TopBar title={'Detail PO'} subTitle={'Administrator'} />
      <ScrollView>
        <Spacer height={'18'} width={'full'} />

        {/* Content Start --- */}
        <View style={Tailwind`bg-white mt-4 p-6`}>
          <View
            style={Tailwind`bg-primary--purple justify-center items-center w-[50%] py-2 rounded-md mb-2`}>
            <Text style={Tailwind`font-gothic--semibold text-sm text-white`}>
              DATA PEMESANAN
            </Text>
          </View>
          <TextCols title={'Produk'} value={product?.nama_catalog} />
          <TextCols title={'Nama'} value={product?.nama_pemesan} />
          <TextCols title={'No. Telepon'} value={product?.telepon} />
          <TextCols title={'Alamat'} value={product?.alamat} />
        </View>

        <View style={Tailwind`bg-white mt-4 p-6 mt-4`}>
          <View
            style={Tailwind`bg-primary--purple justify-center items-center w-[50%] py-2 rounded-md mb-2`}>
            <Text style={Tailwind`font-gothic--semibold text-sm text-white`}>
              DATA TRANSAKSI
            </Text>
          </View>
          <TextCols title={'Tgl. Pesanan'} value={product?.created_at} />
          <TextCols title={'Harga'} value={`Rp${product?.harga_bayar}`} />
          <TextCols title={'DIskon'} value={`${product?.diskon}%`} />
          <TextCols title={'Total Biaya'} value={`Rp${product?.total_harga}`} />
          <TextCols
            title={'Sumber'}
            value={product?.sumber_po?.toUpperCase()}
          />
        </View>
        {/* Content End --- */}
        <Spacer height={'6'} width={'full'} />
      </ScrollView>
      {isLoading && <LoadingFetch />}
    </SafeAreaView>
  );
}
