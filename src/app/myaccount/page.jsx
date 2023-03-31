"use client"
import styles from '../page.module.css';
import styels from "../globals.css";
import { auth, db } from "../firebase";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {collection,deleteDoc,doc,onSnapshot,query,where} from "firebase/firestore";
import Link from "next/link";
export default function Dashboard() {

  const route = useRouter();
  const [posts, setPosts] = useState([]);

  const getData = async () => {
    const collectionRef = collection(db, "posts");
    const q = query(collectionRef, where("user", "==", auth.currentUser.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setPosts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
    return unsubscribe;
  };

  //Delete Post
  const deletePost = async (id) => {
    const docRef = doc(db, "posts", id);
    await deleteDoc(docRef);
  };

  const signout=async ()=>{
    auth.signOut();
    route.push("/");
  }
  //Get users data
  useEffect(() => {
    getData();
  },[]);

  return (
    <div>
      <h1 className="text-left text-2xl font-semibold text-gray-600 mx-8 my-10">Your posts</h1>
      <button onClick={()=>signout()} className="mx-8 my-10 text-white bg-pink-500 py-2 px-4 rounded hover:bg-pink-700 font-bold">
            Sign Out
      </button>
    <div>
    {
      posts.length>0?posts.map(item => {
                console.log("from home:"+item.name);
                return (
                    <div key={item.id} className=" self-center w-10/12 h-100 border-slate-300 shadow-lg rounded-lg p-4 border-b-2 mx-10">
                            <h1 className="text-mudiem text-gray-700 font-medium">{item.name}</h1>
                            <h5 className="text-small text-gray-600">{item.post}</h5>
                            <button type="button" onClick={()=>deletePost(item.id)} className="text-white bg-pink-500 py-2 px-4 rounded hover:bg-pink-700 font-bold">
                                Delete post
                            </button>
                    </div>
                )
              }):<h1>Loading...</h1>
    }
    </div>
    </div>
  );
}
