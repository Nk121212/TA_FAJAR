import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import TopBar from '../components/organisms/TopBar.organism';
import Tailwind from '../libs/tailwinds/Tailwind.lib';
import Spacer from '../components/atoms/Spacer.atom';
import {
  CalendarDaysIcon,
  CalendarIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from 'react-native-heroicons/outline';
import {Fragment, useState} from 'react';
import CustomButton from '../components/molecules/CustomButton.molecule';
import moment from 'moment';
import DatePicker from 'react-native-date-picker';
import {useSelector} from 'react-redux';
import {STATUS_ORDER} from '../helper/constant.helper';
import SelectDropdown from 'react-native-select-dropdown';
import CustomDropdown from '../components/organisms/CustomDropdown.organism';
import {ReqUpdateOrder} from '../libs/fetchings/OnProcessOrder.lib';
import LoadingFetch from '../components/organisms/LoadingFetch.organism';

export default function OngoingEdit({route, navigation}) {
  const rItem = route?.params?.item;
  const user = useSelector(state => state.auth.user);
  const sDate = rItem?.mulai ? new Date(rItem?.mulai) : new Date();
  const fDate = rItem?.selesai ? new Date(rItem?.selesai) : new Date();

  const [startDate, setStartDate] = useState(sDate);
  const [finishDate, setFinishDate] = useState(fDate);

  const [openStart, setOpenStart] = useState(false);
  const [openFinish, setOpenFinish] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [employee, setEmployee] = useState(() => {
    if (user.level === 2) {
      return {
        id: user.id,
        name: user.name,
      };
    } else {
      return null;
    }
  });

  const handleSubmit = async () => {
    setIsLoading(true);
    const id_status = status ? status?.status_id : rItem.status_penjualan;
    const response = await ReqUpdateOrder(
      rItem.id,
      id_status,
      employee.id,
      startDate.toISOString().toString().substring(0, 10),
      finishDate.toISOString().toString().substring(0, 10),
    );

    if (response && response?.result) {
      navigation.goBack();
      ToastAndroid.show('Perubahan berhasil disimpan', 2000);
    }
    setIsLoading(false);
  };
  return (
    <SafeAreaView style={Tailwind`w-full h-full`}>
      <TopBar
        title={'Edit PO'}
        subTitle={user.level === 1 ? 'Administrator' : 'Pegawai'}
      />
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
                {rItem?.kode_po}
              </Text>
            </View>
            <View style={Tailwind`flex-col gap-2`}>
              <Text
                style={Tailwind`font-gothic--regular text-primary--purple text-sm`}>
                Tanggal Mulai
              </Text>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => setOpenStart(true)}
                style={Tailwind`flex-row items-center justify-between border border-gray-300 p-3 rounded-md`}>
                <Fragment>
                  <Text
                    style={Tailwind`flex-1 font-gothic--semibold text-sm text-black`}>
                    {moment(startDate).format('LL')}
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
                onPress={() => setOpenFinish(true)}
                style={Tailwind`flex-row items-center justify-between border border-gray-300 p-3 rounded-md`}>
                <Fragment>
                  <Text
                    style={Tailwind`flex-1 font-gothic--semibold text-sm text-black`}>
                    {moment(finishDate).format('LL')}
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
              <CustomDropdown
                data={[employee]}
                show={'name'}
                disabled={user.level === 2}
                defaultButtonText="Pilih Pegawai"
                defaultValue={user.level === 2 ? employee : null}
                onSelect={v => console.log(v)}
              />
            </View>
            <View style={Tailwind`flex-col gap-2`}>
              <Text
                style={Tailwind`font-gothic--regular text-primary--purple text-sm`}>
                Status
              </Text>

              <CustomDropdown
                data={STATUS_ORDER}
                show={'name'}
                defaultButtonText="Pilih Status Pesanan"
                defaultValue={
                  STATUS_ORDER.filter(v => v.name == rItem.status)[0]
                }
                onSelect={v => setStatus(v)}
              />
            </View>

            <View style={Tailwind`mt-8`}>
              <CustomButton
                color={'bg-primary--purple'}
                text={'Simpan'}
                // height={'2'}
                onPress={() => handleSubmit()}
              />
            </View>
          </View>
        </ScrollView>
      </View>

      <DatePicker
        modal
        mode="date"
        open={openStart}
        date={startDate}
        onConfirm={date => {
          setOpenStart(false);
          setStartDate(date);
        }}
        onCancel={() => {
          setOpenStart(false);
        }}
      />

      <DatePicker
        modal
        mode="date"
        open={openFinish}
        date={finishDate}
        onConfirm={date => {
          setOpenFinish(false);
          setFinishDate(date);
        }}
        onCancel={() => {
          setOpenFinish(false);
        }}
      />

      {isLoading && <LoadingFetch />}
    </SafeAreaView>
  );
}
