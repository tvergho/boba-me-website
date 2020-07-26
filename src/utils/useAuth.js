/* eslint-disable consistent-return */
import React, { useEffect } from 'react';
import firebase from 'gatsby-plugin-firebase';

const useAuth = () => {
  const [user, setUser] = React.useState(null);
  const [auth, setAuth] = React.useState(undefined);

  useEffect(() => {
    setAuth(firebase.auth());
  }, [firebase]);

  useEffect(() => {
    if (auth === undefined) return;

    const unlisten = firebase.auth().onAuthStateChanged((newUser) => {
      setUser(newUser);
    });

    return () => { unlisten(); };
  }, [auth]);

  return [user, auth];
};

export default useAuth;
