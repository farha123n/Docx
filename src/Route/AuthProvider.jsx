import React, { createContext, useEffect, useState } from 'react';
import { auth } from '../firebase.init';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
export const AuthContext = createContext()
const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(false)
    const [announcementCount,setAnnouncementCount]=useState(0)
    const [com,setCom]=useState([])
    const [acom,setaCom]=useState([])
    const provider = new GoogleAuthProvider();
      useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
          setUser(currentUser);
          setLoading(false);
      });
      return () => unsubscribe();
  }, []);
    const googleSignIn = () => {
        setLoading(true)
        return signInWithPopup(auth, provider)
    }
    const updateUser=(profileInfo)=>{
        return updateProfile(auth.currentUser, profileInfo);
    }
    const signUp = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
      const signIn = (email, password) => {
        setLoading(true)
     return   signInWithEmailAndPassword(auth, email, password)
    }
    const logOut=()=>{
        return signOut(auth)
    }
    const authInfo = {
        googleSignIn, signUp,signIn,user,setUser,loading,setLoading,updateUser,logOut,announcementCount,setAnnouncementCount,com,setCom,acom,setaCom
    }
  
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;