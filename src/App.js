import "./CSS/App.css";
import { useState, useEffect } from "react";
import {BrowserRouter,Routes,Route,Link} from 'react-router-dom'
import Home from "./pages/Home";
import Login from "./pages/Login";
import CreatePost from "./pages/CreatePost";
import NotFound from "./pages/NotFound";
import 'bootstrap/dist/css/bootstrap.min.css'
import {Avatar} from '@mui/material'
import {auth} from './firebase-config'
import { onAuthStateChanged } from "firebase/auth";

function App() {
  var[user,setUser]=useState('');
  useEffect(()=>{
    const play=onAuthStateChanged(auth,(currentUser)=>{
      console.log(currentUser?.displayName);
      setUser(currentUser);
    })
    return ()=>{play()};
  })
  return (
    <div className="App">
      <BrowserRouter>
      <div className="alert alert-info ">
        <div className="navbar_div">
          {auth.currentUser!=null && 
            <div className="navbar_div_element">
              <div className="logo_name">
                <Avatar className="Avatar">{user && user.displayName[0]}</Avatar>
                <p>{user && user.displayName}</p>
              </div>  
            </div>
          }
          <div className="navbar_div_element">
            <Link to="/Home">
              <button type="button" className="btn btn-outline-secondary">
                Home
              </button>
            </Link>
          </div>
          <div className="navbar_div_element">
            <Link to="/CreatePost">
              <button type="button" className="btn btn-outline-secondary">
                CreatePost
              </button>
            </Link>
          </div>
          <div className="navbar_div_element">
          <Link to="/Login">
          <button type="button" className="btn btn-outline-warning">login</button>
          </Link>
          </div>
        </div>
      </div>
      
        
          <Routes>
              <Route path="/Home" element={<Home/>}></Route>
              <Route path="/Login" element={<Login/>}></Route>
              <Route path="/CreatePost" element={<CreatePost/>}></Route>
              <Route path="*" element={<NotFound/>}></Route>
          </Routes>
        </BrowserRouter>
        
    </div>
  );
}

export default App;