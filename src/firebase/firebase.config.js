// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration

const firebaseConfig = {
    apiKey: 'AIzaSyADo4GgESmGkmV6Q9Yi2CQIqXLGHH5RsD4',
    authDomain: 'hootspy-web.firebaseapp.com',
    projectId: 'hootspy-web',
    storageBucket: 'hootspy-web.appspot.com',
    messagingSenderId: '636055561179',
    appId: '1:636055561179:web:d07e8b9d96233f8c1b7dfe'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
