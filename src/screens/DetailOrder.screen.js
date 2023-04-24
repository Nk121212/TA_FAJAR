import {SafeAreaView, View, Text, ScrollView} from 'react-native';
import TopBar from '../components/organisms/TopBar.organism';
import BottomNavbar from '../components/organisms/BottomNavbar.organism';
import Tailwind from '../libs/tailwinds/Tailwind.lib';
import Spacer from '../components/atoms/Spacer.atom';
import TextCols from '../components/molecules/TextCols.organism';

export default function DetailOrder() {
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
          <TextCols title={'Produk'} value={'KCG Box 12x12'} />
          <TextCols title={'Nama'} value={'Pegulat Cina Man'} />
          <TextCols title={'No. Telepon'} value={'08912345678'} />
          <TextCols
            title={'Alamat'}
            value={
              'Jl. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque at erat arcu. Vivamus egestas tincidunt sodales. In nec vehicula ligula. Quisque tincidunt metus non enim pulvinar'
            }
          />
        </View>

        <View style={Tailwind`bg-white mt-4 p-6 mt-4`}>
          <View
            style={Tailwind`bg-primary--purple justify-center items-center w-[50%] py-2 rounded-md mb-2`}>
            <Text style={Tailwind`font-gothic--semibold text-sm text-white`}>
              DATA TRANSAKSI
            </Text>
          </View>
          <TextCols title={'Tgl. Pesanan'} value={'10 April 2023'} />
          <TextCols title={'Harga'} value={'Rp. 210.000'} />
          <TextCols title={'DIskon'} value={'0%'} />
          <TextCols title={'Total Biaya'} value={'Rp. 210.000'} />
          <TextCols title={'Sumber'} value={'Shopee'} />
        </View>
        {/* Content End --- */}
        <Spacer height={'6'} width={'full'} />
      </ScrollView>
    </SafeAreaView>
  );
}
