//Imports
const express = require('express');
const cors=require('cors');
const bodyParser = require('body-parser');
const cookieParser=require('cookie-parser');
const {verifyToken}=require('./middleware/auth')
const userRouter= require('./routes/users_route');
const tweetRouter= require('./routes/tweets_route');

const app = express(); 

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));//For cors.

app.use(bodyParser.json());//For parsing json.

app.use(cookieParser('secret'))// For creating and reading cookies.

app.use(verifyToken);//For authenticating the user if they have a token.

//Routers
app.use('/api/tweets',tweetRouter )
app.use('/api/users',userRouter )


//Start server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`)); 

