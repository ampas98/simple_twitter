const tweet=require('../models/tweet')
const user=require('../models/user')

/*Find all tweets.
Return all tweets in the database ordered by there creation, and including the associated user.
@return {Object} List of all tweets.
 */
module.exports.findAll=async ()=>{
    try{
   return (await tweet.findAll({
    attributes: { exclude: ['owner'] },
    include: [
        {model: user, as:user.tablename, attributes:['name']}
    ], 
    order:[['createdAt', 'desc']]
   }))
    } catch(e){
        console.log(e)
       throw {message:"There was an error while retrieving the tweets", status:500}
   }
}

/* 
* Create a new tweet.
* @param {string} user_id Id of the user that owns the tweet.
* @param {string} content Content of the tweet.
* @return {Object} The newly added tweet.
 */

module.exports.newTweet=async(user_id, content)=>{
if( !content ||typeof content != "string"){
    throw {message:"There was no content for the tweet.", status:400}
}
if(content.length>280){
    throw {message:"The tweet was too long.", status:400}
}
if( !user_id|| typeof user_id!="number"){
    throw {message:"The user could not be found.", status:400}
}
try{
return await tweet.create({
    owner:user_id, 
    content:content
})}
catch(e){
    console.log(e)
    throw {message:"There was an error while creating the tweet", status:500}
}
}

