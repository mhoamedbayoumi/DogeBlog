'use client'
import Image from 'next/image';
import { Inter } from 'next/font/google';
import styles from './page.module.css';
import styels from "./globals.css";
import doge from "../../public/doge.2214a63a.svg";
import { useState } from 'react';
import { initializeApp, getApps } from "firebase/app";
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword, getAuth,signInWithEmailAndPassword,signInWithPopup,GoogleAuthProvider } from "firebase/auth";
import { async } from '@firebase/util';
import { getFirestore } from 'firebase/firestore';
import { app,auth,db } from './firebase';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()
  const googleprovider=new GoogleAuthProvider();
  const Googlelogin=async()=>{
    try{
      const res=await signInWithPopup(auth,googleprovider);
    }
    catch(error){
        console.log(error);
    }
  }
  const handelsubmit = async (event) => {
    event.preventDefault()
    const { result, error } = await createUserWithEmailAndPassword(auth , email, password);
    if (error) {
        return console.log(error)
    }
    // else successful
    console.log(result)
    return router.push("/home")
  }

  const handelLogin=async (event)=>{
   
    const { result, error } = await signInWithEmailAndPassword(auth , email, password);
    if (error) {
        return console.log(error)
    }
    // else successful
    console.log(result)
    return router.push("/home")
  }
  return (
    <main className='w-screen h-screen flex justify-center justify-items-center items-center'>
      <div className='w-60 h-100 border-slate-300 border-2 rounded p-4'>
      <Image src={doge} width={150} height={150} className="justify-self-center pl-12"></Image>
      <h1 className="text-center text-pink-400 font-bold text-xl">Doge Blog</h1>
      <form onSubmit={handelsubmit} className="flex justify-center flex-col gap-3">
      <input onChange={(e) => setEmail(e.target.value)} type="text" placeholder='Email' className='w-full border-b-2 py-2'/>
      <input onChange={(e) => setPassword(e.target.value)} type="text" placeholder='password' className='w-full border-b-2 py-2'/>
      <button type="submit" className='bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded'>Sign up</button>
      <button type="button" onClick={handelLogin} className='bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded'>Log in</button>
      <button type="button"className='text-white bg-pink-500 py-2 px-4 rounded hover:bg-pink-700 font-bold' onClick={Googlelogin}>sign in with Google</button>
      </form>
      </div>
    </main>
  )
}
