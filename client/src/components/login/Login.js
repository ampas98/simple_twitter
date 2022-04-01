import React, {useState} from 'react';
import './login.css';
import PropTypes from 'prop-types';
const {postRequest} =require( '../../requests')

/**
 * Component for loggin user in.
 * [prop] url       {String}   The url for the request.
 * [prop] setUser   {function} The function to set the user state.
 * [prop] setError  {function} The function to set error state.
 * 
 */
export default function Login({setUser, url, setError}) {
  // Login.propTypes = {
  //   setUser: PropTypes.func.isRequired
  // }
  const handleSubmit = async (e)=> {
      e.preventDefault();
     try{
       
      const data = await postRequest( url, {
        email,
        password
      });
      // console.log(url)
      const json=await data.json()
      if (data.ok){

      setUser(json.username);
      localStorage.setItem('username',json.username)
      // TODO handle error
      }else{
        // console.log(data.status)
        setError({message:json.message, status:data.status})

      }
    }catch(e){
     setError({message:"There was an error while trying to log you in.", status:-1})
   }
    }
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
  return(
    <div className="login-wrapper">
      <h1>Login</h1>
      <form id="input_form" onSubmit={handleSubmit}>
        <label>
          
          <input className="login-input" type="text" placeholder="Email"  onChange={e=>setEmail(e.target.value)}/>
        </label>
        <label>
         
          <input  className="login-input" type="password" placeholder="Password" onChange={e=>setPassword(e.target.value)} />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  )
 

  
}

