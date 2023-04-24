import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import TopBar from '../components/organisms/TopBar.organism';
import Tailwind from '../libs/tailwinds/Tailwind.lib';
import Spacer from '../components/atoms/Spacer.atom';
import {
  CalendarDaysIcon,
  CalendarIcon,
  ChevronDownIcon,
} from 'react-native-heroicons/outline';
import {Fragment} from 'react';
import CustomButton from '../components/molecules/CustomButton.molecule';

export default function OngoingEdit() {
  return (
    <SafeAreaView style={Tailwind`w-full h-full`}>
      <TopBar title={'Edit PO'} subTitle={'Administrator'} />
      <View style={Tailwind`flex-1`}>
        <ScrollView>
          <Spacer height={'18'} width={'full'} />
          <View style={Tailwind`bg-white p-6 mt-4 flex-col gap-3`}>
            <View style={Tailwind`flex-col gap-2`}>
              <Text
                style={Tailwind`font-gothic--regular text-primary--purple text-sm`}>
                Kode PO
              </Text>
              <Text
                style={Tailwind`font-gothic--semibold text-black text-sm text-center bg-primary--purple/10 rounded-md py-3`}>
                PO123456789
              </Text>
            </View>
            <View style={Tailwind`flex-col gap-2`}>
              <Text
                style={Tailwind`font-gothic--regular text-primary--purple text-sm`}>
                Tanggal Mulai
              </Text>
              <TouchableOpacity
                activeOpacity={0.5}
                style={Tailwind`flex-row items-center justify-between border border-gray-300 p-3 rounded-md`}>
                <Fragment>
                  <Text
                    style={Tailwind`flex-1 font-gothic--semibold text-sm text-black`}>
                    2023-03-2023
                  </Text>
                  <CalendarDaysIcon
                    style={Tailwind`text-primary--purple`}
                    size={24}
                  />
                </Fragment>
              </TouchableOpacity>
            </View>
            <View style={Tailwind`flex-col gap-2`}>
              <Text
                style={Tailwind`font-gothic--regular text-primary--purple text-sm`}>
                Tanggal Selesai
              </Text>
              <TouchableOpacity
                activeOpacity={0.5}
                style={Tailwind`flex-row items-center justify-between border border-gray-300 p-3 rounded-md`}>
                <Fragment>
                  <Text
                    style={Tailwind`flex-1 font-gothic--semibold text-sm text-black`}>
                    2023-03-2023
                  </Text>
                  <CalendarDaysIcon
                    style={Tailwind`text-primary--purple`}
                    size={24}
                  />
                </Fragment>
              </TouchableOpacity>
            </View>
            <View style={Tailwind`flex-col gap-2`}>
              <Text
                style={Tailwind`font-gothic--regular text-primary--purple text-sm`}>
                Pegawai
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
            <View style={Tailwind`flex-col gap-2`}>
              <Text
                style={Tailwind`font-gothic--regular text-primary--purple text-sm`}>
                Status
              </Text>
              <TouchableOpacity
                activeOpacity={0.5}
                style={Tailwind`flex-row items-center justify-between border border-gray-300 p-3 rounded-md`}>
                <Fragment>
                  <Text
                    style={Tailwind`flex-1 font-gothic--semibold text-sm text-black`}>
                    Pengerjaan
                  </Text>
                  <ChevronDownIcon
                    style={Tailwind`text-primary--purple`}
                    size={24}
                  />
                </Fragment>
              </TouchableOpacity>
            </View>

            <View style={Tailwind`mt-8`}>
              <CustomButton
                color={'bg-primary--purple'}
                text={'Simpan'}
                // height={'2'}
                onPress={() => null}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
