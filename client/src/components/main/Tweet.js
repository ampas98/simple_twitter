import React,  {useState} from 'react';
import './Tweet.css'

/**
 * Component for displaying a tweet.
 * [prop]   user_name {String} User_name of the writer of the tweet.
 * [prop]   created_on {number} Timestamp of the created tweet.
 * [prop]   content {String} Conent of the tweet.
 */
export default function Tweet({user_name, created_on, content}){
    // console.log(user_name, created_on, content);
    return(
        <div className="tweet">
            <div className="tweet-header">
                <h3>@{user_name}</h3>
                <p>{new Date(created_on).toLocaleDateString()}</p>
            </div>
            <div className="tweet-body">{content}</div>
        </div>
    );
}
