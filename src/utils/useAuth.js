import React, { useEffect } from 'react';
import * as firebase from 'firebase/app';
import 'firebase/auth';

const useAuth = () => {
  const fireUser = firebase.auth().currentUser;
  const [user, setUser] = React.useState(fireUser);

  useEffect(() => {
    const unlisten = firebase.auth().onAuthStateChanged((newUser) => {
      console.log(newUser);
      setUser(newUser);
    });

    return unlisten;
  }, []);

  return user;
};

export default useAuth;
