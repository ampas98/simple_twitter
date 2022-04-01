const router=require('express').Router()
const {validateUser}=require('../controllers/user_controller')
const {createToken,  deleteToken}=require('../controllers/auth_controller')
const {isLoggedIn} =require('../middleware/auth')


/*
*  Endpoint for logging in users.
*  It validates a user based on the email and password provided in req body in json
*  It creates and saves a token for the user in the database.
*  It also send the token back as a cookie to the user.
 */
router.post('/login',async (req, res) => {
  
  try{
    // console.log("yo")
  const user=await validateUser(req.body.email, req.body.password)
  // console.log(user)
  const token=await createToken(user.id)
  let options = {
    maxAge: 1000 * 60 *60* 24, // would expire after 1 day
    httpOnly: true, // The cookie only accessible by the web server
    signed: true // Indicates if the cookie should be signed
}
  res.cookie('auth_token', token, options)

  return res.status(200).send({username:user.name});
  
  }catch(e){
    console.log(e)
     return res.status(e.status).send({message:e.message})
  }

    
});

/**
 * Endpoint for logging out users. It uses the cookie provided by the signed in user.
 * It deletes the token from the database and removes the cookie.
 * 
 */
router.post('/logout', async (req, res)=>{
  
  token=req.signedCookies.auth_token
  // console.log(token)
  try{
      await deleteToken(token)
      res.clearCookie('auth_token')
    return res.status(200).end()
  }catch(e){
   return res.status(500).send({message:"There was an error while trying to log you out."})
  }
})
module.exports=router