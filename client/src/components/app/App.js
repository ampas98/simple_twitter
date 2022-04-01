//Imports
import './App.css'; 
import Login from '../login/Login.js';
import React,  {useState, useEffect} from 'react';
import Tweets from '../main/Tweets'
import User from '../main/User'
import ErrorToast from '../misc/Toast'
//Urls for requests
const BASE_URL='http://localhost:5000/api/'
const LOGIN_URL="users/login"
const LOGOUT_URL="users/logout"
const TWEETS_URL="tweets/"
/*Root component of the app*/
function App() {
/**State for remembering that the user is signed in,  and rendering correct page and also for displaying username*/
  const [user, setUser] = useState();
/**State for setting errors and displaying them */
  const [error, setError]=useState();
/*Setting user state to equal localstorage when there is no user in the react state but there is a user in localstorage
*Since there is no way to access the cookie from here(because of the httpOnly option) we have to rely maintaining a
*a separate username in localstorage which gets deleted when the cookie expires or the user signs out
*/
  useEffect(()=>{
    const stored_user=localStorage.getItem('username');
    //If there is a user in local storage the cookie should be set
    //And we can set 
    if (stored_user&&!user){
      setUser(stored_user)
    }
  }, [])
/**
 * Deleting user from local storage when there was an unathorized request, and setting user state to null
 * because status 401 means that our cookie expired.
 */
  useEffect(()=>{
      if (error&&error.status===401){
        setUser(null)
        localStorage.removeItem('username');
      }
    
  }, [error])
  /**
   * If user is not set we display login page
   */
  if(!user) {
    return (
      <div class="login-container">
    <Login setUser={setUser} url={BASE_URL+LOGIN_URL} setError={setError} />
    <ErrorToast error={error} setError={setError}/>
    </div>)
  }
/**If user is set we display the main page */
  return(
    <div class="main-container">
    
    <User user={user} url={BASE_URL+LOGOUT_URL}  setError={setError} setUser={setUser}/>
    <Tweets  url={BASE_URL+TWEETS_URL} setError={setError} />
    <ErrorToast error={error} setError={setError}/>
   
    </div>
  )

}

export default App;
