import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { firebaseConfig } from '../env/firebaseConfig';

firebase.initializeApp(firebaseConfig);

export const firestore: firebase.firestore.Firestore = firebase.firestore();
export const auth: firebase.auth.Auth = firebase.auth();
export const provider: firebase.auth.GoogleAuthProvider = new firebase.auth.GoogleAuthProvider();
