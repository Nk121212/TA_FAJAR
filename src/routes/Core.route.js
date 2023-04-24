import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Splash from '../screens/Splash.screen';
import Login from '../screens/Login.screen';
import Dashboard from '../screens/Dashboard.screen';
import Transaction from '../screens/Transaction.screen';
import Profile from '../screens/Profile.screen';
import WaitingOrder from '../screens/WaitingOrder.screen';
import OngoingOrder from '../screens/OngoingOrder.screen';
import OngoingEdit from '../screens/OngoingEdit.screen';
import DetailOrder from '../screens/DetailOrder.screen';
import Payroll from '../screens/Payroll.screen';
import Expense from '../screens/Expense.screen';
import ExpenseEdit from '../screens/ExpenseEdit.screen';
import ExpenseAdd from '../screens/ExpenseAdd.screen';
import PortalCheck from '../screens/PortalCheck.screen';

const Stack = createNativeStackNavigator();

export default function CoreRoutes() {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{headerShown: false, animation: 'none'}}>
      <>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
      </>
      <>
        <Stack.Screen name="Transaction" component={Transaction} />
        <Stack.Screen name="WaitingOrder" component={WaitingOrder} />
        <Stack.Screen name="OngoingOrder" component={OngoingOrder} />
        <>
          <Stack.Screen name="OngoingEdit" component={OngoingEdit} />
          <Stack.Screen name="DetailOrder" component={DetailOrder} />
        </>
        <Stack.Screen name="Payroll" component={Payroll} />
        <Stack.Screen name="Expense" component={Expense} />
        <>
          <Stack.Screen name="ExpenseEdit" component={ExpenseEdit} />
          <Stack.Screen name="ExpenseAdd" component={ExpenseAdd} />
        </>
        <Stack.Screen name="PortalCheck" component={PortalCheck} />
      </>
      <>
        <Stack.Screen name="Profile" component={Profile} />
      </>
    </Stack.Navigator>
  );
}
