import React, {
    useState
} from 'react';
import {postRequest} from '../../requests'
/**
 * Component for taking tweets and sending them.
 * [prop] url {String} The url for the request.
 * [prop] setError {function} The function to set error state.
 * [prop] getTweets {function} The function to get and update tweets list.
 */
export default function TweetInput({url, setError, getTweets}) {
    //Max char number for tweets
    const MAX_CHARS = 280;
/**
 * 
 * Function for handling submits
 */
const handleSubmit = async (e)=> {
        e.preventDefault();
       try{
        const data = await postRequest({content:tweet}, url);
        
        const json=await data.json();
       
        //Replace list of tweets if response is ok
       if(data.ok){
        getTweets()
       }
       //Otherwise handle error
       else{
        
        setError({message:json.message, status:data.status})
       }
       
      }catch(e){
        setError({message:"There was an error while trying to tweet.", status:-1})
       console.log(e)
     }
    }
    /**State for the tweet input */
    const [tweet, setTweet] = useState("");

    return ( <div id = "tweet_input_container" >
        <label htmlFor = "tweet_input" > What 's happening?</label> 
        <form id="input_form" onSubmit={handleSubmit}>
        <input type = "text" id = "tweet_input" maxLength = {MAX_CHARS } onChange = {(e) => {setTweet(e.target.value) }}></input> 
        <p id = "counter"> { tweet.length+"/"+MAX_CHARS} </p> <button type = "submit"> Tweet </button>
        </form>
        </div>
    );
}