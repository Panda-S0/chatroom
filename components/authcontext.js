import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,signOut
} from "firebase/auth"
import { auth, db } from "../firebaseConfig"
import { doc, getDoc, setDoc } from "firebase/firestore"

export const signUp = async (email, password, username, profileUrl) => {
  try {
    const response = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    )
    // console.log("authcontext.js respons: ", response?.user)
    await setDoc(doc(db, "users", response?.user?.uid), {
      username,
      profileUrl,
      userId: response?.user.uid,
    })
    return { success: true, data: response?.user }
  } catch (e) {
    let msg = e.message
    if(msg.includes('(auth/invalid-email)')) msg="Invalid email"
    if(msg.includes('(auth/weak-password)')) msg="Invalid password, Password should be at least 6 characters"
    if(msg.includes('(auth/email-already-in-use)')) msg="This email already signed"
    return { success: false, msg}
  }
}

export const signIn = async (email, password)=>{
    try{
        const response = await signInWithEmailAndPassword(auth, email,password)
        return {success:true}
    }
    catch(e){
    let msg = e.message
    if(msg.includes('(auth/invalid-email)')) msg="Invalid email"
    if(msg.includes('(auth/invalid-credential)')) msg="Invalid credential"
    return { success: false, msg}
    }
}

export const sighOut = async ()=>{
    try{
        await signOut(auth)
        return {success:true}
    }
    catch(e){
        return {success:false, msg:e.message, error:e}
    }
     
}

