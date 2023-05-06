import React from 'react';
import {SafeAreaView, View, Text, ScrollView} from 'react-native';
import BottomNavbar from '../components/organisms/BottomNavbar.organism';
import Tailwind from '../libs/tailwinds/Tailwind.lib';
import TopBar from '../components/organisms/TopBar.organism';
import CardItem from '../components/organisms/CardItem.organism';
import Spacer from '../components/atoms/Spacer.atom';
import {
  BanknotesIcon,
  ChevronDoubleDownIcon,
  ClipboardDocumentListIcon,
  IdentificationIcon,
  InboxArrowDownIcon,
  InboxStackIcon,
  RectangleStackIcon,
  RocketLaunchIcon,
  Square3Stack3DIcon,
  TagIcon,
  UserGroupIcon,
} from 'react-native-heroicons/outline';
import {useSelector} from 'react-redux';

export default function Transaction({navigation}) {
  const user = useSelector(state => state.auth.user);
  return (
    <SafeAreaView style={Tailwind`min-w-full min-h-full`}>
      <TopBar showGoBack={false} title={'Transaksi'} subTitle="Administrator" />
      <View style={Tailwind`flex-1 px-6`}>
        <ScrollView>
          <Spacer height={'18'} width={'full'} />

          <View
            style={Tailwind`bg-primary--purple rounded-lg flex-row items-center justify-between p-3 mt-4 `}>
            <Text style={Tailwind`font-gothic--semibold text-sm text-white`}>
              Pendapatan Bersih
            </Text>
            <View style={Tailwind`bg-white py-2 px-3 rounded-md`}>
              <Text
                style={Tailwind`font-gothic--medium text-sm text-primary--purple`}>
                Rp.4.000.000
              </Text>
            </View>
          </View>
          <CardItem
            hide={user.level !== 1 ? true : false}
            icon={
              <Square3Stack3DIcon
                style={Tailwind`text-primary--purple`}
                size={32}
              />
            }
            title={'Pesanan Menunggu'}
            subTitle={'Total pesanan tunggu'}
            amount={'21'}
            onPress={() => navigation.push('WaitingOrder')}
          />
          <CardItem
            icon={
              <RocketLaunchIcon
                style={Tailwind`text-primary--purple`}
                size={32}
              />
            }
            title={'Pesanan Berjalan'}
            subTitle={'Total pesanan berjalan'}
            amount={'21'}
            onPress={() => navigation.push('OngoingOrder')}
          />
          <CardItem
            icon={
              <BanknotesIcon style={Tailwind`text-primary--purple`} size={32} />
            }
            title={'Penggajian'}
            subTitle={'Daftar Gaji'}
            amount={'100'}
            onPress={() => navigation.push('Payroll')}
          />
          <CardItem
            icon={
              <ClipboardDocumentListIcon
                style={Tailwind`text-primary--purple`}
                size={32}
              />
            }
            title={'Pengeluaran'}
            subTitle={'Daftar Pengeluaran'}
            amount={'50'}
            onPress={() => navigation.push('Expense')}
          />
          <CardItem
            icon={
              <RectangleStackIcon
                style={Tailwind`text-primary--purple`}
                size={32}
              />
            }
            title={'Cek Stok Bahan'}
            subTitle={'Pengecekan'}
            onPress={() => navigation.push('PortalCheck')}
          />
        </ScrollView>
      </View>
      <BottomNavbar />
    </SafeAreaView>
  );
}
