import React, {Fragment, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Tailwind from '../libs/tailwinds/Tailwind.lib';
import TopBar from '../components/organisms/TopBar.organism';
import BottomNavbar from '../components/organisms/BottomNavbar.organism';
import {ChevronDownIcon, ChevronUpIcon} from 'react-native-heroicons/outline';
import Spacer from '../components/atoms/Spacer.atom';
import CustomButton from '../components/molecules/CustomButton.molecule';
import TextCols from '../components/molecules/TextCols.organism';
import SelectDropdown from 'react-native-select-dropdown';

const countries = ['Egypt', 'Canada', 'Australia', 'Ireland'];

export default function Payroll() {
  const [isExist, setIsExist] = useState(false);
  return (
    <SafeAreaView style={Tailwind`w-full h-full`}>
      <TopBar title={'Penggajian'} subTitle={'Administrator'} />
      <View style={Tailwind`flex-1`}>
        <ScrollView>
          <Spacer height={'18'} width={'full'} />
          <View style={Tailwind`m-6 bg-white rounded-lg flex-1`}>
            <View style={Tailwind`p-4`}>
              <View style={Tailwind`flex-col gap-2`}>
                <Text
                  style={Tailwind`font-gothic--regular text-primary--purple text-sm`}>
                  Pegawai
                </Text>

                <SelectDropdown
                  data={countries}
                  defaultButtonText="Pilih Pegawai"
                  buttonStyle={Tailwind`w-full bg-white rounded-md border border-gray-300`}
                  buttonTextStyle={Tailwind`font-gothic--semibold text-sm text-black text-left`}
                  renderDropdownIcon={isOpened =>
                    isOpened ? (
                      <ChevronUpIcon
                        style={Tailwind`text-primary--purple`}
                        size={24}
                      />
                    ) : (
                      <ChevronDownIcon
                        style={Tailwind`text-primary--purple`}
                        size={24}
                      />
                    )
                  }
                  onSelect={(selectedItem, index) => {
                    console.log(selectedItem, index);
                  }}
                  buttonTextAfterSelection={(selectedItem, index) => {
                    // text represented after item is selected
                    // if data array is an array of objects then return selectedItem.property to render after item is selected
                    return selectedItem;
                  }}
                  rowTextForSelection={(item, index) => {
                    // text represented for each item in dropdown
                    // if data array is an array of objects then return item.property to represent item in dropdown
                    return item;
                  }}
                />
              </View>
            </View>

            <View style={Tailwind`flex-row items-center gap-2 px-4 pb-4`}>
              <View style={Tailwind`flex-1`}>
                <View style={Tailwind`flex-col gap-2`}>
                  <Text
                    style={Tailwind`font-gothic--regular text-primary--purple text-sm`}>
                    Periode
                  </Text>
                  <TouchableOpacity
                    activeOpacity={0.5}
                    style={Tailwind`flex-row items-center justify-between border border-gray-300 p-3 rounded-md`}>
                    <Fragment>
                      <Text
                        style={Tailwind`flex-1 font-gothic--semibold text-sm text-black`}>
                        Pegawai A
                      </Text>
                      <ChevronDownIcon
                        style={Tailwind`text-primary--purple`}
                        size={24}
                      />
                    </Fragment>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View style={Tailwind`p-4`}>
              <CustomButton
                text={'Cari'}
                color={'bg-primary--purple'}
                onPress={() => setIsExist(!isExist)}
                height={'3'}
              />
            </View>
          </View>

          <View
            style={Tailwind`bg-white mx-6 p-4 rounded-lg ${
              isExist ? '' : 'hidden'
            }`}>
            <View style={Tailwind`mt-2`}>
              <Text
                style={Tailwind`font-gothic--semibold bg-primary--purple/10 py-2 rounded-md text-sm text-primary--purple text-center `}>
                LAPORAN GAJIAN APRIL 2023
              </Text>
              <View>
                <TextCols title={'Nama'} value={''} />
                <TextCols title={'Email'} value={''} />
                <TextCols title={'No. Telepon'} value={''} />
                <TextCols title={'Alamat'} value={''} />
              </View>
            </View>

            <View style={Tailwind`mt-8`}>
              <Text
                style={Tailwind`font-gothic--semibold bg-primary--purple/10 py-2 text-sm text-primary--purple text-center `}>
                RINCIAN GAJI
              </Text>
              <View>
                <TextCols
                  title={'Jumlah Pesanan'}
                  value={'20'}
                  flexSecondCols={'1'}
                />
                <TextCols title={'Gaji Pokok'} value={'Rp. 2.000.000'} />
                <TextCols title={'Bonus'} value={'Rp 0'} />
                <TextCols title={'Total Gaji'} value={'Rp 2.000.000'} />
              </View>
            </View>
          </View>
          <Spacer height={'6'} width={'full'} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
