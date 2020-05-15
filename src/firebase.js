import app from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'


const firebaseConfig = {
    apiKey: "AIzaSyCspP78JvbAenTkmuI32T2YFCR-bgVIS30",
    authDomain: "crud-react-ejm.firebaseapp.com",
    databaseURL: "https://crud-react-ejm.firebaseio.com",
    projectId: "crud-react-ejm",
    storageBucket: "crud-react-ejm.appspot.com",
    messagingSenderId: "456167308355",
    appId: "1:456167308355:web:fec4a60ffdbb80ecaae8f6"
  }
  
  // Initialize Firebase
  app.initializeApp(firebaseConfig)

  const db = app.firestore()
  const auth = app.auth()

  export {db, auth}