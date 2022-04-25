import { initializeApp } from 'firebase/app';
import firebaseConfig from './firebase.config';
const FirebaseInitialize = () => {
    initializeApp(firebaseConfig);
};
export default FirebaseInitialize;