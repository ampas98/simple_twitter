const router=require('express').Router() //Router from express
const controller=require('../controllers/tweet_controller') //Controller for tweets
const {isLoggedIn}=require('../middleware/auth') //Middleware for authorizing users

// The router uses the middleware to make sure users who are not logged in will be rejected
router.use(isLoggedIn)
/* 
    End point for getting all the tweets.
*/
router.get('/',async (req, res)=>{

    try{
        const result=await controller.findAll()
        res.status(200).send(result)
    }catch(e){
        res.status(e.status).send({message:e.message})
    }
})

/* 
    End point for creating a tweet.
*/
router.post('/',async (req, res)=>{
    try{
        
        const result= await controller.newTweet(req.user.id, req.body.content)
        return res.status(200).send(result)
    }catch(e){
        console.log(e)
        return res.status(e.status).send({message:e.message})
    }
})
module.exports=router