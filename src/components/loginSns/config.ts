import { initializeApp } from 'firebase/app'
import {
  GoogleAuthProvider,
  signInWithPopup,
  getAuth,
  GithubAuthProvider,
  TwitterAuthProvider,
} from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyAKRlTF0Rfkqtw7SYMfMKAWtB-OrGeiivQ',
  authDomain: 'sns-cat.firebaseapp.com',
  projectId: 'sns-cat',
  storageBucket: 'sns-cat.appspot.com',
  messagingSenderId: '436133957533',
  appId: '1:436133957533:web:abaf3afa249eb21f346974',
  measurementId: 'G-Q0L5MVGXVW',
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const providerGoogle = new GoogleAuthProvider()
const providerGithup = new GithubAuthProvider()
const providerTwitter = new TwitterAuthProvider()

export {
  app,
  auth,
  providerGoogle,
  providerGithup,
  providerTwitter,
  signInWithPopup,
}
