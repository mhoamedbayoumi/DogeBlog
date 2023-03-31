"use client"
import { auth,db } from "../firebase";
import firebase from "firebase/app";
import Router, { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { addDoc, collection } from "firebase/firestore";

function Home() {
    const [post, setPost] = useState("");
    //const [user, loading] = useAuthState(auth);
    const route = useRouter();
    const routeData = route.query;
    const handelsubmit=async()=>{
        const data = {
            name: auth.currentUser.displayName?.toString()?auth.currentUser.displayName.toString():auth.currentUser.email.toString(),
            post: post,
            user:auth.currentUser.uid,
          }
          const { result, error } = await addDoc(collection(db,"posts"),{
            name:data.name,
            post:data.post,
            user:data.user,
          })
        route.push("/home");
          if (error) {
            return console.log(error)
          }
    }
    return (  
    <div className="my-20 p-12 shadow-lg rounded-lg max-w-md mx-auto">
    <form >
      <h1 className="text-2xl font-bold">
      </h1>
      <div className="py-2">
        <h3 className="text-2xl font-medium py-2">Post</h3>
        <textarea onChange={(e)=>{setPost(e.target.value)}} className="bg-gray-800 h-48 w-full text-white rounded-lg p-2 text-sm"></textarea>
        <p className={`text-cyan-600 font-medium text-sm `}></p>
      </div>
      <button type="button" onClick={handelsubmit} className="w-full bg-cyan-600 text-white font-medium p-2 my-2 rounded-lg text-sm">Submit</button>
    </form>
  </div> );
}

export default Home;