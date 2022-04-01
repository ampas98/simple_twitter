import React,  {useState, useEffect} from 'react';
import './User.css'
import {postRequest} from '../../requests'

/**
 * Component for displaying user data, and handling signout.
 * [prop] url {String} The url for the request.
 * [prop] user {String} the username of the user
 * [prop] setError {function} The function to set error state.
 * [prop] setUser {function} The function to set user state
 */
export default function User({url, user, setError, setUser}){
    /**
     * Function to handle signouts.
     * 
     */
  const handleClick=async ()=>{
    try{
   
      const data=await postRequest({}, url);
      // If response is fine remove local storage and set state
      if(data.ok){
      localStorage.removeItem('username');
      setUser(null);
      // Other wise display error
    }else{
      const json=await data.json()
      setError({message:json.message, status:data.status})
    }

      }catch(e){
        setError({message:"There was an error while trying to sign you out. ", status:-1}) 
      }

  }
    if (!user) {
        console.log("loading")
        return ( < div > Just one second... </div>)
    }
   return(
       <div id="user_data">
           <h1>Signed in as:</h1>
           <span id="user_name"> {user}</span>
         <br/>
         
           <button id="sign_out" onClick={handleClick}>Sign Out</button>
       </div>
   )
    
}