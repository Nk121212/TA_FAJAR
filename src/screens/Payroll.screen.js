import React, {Fragment, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import Tailwind from '../libs/tailwinds/Tailwind.lib';
import TopBar from '../components/organisms/TopBar.organism';
import BottomNavbar from '../components/organisms/BottomNavbar.organism';
import {
  CalendarDaysIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from 'react-native-heroicons/outline';
import Spacer from '../components/atoms/Spacer.atom';
import CustomButton from '../components/molecules/CustomButton.molecule';
import TextCols from '../components/molecules/TextCols.organism';
import SelectDropdown from 'react-native-select-dropdown';
import CustomDropdown from '../components/organisms/CustomDropdown.organism';
import {useSelector} from 'react-redux';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import CustomButtonNoFlex from '../components/molecules/CustomButtonNoFlex.molecule';
import {ReqGetPayrollList} from '../libs/fetchings/Payroll.lib';
import LoadingFetch from '../components/organisms/LoadingFetch.organism';
import {ToRupiah} from '../helper/NumberFormat.lib';

const countries = ['Egypt', 'Canada', 'Australia', 'Ireland'];

export default function Payroll() {
  const user = useSelector(state => state.auth.user);
  const [isLoading, setIsLoading] = useState(false);
  const [isSettedDate, setIsSettedDate] = useState(false);
  const [isExist, setIsExist] = useState(false);
  const [listData, setListData] = useState(null);
  const [listEmployee, setListEmployee] = useState([
    {
      id: 2,
      nama: 'asep update',
    },
    {
      id: 3,
      nama: 'Deviana Amartha',
    },
    {
      id: 4,
      nama: 'Ikbal Daud',
    },
  ]);

  const [selectedEmployee, setSelectedEmployee] = useState({
    id: user.id,
    nama: user.name,
  });

  const [startDate, setStartDate] = useState(() => {
    let date = new Date();
    date.setDate(1);
    return date;
  });

  const [endDate, setEndDate] = useState(new Date());
  const [openStartDate, setOpenStartDate] = useState(false);
  const [openEndDate, setOpenEndDate] = useState(false);

  const handleSearch = async () => {
    const assigne = selectedEmployee?.id;
    const tanggal_awal = isSettedDate
      ? startDate.toISOString().substring(0, 10)
      : null;
    const tanggal_akhir = isSettedDate
      ? endDate.toISOString().substring(0, 10)
      : null;

    setIsExist(false);
    setIsLoading(true);
    const response = await ReqGetPayrollList(
      assigne,
      tanggal_awal,
      tanggal_akhir,
    );

    if (response?.result) {
      setIsExist(true);
      setListData(response?.data);
    } else {
      ToastAndroid.show('Gagal mendapatkan data..', 2000);
    }
    setIsLoading(false);
  };

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

                <CustomDropdown
                  data={listEmployee}
                  show={'nama'}
                  disabled={user.level === 2}
                  defaultButtonText="Pilih Pegawai"
                  defaultValue={user.level === 2 ? selectedEmployee : null}
                  onSelect={v => setSelectedEmployee(v)}
                />
              </View>
            </View>

            <View style={Tailwind`flex-row items-center gap-2 px-4 pb-4`}>
              <View style={Tailwind`flex-1`}>
                <View style={Tailwind`flex-col gap-2`}>
                  <View style={Tailwind`flex-row items-center justify-between`}>
                    <Text
                      style={Tailwind`font-gothic--regular text-primary--purple text-sm`}>
                      Periode
                    </Text>
                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={() => setIsSettedDate(false)}
                      style={Tailwind`bg-primary--purple/20 px-2 py-0.5 rounded`}>
                      <Text
                        style={Tailwind`font-gothic--regular text-primary--purple text-xs`}>
                        Reset
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={Tailwind`flex-row items-center gap-1 mt-2`}>
                    <TouchableOpacity
                      activeOpacity={0.5}
                      onPress={() => setOpenStartDate(true)}
                      style={Tailwind`flex-1 flex-row items-center justify-between border border-gray-300 p-3 rounded-md`}>
                      <Fragment>
                        <Text
                          style={Tailwind`flex-1 font-gothic--semibold text-sm text-black`}>
                          {isSettedDate
                            ? moment(startDate)?.format('ll')
                            : 'Tgl. Awal'}
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
                      onPress={() => setOpenEndDate(true)}
                      style={Tailwind`flex-1 flex-row items-center justify-between border border-gray-300 p-3 rounded-md`}>
                      <Fragment>
                        <Text
                          style={Tailwind`flex-1 font-gothic--semibold text-sm text-black`}>
                          {isSettedDate
                            ? moment(endDate)?.format('ll')
                            : 'Tgl. Akhir'}
                        </Text>
                        <CalendarDaysIcon
                          style={Tailwind`text-primary--purple`}
                          size={24}
                        />
                      </Fragment>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>

            <View style={Tailwind`p-4`}>
              <CustomButtonNoFlex
                text={'Cari'}
                color={'bg-primary--purple'}
                onPress={() => handleSearch()}
                height={'3'}
              />
            </View>
          </View>

          {listData?.map(item => (
            <View
              key={item?.kode}
              style={Tailwind`bg-white mx-6 mt-4 p-4 rounded-lg ${
                isExist ? '' : 'hidden'
              }`}>
              <View style={Tailwind`mt-2`}>
                <Text
                  style={Tailwind`font-gothic--semibold bg-primary--purple/10 py-2 text-sm text-primary--purple text-center `}>
                  LAPROAN GAJI BULAN{' '}
                  {moment(item?.selesai).format('MMMM YYYY').toUpperCase()}
                </Text>
                <View>
                  <TextCols title={'Nama'} value={item?.pegawai} />
                  <TextCols
                    title={'Tanggal Selesai'}
                    value={moment(item?.selesai)?.format('LLL')}
                  />
                  <TextCols
                    title={'Gaji Pokok'}
                    value={`Rp${ToRupiah(item?.harga)}`}
                  />
                  <TextCols
                    title={'Bonus'}
                    value={`Rp${ToRupiah(item?.bonus)}`}
                  />
                  <TextCols
                    title={'Total Gaji'}
                    value={`Rp${ToRupiah(item?.total)}`}
                  />
                </View>
              </View>
            </View>
          ))}

          <Spacer height={'6'} width={'full'} />
        </ScrollView>
      </View>

      {isLoading && <LoadingFetch />}

      <DatePicker
        modal
        mode="date"
        open={openStartDate}
        date={startDate}
        onConfirm={date => {
          setOpenStartDate(false);
          setStartDate(date);
          setIsSettedDate(true);
        }}
        onCancel={() => {
          setOpenStartDate(false);
        }}
      />

      <DatePicker
        modal
        mode="date"
        open={openEndDate}
        date={endDate}
        onConfirm={date => {
          setOpenEndDate(false);
          setEndDate(date);
          setIsSettedDate(true);
        }}
        onCancel={() => {
          setOpenEndDate(false);
        }}
      />
    </SafeAreaView>
  );
}
