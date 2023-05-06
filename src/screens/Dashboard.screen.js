import React, {useEffect, useState} from 'react';
import {SafeAreaView, View, Text, ScrollView} from 'react-native';
import BottomNavbar from '../components/organisms/BottomNavbar.organism';
import Tailwind from '../libs/tailwinds/Tailwind.lib';
import TopBar from '../components/organisms/TopBar.organism';
import {
  IdentificationIcon,
  InboxArrowDownIcon,
  InboxStackIcon,
  TagIcon,
  UserGroupIcon,
} from 'react-native-heroicons/outline';
import Spacer from '../components/atoms/Spacer.atom';
import CardItem from '../components/organisms/CardItem.organism';
import {useSelector} from 'react-redux';
import {ReqGetDashboard} from '../libs/fetchings/Dashboard.lib';
import LoadingFetch from '../components/organisms/LoadingFetch.organism';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Dashboard() {
  const user = useSelector(state => state.auth.user);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    const initData = async () => {
      setIsLoading(true);
      const response = await ReqGetDashboard();
      setData(response.data);
      setIsLoading(false);
    };
    initData();
  }, []);

  return (
    <SafeAreaView style={Tailwind`min-w-full min-h-full`}>
      <TopBar
        showGoBack={false}
        title={'Dashboard'}
        subTitle={user.level === 1 ? 'Administrator' : 'Pegawai'}
      />
      <View style={Tailwind`flex-1 px-6`}>
        <ScrollView>
          <Spacer height={'18'} width={'full'} />
          <CardItem
            icon={
              <InboxArrowDownIcon
                style={Tailwind`text-primary--purple`}
                size={32}
              />
            }
            title={'Pesanan Masuk'}
            subTitle={'Total pesanan masuk'}
            amount={data?.penjualan2}
          />
          <CardItem
            icon={
              <IdentificationIcon
                style={Tailwind`text-primary--purple`}
                size={32}
              />
            }
            title={'Member'}
            subTitle={'Total member'}
            amount={data?.member}
          />
          <CardItem
            icon={
              <InboxStackIcon
                style={Tailwind`text-primary--purple`}
                size={32}
              />
            }
            title={'Baham Baku'}
            subTitle={'Total bahan baku'}
            amount={data?.produk}
          />
          <CardItem
            icon={
              <UserGroupIcon style={Tailwind`text-primary--purple`} size={32} />
            }
            title={'Supplier'}
            subTitle={'Total supplier'}
            amount={data?.supplier}
          />
          <CardItem
            icon={<TagIcon style={Tailwind`text-primary--purple`} size={32} />}
            title={'Kategori'}
            subTitle={'Total kategori'}
            amount={data?.kategori}
          />
        </ScrollView>
      </View>
      <BottomNavbar />

      {isLoading && <LoadingFetch />}
    </SafeAreaView>
  );
}
