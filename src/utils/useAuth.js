/* eslint-disable consistent-return */
import React, { useEffect } from 'react';
import firebase from 'gatsby-plugin-firebase';

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
      console.log(newUser);
      setUser(newUser);
    });

    return () => { unlisten(); };
  }, [auth]);

  return [user, auth, firebaseExport];
};

export default useAuth;
