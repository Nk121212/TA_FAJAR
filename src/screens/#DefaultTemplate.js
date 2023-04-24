import {SafeAreaView, View, Text} from 'react-native';
import TopBar from '../components/organisms/TopBar.organism';
import BottomNavbar from '../components/organisms/BottomNavbar.organism';

export default function DefaultTemplate() {
  return (
    <SafeAreaView>
      <TopBar />
      <ScrollView>
        <View>
          <Text>123</Text>
        </View>
      </ScrollView>
      <BottomNavbar />
    </SafeAreaView>
  );
}
