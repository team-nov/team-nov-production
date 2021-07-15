// imports
const express = require('express');
const cors = require('cors')
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
    // mongodb+srv://teamnov:teamnov@cluster0.pe4eq.mongodb.net/TeamNov[your name]?retryWrites=true&w=majority

    'mongodb+srv://teamnov:teamnov@cluster0.pe4eq.mongodb.net/TeamNovShammo?retryWrites=true&w=majority',
    {useNewUrlParser:true, useUnifiedTopology:true})
    .then((res)=>{
        console.log("db Connected")
    })
    .catch((err)=>{
        console.log("Connection failed! \n", err)
    })
// enable all CORS headers
app.use(cors());

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

