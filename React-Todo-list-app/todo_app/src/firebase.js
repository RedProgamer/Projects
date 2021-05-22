import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    apiKey: "AIzaSyCAB0_07H0LgmTNSMPYn7w0DueBCLIiozY",
    authDomain: "to-do-app-311cb.firebaseapp.com",
    databaseURL: "https://to-do-app-311cb-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "to-do-app-311cb",
    storageBucket: "to-do-app-311cb.appspot.com",
    messagingSenderId: "563293550334",
    appId: "1:563293550334:web:193b282e84984c78aa97af",
    measurementId: "G-47CVL49PRY"
});

const db = firebaseApp.firestore();

export default db ;