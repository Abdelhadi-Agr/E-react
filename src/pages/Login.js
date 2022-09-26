import React from 'react'
import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth, provider } from "../firebase-config";
function Login() {
  var [user,setUser]=useState({});
  const signInWithGoogle = () => {
    signInWithPopup(auth,provider)
      .then((result) => {
        setUser(result.user);
        window.location.href = "/Home";
      })
      .catch((error) => {
        console.log(error);
      })
    }
    useEffect(()=>{
      const play=onAuthStateChanged(auth,(currentUser)=>{
        console.log(currentUser);
        setUser(currentUser);
      })
      return ()=>{play()};
    })
    const logout=async ()=>{
      await signOut(auth);
    }
  return (
    <div>
      <button onClick={signInWithGoogle}>
        Sign in with Google
      </button>
      <h1>{user?.displayName}</h1>
      <h1>{user?.email}</h1>
      <img src={user?.photoUrl} />
      <button onClick={logout}>sign out</button>
    </div>
  )
}

export default Login