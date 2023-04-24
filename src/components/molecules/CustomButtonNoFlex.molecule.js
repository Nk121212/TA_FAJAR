import {View, TouchableOpacity, Text, ToastAndroid} from 'react-native';
const {default: Tailwind} = require('../../libs/tailwinds/Tailwind.lib');

const CustomButtonNoFlex = ({
  color,
  text,
  height,
  onPress = () => ToastAndroid.show('Fitur dalam pengembangan.', 2000),
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => onPress()}
      style={Tailwind`${color} items-center justify-center min-h-4 rounded-lg
      ${height ? `py-${height}` : 'py-4'}`}>
      <Text
        style={Tailwind`font-gothic--medium text-sm text-white text-center`}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButtonNoFlex;
