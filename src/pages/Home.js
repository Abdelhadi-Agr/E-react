import React from 'react'
import { useState, useEffect } from "react";
import { auth,db } from "../firebase-config";
import '../CSS/Home.css'
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  orderBy,
  query,
} from "firebase/firestore";
import { queries } from '@testing-library/react';
function Home() {
  const [posts, setPosts] = useState([]);
  const delete_post = async (id) => {
   try{
    const postDoc = doc(db, "posts", id);
    await deleteDoc(postDoc);
   }catch(e){
    alert(e.message)
   }
  };
  const postsRef = collection(db, "posts");
  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(query(postsRef,orderBy('Date','desc')))
      setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getPosts();
  }, [posts]);
  return (
    <div className='Home'>
      <h1>Home</h1>
      {auth.currentUser!=null && 
      <div>
        {posts.map((p,index)=>
        <div key={index} className="card" >
          <img src="https://m.media-amazon.com/images/M/MV5BNzZiYzQwMTQtNTc0MS00ODEwLWI2NzUtZDVhOTBlMDA1YmY2XkEyXkFqcGdeQXRyYW5zY29kZS13b3JrZmxvdw@@._V1_.jpg" 
          className="card_img" alt="post"/>
          <div className="card-body">
            <h5 className="card-title">{p.title}</h5>
            <p className="card-text">{p.post}</p>
            {p.user_id==auth.currentUser.uid && 
               <button className="btn btn-primary" type="button" onClick={()=>{
                delete_post(p.id);
               }}>delete</button>
            }
          </div>
        </div>
      )}
      </div>
      }
    </div>
  )
}
export default Home