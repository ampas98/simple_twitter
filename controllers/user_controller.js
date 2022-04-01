const user = require('../models/user')
const {compare}=require('../misc/hash')
/*
* Find user by email and compare passwords with the provided password.
* @param  {string} email       Provided email address.
* @param  {string} password    Provided password
* @return {Object}             The user if the password matches.
*/
module.exports.validateUser=async function(email, password) {
    if (!email || !password || typeof email != 'string'|| typeof password != 'string'
    || email.length==0||password.length==0) {
        throw {
            message: "Password or email was empty.",
            status: 400
        }
    }
    let curr_user
    try {
        curr_user = await user.findOne({
            where: {
                email: email
            }
        })
    } catch (e) {
        throw {
            message: "There was an error while trying to find the user.",
            status: 500
        }
    }
    // If the password is wrong
    // TODO maybe hash password
    console.log(curr_user.password, password,await compare(password, curr_user.password))
    if (curr_user&&await compare(password, curr_user.password)) {
      
        return curr_user;
    } else {
        throw {
            message: "The user does not exist or the password was incorrect.",
            status: 401
        }
    }
}

