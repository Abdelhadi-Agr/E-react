import React from 'react'
import { useState, useEffect } from "react";
import { auth,db } from "../firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
function CreatePost() {
  var [title,setTitle]=useState('');
  var [post,setPost]=useState('');
  var [etat,setState]=useState('zero');
  const postsRef = collection(db, "posts");
  const change_state=(etat)=>{
    setState(etat)
    console.log(etat)
    setTimeout(()=>{setState('zero')},2000);
    console.log(etat);
  }
  const Submit=async ()=>{
    console.log(title,post,auth.currentUser.uid,Date.now());
    if(auth.currentUser!=null){
      try{
        await addDoc(postsRef, {user_id:auth.currentUser.uid,title: title, post:post,Date:Date.now()})
        change_state('success');
      }catch(e){
        alert(e.message);
        change_state('error')
      };
      setTitle('');
      setPost('');
    }
  }
  return (
    <div>
       {auth.currentUser!=null ? 
        <div>
            {etat=='success' && 
              <div className="alert alert-success" role="alert">
                the post uploaded successfully.
              </div>
            }
            {etat=='error' &&
              <div className="alert alert-danger" role="alert">
                error,please repeat again.. 
              </div>
            }
           <div className="mb-3">
              <label className="form-label">title</label>
              <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="title"
                onChange={e=>{setTitle(e.target.value)}} value={title}/>
            </div>
            <div className="mb-3">
              <label className="form-label">Post</label>
              <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" 
                placeholder="Write ur post here" 
                onChange={e=>{setPost(e.target.value)}} value={post}></textarea>
            </div>
            <div className="d-grid gap-2">
              <button className="btn btn-primary" type="button" onClick={Submit}>Submit</button>
            </div>
        </div>
       :<div><h1>u need to login in</h1></div>}
    </div>
  )
}

export default CreatePost