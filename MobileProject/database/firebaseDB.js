import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAQHLkc-yrBnXE6887kk7_o5W8bxXg-sVM",
    authDomain: "projectmobile-3a802.firebaseapp.com",
    projectId: "projectmobile-3a802",
    storageBucket: "projectmobile-3a802.appspot.com",
    messagingSenderId: "306003156096",
    appId: "1:306003156096:web:cae9985e8b920f81625a65",
    measurementId: "G-PXH6B1FRKN"
  };

firebase.initializeApp(firebaseConfig);

export default firebase;