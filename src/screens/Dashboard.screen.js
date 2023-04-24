import React from 'react';
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

export default function Dashboard() {
  const _renderList = (icon, title, subTitle, amount) => (
    <View
      style={Tailwind`bg-white p-3 rounded-lg flex-row items-center mt-4 mb-1 gap-3 shadow`}>
      <View
        style={Tailwind`bg-gray-100 rounded-lg w-16 h-16 items-center justify-center`}>
        {icon}
      </View>
      <View style={Tailwind`flex-1`}>
        <Text style={Tailwind`font-gothic--semibold text-base text-gray-900`}>
          {title}
        </Text>
        <Text style={Tailwind`font-gothic--regular text-sm text-gray-500`}>
          {subTitle}
        </Text>
      </View>
      <View>
        <View
          style={Tailwind`items-center justify-center bg-primary--purple rounded-md h-9 px-2`}>
          <Text style={Tailwind`font-gothic--medium text-base text-white`}>
            {amount}
          </Text>
        </View>
      </View>
    </View>
  );
  return (
    <SafeAreaView style={Tailwind`min-w-full min-h-full`}>
      <TopBar showGoBack={false} title={'Dashboard'} subTitle="Administrator" />
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
            amount={'21'}
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
            amount={'21'}
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
            amount={'100'}
          />
          <CardItem
            icon={
              <UserGroupIcon style={Tailwind`text-primary--purple`} size={32} />
            }
            title={'Supplier'}
            subTitle={'Total supplier'}
            amount={'50'}
          />
          <CardItem
            icon={<TagIcon style={Tailwind`text-primary--purple`} size={32} />}
            title={'Kategori'}
            subTitle={'Total kategori'}
            amount={'3'}
          />
        </ScrollView>
      </View>
      <BottomNavbar />
    </SafeAreaView>
  );
}
