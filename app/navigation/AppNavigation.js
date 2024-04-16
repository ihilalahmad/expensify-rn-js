import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import AddTripScreen from '../screens/AddTripScreen';
import AddExpenseScreen from '../screens/AddExpenseScreen';
import TripExpensesScreen from '../screens/TripExpensesScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import SigninScreen from '../screens/SigninScreen';
import SignupScreen from '../screens/SignupScreen';
import { useAppDispatch, useAppSelector } from '../hooks/useReduxHook';
import { useUser } from '../redux/selectors/userSelector';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebaseConfig';
import { setUser } from '../redux/slices/userSlice';

const Stack = createNativeStackNavigator();

function StackNavigatorGroup() {
  const { user } = useAppSelector(useUser);
  const userDispatch = useAppDispatch();

  onAuthStateChanged(auth, (u) => {
    console.log('signed up user details: ', u);
    userDispatch(setUser(u));
  });

  if (user) {
    return (
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen
          options={{ headerShown: false }}
          name='Home'
          component={HomeScreen}
        />

        <Stack.Screen
          options={{ headerShown: false }}
          name='AddTrip'
          component={AddTripScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name='AddExpense'
          component={AddExpenseScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name='TripExpenses'
          component={TripExpensesScreen}
        />
      </Stack.Navigator>
    );
  } else {
    return (
      <Stack.Navigator initialRouteName='Welcome'>
        <Stack.Screen
          options={{ headerShown: false, presentation: 'modal' }}
          name='SignIn'
          component={SigninScreen}
        />
        <Stack.Screen
          options={{ headerShown: false, presentation: 'modal' }}
          name='SignUp'
          component={SignupScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name='Welcome'
          component={WelcomeScreen}
        />
      </Stack.Navigator>
    );
  }
}

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <StackNavigatorGroup />
    </NavigationContainer>
  );
}
