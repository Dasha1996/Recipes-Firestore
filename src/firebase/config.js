import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAbmyAej5RIkhK2p9pyiiwet9wMhWDzbf0",
    authDomain: "cooking-recipe-site-3a434.firebaseapp.com",
    projectId: "cooking-recipe-site-3a434",
    storageBucket: "cooking-recipe-site-3a434.appspot.com",
    messagingSenderId: "396153660839",
    appId: "1:396153660839:web:5bbb4b5e50209c9ade4282"
  };


  //initialise firebase - connect to firestore backend 
  firebase.initializeApp(firebaseConfig);

  //init firestore service 
  const projectFirestore = firebase.firestore()
  export { projectFirestore }
