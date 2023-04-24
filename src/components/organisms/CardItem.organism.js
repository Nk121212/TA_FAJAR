import {Text, TouchableOpacity, View} from 'react-native';
import Tailwind from '../../libs/tailwinds/Tailwind.lib';

const CardItem = ({icon, title, subTitle, amount, onPress}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      disabled={onPress ? false : true}
      onPress={onPress ? () => onPress() : () => null}
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
      <View style={Tailwind`${amount ? '' : 'hidden'}`}>
        <View
          style={Tailwind`items-center justify-center bg-primary--purple rounded-md h-9 px-2`}>
          <Text style={Tailwind`font-gothic--medium text-base text-white`}>
            {amount}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CardItem;
