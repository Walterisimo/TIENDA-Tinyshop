// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
// import { getStorage } from 'firebase/storage'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAwYjWwj1K6wDQxvUVDtg-8X-UTE7KaS3Q",
  authDomain: "tinyshop-app.firebaseapp.com",
  projectId: "tinyshop-app",
  storageBucket: "tinyshop-app.appspot.com",
  messagingSenderId: "877226184126",
  appId: "1:877226184126:web:58709332fb80c136857def"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)
// const storage = getStorage(app)

export { app, db, auth }