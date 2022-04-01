import React, {
    useState, useEffect
} from 'react';
import Tweet from './Tweet'
import TweetInput from './TweetInput'
import './Tweets.css'
import {getRequest} from '../../requests'
/**
 * Component for dispalying tweets, and creating new ones.
* [prop] url {String} The url for the request.
* [prop] setError {function} The function to set error state.
 */
export default function Tweets({url, setError}) {
    /** Function for getting all tweets */
    async function getTweets() {
        try {
            const data = await getRequest(url)
            const json = (await data.json())
            if(data.ok){
            const list = json.map((d) => < Tweet key={d.id}user_name = {d.user.name}
                content = {d.content}
                created_on = {d.createdAt}/> );
                setListItems(list);
                // TODO handle errors
            }else{
                setError({message:json.message, status:data.status})
                console.log(json)
            }
        }
        
            catch (e) {
                setError({message:"There was an error while getting the tweets", status:-1})
                console.log(e)
            }
    }   
    /**
     * State for managing the list of tweets
     */
    const [listItems, setListItems] = useState(null)
    /**
     * Get tweets on render.
     */
    useEffect(getTweets, [])
    //Display load screen while the tweets are null
    if (listItems==null) {
        
        return ( < div > Just one second... </div>)
    }
    //Dislpay tweets once they are fetched
    return (<div id = "tweets" >
            <TweetInput url = {url} setError={setError} getTweets={getTweets}/>
            {listItems} 
            </div>
    );

}
        