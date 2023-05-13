import React, {useEffect, useState} from 'react';
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
import {ReqWaitingOrdeList} from '../libs/fetchings/WaitListOrder.lib';
import {ReqOnProcessOrderList} from '../libs/fetchings/OnProcessOrder.lib';
import {ReqGetIncome} from '../libs/fetchings/Income.lib';

export default function Transaction({navigation}) {
  const user = useSelector(state => state.auth.user);
  const [firstDate] = useState(new Date());
  const [currentDate] = useState(new Date());
  const [income, setIncome] = useState(null);

  const [amount, setAmount] = useState({
    waiting_list: '',
    onprocess: '',
  });
  useEffect(() => {
    const initData = async () => {
      firstDate.setDate(1);
      const formatFirstDate = firstDate.toISOString().substring(0, 10);
      const formatCurrentDate = currentDate.toISOString().substring(0, 10);

      const respWaitingList = await ReqWaitingOrdeList();
      const respOnProcessList = await ReqOnProcessOrderList();
      const respIncome = await ReqGetIncome(formatFirstDate, currentDate);

      setIncome(respIncome?.data?.pendapatan);
      setAmount(prev => ({
        ...prev,
        waiting_list: respWaitingList?.total_data,
        onprocess: respOnProcessList?.total_data,
      }));
    };
    initData();
  }, []);
  return (
    <SafeAreaView style={Tailwind`min-w-full min-h-full`}>
      <TopBar
        showGoBack={false}
        title={'Transaksi'}
        subTitle={user.level === 1 ? 'Administrator' : 'Pegawai'}
      />
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
                Rp{income || 0}
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
            amount={amount.waiting_list}
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
            amount={amount.onprocess}
            onPress={() => navigation.push('OngoingOrder')}
          />
          <CardItem
            icon={
              <BanknotesIcon style={Tailwind`text-primary--purple`} size={32} />
            }
            title={'Penggajian'}
            subTitle={'Daftar Gaji'}
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
