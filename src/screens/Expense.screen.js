import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  TouchableHighlight,
} from 'react-native';
import TopBar from '../components/organisms/TopBar.organism';
import BottomNavbar from '../components/organisms/BottomNavbar.organism';
import Tailwind from '../libs/tailwinds/Tailwind.lib';
import Spacer from '../components/atoms/Spacer.atom';
import {Fragment, useState} from 'react';
import {
  CalendarDaysIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  PlusIcon,
} from 'react-native-heroicons/outline';
import CustomButton from '../components/molecules/CustomButton.molecule';

export default function Expense({navigation}) {
  const [showFilter, setShowFilter] = useState(true);

  const handleNavToEdit = () => {
    return navigation.push('ExpenseEdit');
  };
  const handleNavToAdd = () => {
    return navigation.push('ExpenseAdd');
  };

  const handleDelete = () => {};

  return (
    <SafeAreaView style={Tailwind`w-full h-full`}>
      <TopBar title={'Pengeluaran'} subTitle={'Administrator'} />
      <View style={Tailwind`flex-1 px-6`}>
        <Spacer height={'18'} width={'full'} />

        {/* Content Start --- */}
        <View
          style={Tailwind`bg-primary--purple rounded-lg flex-row items-center justify-between p-3 mt-4 `}>
          <Text style={Tailwind`font-gothic--semibold text-sm text-white`}>
            Pengeluaran s/d hari ini
          </Text>
          <View style={Tailwind`bg-white py-2 px-3 rounded-md`}>
            <Text
              style={Tailwind`font-gothic--medium text-sm text-primary--purple`}>
              Rp 120.000
            </Text>
          </View>
        </View>

        <View style={Tailwind`bg-white rounded-md p-4 mt-4`}>
          <View style={Tailwind``}>
            <View style={Tailwind`flex-row items-center justify-between`}>
              <View style={Tailwind`flex-row items-center gap-2`}>
                <Text
                  style={Tailwind`font-gothic--regular text-primary--purple text-sm`}>
                  History
                </Text>
                <View
                  style={Tailwind`bg-primary--purple/10 px-2 py-1 ${
                    showFilter ? 'hidden' : ''
                  }`}>
                  <Text
                    style={Tailwind`font-gothic--regular text-primary--purple text-xs`}>
                    10 April 2023 - 20 April 2023
                  </Text>
                </View>
              </View>
              <TouchableHighlight
                style={Tailwind`rounded-md px-1`}
                underlayColor={'#605CA820'}
                onPress={() => setShowFilter(prev => !prev)}>
                {showFilter ? (
                  <ChevronUpIcon style={Tailwind`text-primary--purple`} />
                ) : (
                  <ChevronDownIcon style={Tailwind`text-primary--purple`} />
                )}
              </TouchableHighlight>
            </View>

            {showFilter ? (
              <Fragment>
                <View style={Tailwind`flex-row items-center gap-1 mt-2`}>
                  <TouchableOpacity
                    activeOpacity={0.5}
                    style={Tailwind`flex-1 flex-row items-center justify-between border border-gray-300 p-3 rounded-md`}>
                    <Fragment>
                      <Text
                        style={Tailwind`flex-1 font-gothic--semibold text-sm text-black`}>
                        2023-03-22
                      </Text>
                      <CalendarDaysIcon
                        style={Tailwind`text-primary--purple`}
                        size={24}
                      />
                    </Fragment>
                  </TouchableOpacity>
                  <Text
                    style={Tailwind`font-gothic--regular text-xs text-gray-900`}>
                    s/d
                  </Text>
                  <TouchableOpacity
                    activeOpacity={0.5}
                    style={Tailwind`flex-1 flex-row items-center justify-between border border-gray-300 p-3 rounded-md`}>
                    <Fragment>
                      <Text
                        style={Tailwind`flex-1 font-gothic--semibold text-sm text-black`}>
                        Akhir
                      </Text>
                      <CalendarDaysIcon
                        style={Tailwind`text-primary--purple`}
                        size={24}
                      />
                    </Fragment>
                  </TouchableOpacity>
                </View>
                <View style={Tailwind`flex-row items-center mt-3 gap-2`}>
                  <View style={Tailwind`flex-1`} />
                  <TouchableOpacity
                    onPress={() => handleNavToAdd()}
                    style={Tailwind`flex-row items-center justify-center gap-1 bg-white border-2 border-primary--purple rounded-md min-h-3 flex-1 py-1.5`}>
                    <Fragment>
                      <PlusIcon
                        style={Tailwind`text-primary--purple`}
                        size={18}
                      />
                      <Text
                        style={Tailwind`font-gothic--medium text-sm text-primary--purple`}>
                        Tambah
                      </Text>
                    </Fragment>
                  </TouchableOpacity>
                  <CustomButton
                    color={'bg-primary--purple'}
                    text={'Cari'}
                    height={'2'}
                    onPress={() => {}}
                  />
                </View>
              </Fragment>
            ) : null}
          </View>
        </View>

        <View style={Tailwind`flex-1 mt-4`}>
          <FlatList
            data={[...Array(5)].fill('*')}
            keyExtractor={(item, index) => index}
            nestedScrollEnabled
            ListFooterComponent={() => <Spacer height={'6'} width={'full'} />}
            ItemSeparatorComponent={() => (
              <Spacer height={'4'} width={'full'} />
            )}
            renderItem={({item, index}) => (
              <View style={Tailwind`p-3 bg-white rounded-md`}>
                <View style={Tailwind`bg-primary--purple/10 rounded-md py-2`}>
                  <Text
                    style={Tailwind`font-gothic--semibold text-sm text-primary--purple text-center`}>
                    10 April 2023
                  </Text>
                </View>
                <View
                  style={Tailwind`flex-col gap-2 mt-3 border-b border-gray-300 pb-3`}>
                  <Text
                    style={Tailwind`font-gothic--regular text-sm text-primary--purple`}>
                    Deskripsi
                  </Text>
                  <Text
                    style={Tailwind`font-gothic--regular text-sm text-gray-900`}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Quisque at erat arcu. Vivamus egestas tincidunt sodales.
                  </Text>
                </View>
                <View
                  style={Tailwind`flex-col gap-2 mt-3 border-b border-gray-300 pb-3`}>
                  <Text
                    style={Tailwind`font-gothic--regular text-sm text-primary--purple`}>
                    Nominal
                  </Text>
                  <Text
                    style={Tailwind`font-gothic--semibold text-lg text-gray-900`}>
                    Rp 120.000
                  </Text>
                </View>
                <View style={Tailwind`flex-row gap-2 mt-3`}>
                  <CustomButton
                    color={'bg-red-500'}
                    text={'Hapus'}
                    height={2}
                    onPress={() => {}}
                  />
                  <CustomButton
                    color={'bg-green-500'}
                    text={'Edit'}
                    height={2}
                    onPress={() => handleNavToEdit()}
                  />
                </View>
              </View>
            )}
          />
        </View>
        {/* Content End --- */}
      </View>
    </SafeAreaView>
  );
}
