const tokens=require('../models/tokens')
const crypto=require('crypto')
const user=require('../models/user')
const fromBase64 = base64 =>
  base64
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
// TODO check for token collisions
// TODO handle errors consistently

/*
* Creates a token for a user.

* It randomizes a token for a user which is then stored in the database after hashing it.

* @param {number} user_id The user id of the user.

* @return {string}   token   The new token.
*/
module.exports.createToken=async (user_id)=>{
    try{
    const token = await new Promise((resolve, reject) => {
        crypto.randomBytes(16, (error, data) => {
          error ? reject(error) : resolve(fromBase64(data.toString('base64')));
        });
      });
    
    const hashed_token = crypto
        .createHash('sha256')
        .update(token)
        .digest('base64');
      
    await tokens.create({
        token:hashed_token,
        owner:user_id
    })
    
    // console.log("Created Token: "+token+", with hash: "+hashedToken)
    return token;
}catch(e){
    throw {status:500, message:"Error during creating the token"}
}

}

/*
* Gets the user associated with the given token.

* It finds the user given a token from the tokens table. It also checks whether the token is expired.

* @param {string} token The token provided by the user.

* @return {Object}      The user associated with the given token.
*/
module.exports.userFromToken=async (token)=>{
    
    if(!token){
        return null;
    }
        const hashedToken = crypto
        .createHash('sha256')
        .update(token)
        .digest('base64');
        // console.log("Verifying Token: "+token+", with hash: "+hashedToken)
    try{
        const result=(await tokens.findOne({
            where:{token:hashedToken}, 
            include: [
                {model: user, as:user, attributes:['name', 'email', 'id']}
            ]
        }))
        //If token is longer than one day we return null
        if(result.createdAt+60*60*1000*24<(new Date())){
            await tokens.destroy({
                where:{token:hashed_token}
            })
            return null;
        }
        
        return (result.user)
}    catch(e){
    
        return null;
    }
}

/*
*  Deletes the token from the database.
*    Given a token it deletes it from the database.
*    @param {String} token The token to delete. 


*/
module.exports.deleteToken=async (token)=>{
    try{
    const hashed_token = crypto
        .createHash('sha256')
        .update(token)
        .digest('base64');
    await tokens.destroy({
        where:{token:hashed_token}
    })
    // TODO make error handling
}catch(e){
    
}
}