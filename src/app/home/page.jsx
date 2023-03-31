"use client"
import { auth,app,db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc,collection,getDocs } from "firebase/firestore";
import { async } from "@firebase/util";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from '../page.module.css';
import styels from "../globals.css";
function Home() {
    const router=useRouter();
    const [reslut,setreslut]=useState([]);
    async function getTodos() {
        try {
            //let docRef = doc(db,"posts","1");
            let docresult = await getDocs(collection(db,"posts"));
            docresult.forEach(item=>{
                console.log(item.data().name)
                setreslut(current=>[...current,{name:item.data().name,post:item.data().post}])
            })
            console.log(docresult);
            console.log(reslut)
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(()=>{
        onAuthStateChanged(auth,(user)=>{
            if(user){
                getTodos();
                router.refresh();
            }
            else{
                console.log("not auth");
                //alert("not Autnticated please login or create new accuent");
            }
        })
        
    },[]);
    return ( 
    <div className="w-full h-screen flex justify-center justify-items-center items-center flex-col gap-3">
        <div className="w-full">
        <h1 className="text-left text-2xl font-semibold text-gray-600 mx-8">See what other people are saying</h1>
        </div>
        {
             reslut.length>0?reslut.map(item => {
                console.log("from home:"+item.name);
                return (
                    <div className="w-10/12 h-100 border-slate-300 shadow-lg rounded-lg p-4 border-b-2">
                            <h1 className="text-mudiem text-gray-700 font-medium">{item.name}</h1>
                            <h5 className="text-small text-gray-600">{item.post}</h5>
                    </div>
                )
              }):<h1>Loading...</h1>
        }
    </div> );
}

export default Home;