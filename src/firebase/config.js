import firebase from "firebase/app";
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyAloblphz7QxAaDiT-1QOHb-onsDANlRaM",
    authDomain: "mymoney-d361c.firebaseapp.com",
    projectId: "mymoney-d361c",
    storageBucket: "mymoney-d361c.appspot.com",
    messagingSenderId: "173785452024",
    appId: "1:173785452024:web:4a14af7dfcc53f5eb81a0d"
  };

  // init firebase
  firebase.initializeApp(firebaseConfig)

  // init service
  const projectFirestore = firebase.firestore()
  const projectAuth = firebase.auth()

  export { projectFirestore, projectAuth }