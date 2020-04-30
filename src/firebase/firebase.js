import firebase from 'firebase';

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyC4z_MRwutzkdMta4Ciugv60eqc3Q2Z5wA",
    authDomain: "movies-app-a4d8d.firebaseapp.com",
    databaseURL: "https://movies-app-a4d8d.firebaseio.com",
    projectId: "movies-app-a4d8d",
    storageBucket: "movies-app-a4d8d.appspot.com",
    messagingSenderId: "42304142416",
    appId: "1:42304142416:web:d08f1c05d9502a349d2555"
  };
  // Initialize Firebase
  var app = firebase.initializeApp(firebaseConfig);

  var db = firebase.firestore(app);

  export default db;