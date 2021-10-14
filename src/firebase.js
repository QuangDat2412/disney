import firebase from 'firebase';

const firebaseConfig = {
    apiKey: 'AIzaSyD18Mky0P1Icdgawi7h5WDWpRK9T4pESVY',
    authDomain: 'disney-clone-e2607.firebaseapp.com',
    projectId: 'disney-clone-e2607',
    storageBucket: 'disney-clone-e2607.appspot.com',
    messagingSenderId: '942458420536',
    appId: '1:942458420536:web:5e96094556b15be27b55cd',
    measurementId: 'G-7S185ZCGDZ',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { auth, provider, storage };
export default db;
