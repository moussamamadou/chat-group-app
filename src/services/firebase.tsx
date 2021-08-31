import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

firebase.initializeApp({
    apiKey: "AIzaSyBP-Fl3N-IQBs4MwgQEFNelJP8nFIHr6wc",
    authDomain: "chat-group-app-186f8.firebaseapp.com",
    projectId: "chat-group-app-186f8",
    storageBucket: "chat-group-app-186f8.appspot.com",
    messagingSenderId: "982077795367",
    appId: "1:982077795367:web:1bfcd973bc81215a74b202"
})
export const FieldValue = () => firebase.firestore.FieldValue
export const auth = firebase.auth()
export const firestore = firebase.firestore()