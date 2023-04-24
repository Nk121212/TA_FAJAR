import {Text, View} from 'react-native';
import Tailwind from '../../libs/tailwinds/Tailwind.lib';

const TextCols = ({title, value, flexFirstCols, flexSecondCols}) => {
  return (
    <View
      style={Tailwind`flex-row items-start justify-between gap-2 mt-2 py-2 border-b border-gray-200`}>
      <Text
        style={Tailwind`font-gothic--regular text-sm text-gray-500 ${
          flexFirstCols ? `flex-${flexFirstCols}` : 'flex-1'
        }`}>
        {title}
      </Text>
      <Text
        style={Tailwind`font-gothic--medium text-sm text-gray-900 text-right 
        ${flexSecondCols ? `flex-${flexSecondCols}` : 'flex-2'}`}>
        {value}
      </Text>
    </View>
  );
};

export default TextCols;
