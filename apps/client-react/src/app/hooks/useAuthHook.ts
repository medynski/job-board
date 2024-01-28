import { Nullable, User } from '@job-board/api-interfaces';
import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { useEffect, useState } from 'react';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
getAnalytics(app);
const auth = getAuth();
const provider = new GoogleAuthProvider();

export const useAuthHook = () => {
  const [user, setUser] = useState<Nullable<User>>(null);

  useEffect(() => {
    auth.onAuthStateChanged(
      (userData) => {
        if (userData) {
          console.log('User is signed in', { userData });
          if (userData.displayName && userData.email) {
            setUser({ email: userData.email, name: userData.displayName });
          } else {
            setUser(undefined);
          }
        } else {
          console.log('User is not signed in');
          setUser(undefined);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  const handleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        const user = result.user;
        console.info({ token, user });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.info({ errorCode, errorMessage, email, credential });
      });
  };

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        setUser(undefined);
      })
      .catch((error) => console.info(error));
  };

  return { user, handleSignIn, handleSignOut };
};
