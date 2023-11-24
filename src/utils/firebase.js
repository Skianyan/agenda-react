import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyAOeJ2AGgzw1eouG0JxYO-Rm7fRw03SNb0",
	authDomain: "agenda-react-e739a.firebaseapp.com",
	projectId: "agenda-react-e739a",
	storageBucket: "agenda-react-e739a.appspot.com",
	messagingSenderId: "913602337089",
	appId: "1:913602337089:web:bfe140dd830c48682d29c0",
};
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
//export const FIREBASE_AUTH = getAuth(FIREBASE_APP);

export default firebase.initializeApp(firebaseConfig);
