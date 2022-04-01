const bcrypt =require('bcrypt');

const salt_rounds=10;

/**
 * 
 *  It hashes a password. 
 *     @param {String} value The password.
 *   @return {String}      The hashed password.
 * 
 * 
 * 
 */
   

module.exports.hash= (value)=>{
    return (bcrypt.hash(value, salt_rounds))
}

/*
 *   It compares a hashed password with. 
 *   @param  {String} plain The password.
 *   @param  {String} hash  The hashed password.
 *   @return {Boolean}      True if the password hashes to the same value, false otherwise.
*/
module.exports.compare=async (plain, hash)=>{
    
    return ( await bcrypt.compare(plain, hash))
}