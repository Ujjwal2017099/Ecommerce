import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyDoZ7F6kg7vfLmQ6Ot-CyOpFvB8EdxEZ6M",
    authDomain: "ecommerce-app-resoluteai.firebaseapp.com",
    projectId: "ecommerce-app-resoluteai",
    storageBucket: "ecommerce-app-resoluteai.appspot.com",
    messagingSenderId: "972050916403",
    appId: "1:972050916403:web:5ad067c361817eb591af46",
};

firebase.initializeApp(firebaseConfig);

const auth =firebase.auth();
const fs = firebase.firestore();
const storage = firebase.storage();

export {auth,fs,storage};