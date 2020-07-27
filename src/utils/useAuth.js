/* eslint-disable consistent-return */
import React, { useEffect } from 'react';
import firebase from 'gatsby-plugin-firebase';
import { navigate } from 'gatsby';

const useAuth = () => {
  const [user, setUser] = React.useState(null);
  const [auth, setAuth] = React.useState(undefined);
  const [firebaseExport, setFirebaseExport] = React.useState(undefined);

  useEffect(() => {
    setAuth(firebase.auth());
    setFirebaseExport(firebase);
  }, [firebase]);

  useEffect(() => {
    if (auth === undefined) return;

    const unlisten = firebase.auth().onAuthStateChanged((newUser) => {
      setUser(newUser);
    });

    return () => { unlisten(); };
  }, [auth]);

  const signOut = (navigatePath) => {
    if (auth) {
      auth.signOut();
      const path = !navigatePath || navigatePath?.length > 0 ? navigatePath : '/dashboard/login';
      navigate(path);
    }
  };

  return {
    user, auth, firebaseExport, signOut,
  };
};

export default useAuth;
