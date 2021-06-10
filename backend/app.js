// imports
const express = require('express');
const usersRoute = require('./routes/user_routes');
const dmsRoute = require('./routes/dm_routes');
const discussionsRoute = require('./routes/discussion_routes');
const videosRoute = require('./routes/video_routes');
const mongoose = require('mongoose');
const http = require('http');
const dmSockets = require('./dmSockets/dmSockets')

// create express app
const app = express();
// socket io
const server = http.createServer(app);
dmSockets.io(server)


// connect to mongodb
mongoose.connect(
    // change it back to mongodb+srv://teamnov:teamnov@manage.wwmlv.mongodb.net/TeamNov?retryWrites=true&w=majority
    // before you merge to develop
    'mongodb+srv://teamnov:teamnov@cluster0.pe4eq.mongodb.net/TeamNovBrandon?retryWrites=true&w=majority',
    {useNewUrlParser:true, useUnifiedTopology:true})
    .then((res)=>{
        console.log("db Connected")
    })
    .catch((err)=>{
        console.log("Connection failed! \n", err)
    })

// Pass CORS headers
app.use((req,res,next) =>{
    // allow access to all orgins
    res.header('Access-Control-Allow-Origin','*');
    // set supported headers
    res.header('Access-Control-Allow-Headers','*');
    // set supported HTTP METHODS
    // client will send options request to see if an http request is supported
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods','PUT','POST','PATCH','DELETE','GET')
        return res.status(200).json({});
    }
    next();
})

// use json parsers
app.use(express.json());

// use usersRoute on '/api/users'
app.use('/api/users',usersRoute);
app.use('/api/dms',dmsRoute);

// use discussionsRoute on '/api/discussions'
app.use('/api/discussions', discussionsRoute);

// use videosRoute on '/api/videos'
app.use('/api/videos', videosRoute);

// listen on PORT or 5000
const port = process.env.PORT || 5000
server.listen(port, console.log("server running on port "+port));

