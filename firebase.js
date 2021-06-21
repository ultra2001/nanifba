import firebase from "firebase";



const firebaseConfig = {
    apiKey: "AIzaSyDE6a_pwJfJsNTi4dbj8Pdp6dbh-p-671M",
    authDomain: "chat-app-4f1a5.firebaseapp.com",
    projectId: "chat-app-4f1a5",
    storageBucket: "chat-app-4f1a5.appspot.com",
    messagingSenderId: "123848376527",
    appId: "1:123848376527:web:b2e6bcbf18ebc5cb2537ba"
  };


  const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app()
 
  const db = app.firestore();
  const auth = app.auth();
  const provider = new firebase.auth.GoogleAuthProvider();
  
  export { db, auth, provider };
