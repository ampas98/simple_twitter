const {userFromToken}=require('../controllers/auth_controller')
const crypto=require('crypto')

/*
 *   Middleware for authenticating a user with a token.
 *   It gets the user associated with the token then sets the req.user object and continues to the next function.
    
 */
module.exports.verifyToken=async (req, res , next)=>{
    // console.log(req.cookies)
    try{
    req.user= await userFromToken(req.signedCookies.auth_token)
    }catch(e){
        
    }
    // console.log(req.user)
    return next()
}
/*
 *   Middleware for authorizing users.
 *   It checks for the existence of the user object on the request, and rejects the request if not.

 */
module.exports.isLoggedIn=async(req, res, next)=>{
    if(!req.user){
        return res.status(401).send({
            message:"Please log in first."
        })
    }
    return next()
}

