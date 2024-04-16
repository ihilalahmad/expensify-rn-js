// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore, collection } from 'firebase/firestore';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDZPof7BWLJwJPI10XIEbh9oJqk4tTS4QU',
  authDomain: 'timetrackerflutterapp-cb3cc.firebaseapp.com',
  databaseURL:
    'https://timetrackerflutterapp-cb3cc-default-rtdb.firebaseio.com',
  projectId: 'timetrackerflutterapp-cb3cc',
  storageBucket: 'timetrackerflutterapp-cb3cc.appspot.com',
  messagingSenderId: '115231596806',
  appId: '1:115231596806:web:3d321239512bd2e5f93e87',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// export const auth = getAuth(app);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

//references to our firestore collections
export const tripsRef = collection(db, 'trips');
export const expensesRef = collection(db, 'expenses');
export default app;
