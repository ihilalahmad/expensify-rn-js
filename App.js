import { SafeAreaView, Text, View } from 'react-native';
import AppNavigation from './app/navigation/AppNavigation';
import { Provider } from 'react-redux';
import { store } from './app/redux/store';

export default function App() {
  return (
    <Provider store={store}>
      <AppNavigation />
    </Provider>
  );
}
