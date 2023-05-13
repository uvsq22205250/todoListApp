import React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateEmail,
} from "firebase/auth";
import { auth, database } from "./firebase.config";

const Context = createContext();

export const UserContext = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      sessionStorage.setItem("user-signin", JSON.stringify(currentUser));
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <Context.Provider
      value={{
        user,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const UserAuth = () => {
  return useContext(Context);
};
