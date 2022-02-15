import firebase from "firebase/app";
require('firebase/auth')
require('firebase/firestore')
require ('firebase/storage')

const app = firebase.initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIn,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
})

export const firestore=app.firestore()
export const database = {
    folders: firestore.collection('folders'),
    files: firestore.collection('files'),
    formatDoc: doc => {
        return {id:doc.id,...doc.data()}
    },
    getCurrentTimeStamp:firebase.firestore.FieldValue.serverTimestamp
}
export const storage=app.storage()
export const auth = app.auth()
export default app;