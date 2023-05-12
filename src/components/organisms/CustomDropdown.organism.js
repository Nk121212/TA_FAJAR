import SelectDropdown from 'react-native-select-dropdown';
import Tailwind from '../../libs/tailwinds/Tailwind.lib';
import {ChevronDownIcon, ChevronUpIcon} from 'react-native-heroicons/outline';

const CustomDropdown = ({
  data,
  defaultButtonText,
  defaultValue,
  show,
  onSelect,
  disabled = false,
}) => {
  return (
    <SelectDropdown
      data={data}
      disabled={disabled}
      defaultValue={defaultValue}
      defaultButtonText={defaultButtonText}
      buttonStyle={Tailwind`w-full  rounded-md border border-gray-300 ${
        disabled ? 'bg-primary--purple/10' : 'bg-white'
      }`}
      buttonTextStyle={Tailwind`font-gothic--semibold text-sm text-black text-left`}
      renderDropdownIcon={isOpened =>
        isOpened ? (
          <ChevronUpIcon style={Tailwind`text-primary--purple`} size={24} />
        ) : (
          <ChevronDownIcon style={Tailwind`text-primary--purple`} size={24} />
        )
      }
      onSelect={(selectedItem, index) => {
        // console.log(selectedItem, index);
        onSelect(selectedItem);
      }}
      buttonTextAfterSelection={(selectedItem, index) => {
        // text represented after item is selected
        // if data array is an array of objects then return selectedItem.property to render after item is selected
        return selectedItem[show];
      }}
      rowTextForSelection={(item, index) => {
        // text represented for each item in dropdown
        // if data array is an array of objects then return item.property to represent item in dropdown
        return item[show];
      }}
    />
  );
};

export default CustomDropdown;
