// imports
const express = require("express");
const cors = require("cors");
const usersRoute = require("./routes/user_routes");
const dmsRoute = require("./routes/dm_routes");
const discussionsRoute = require("./routes/discussion_routes");
const videosRoute = require("./routes/video_routes");
const interestRoute = require("./routes/interest_routes");
const mongoose = require("mongoose");
const http = require("http");
const dmSockets = require("./dmSockets/dmSockets");
const companyRoute = require("./routes/company_routes");
// uncomment this when you want to run locally
// remeber to change HOST to http://localhost:5000
// const dotenv = require("dotenv");
// dotenv.config();

// create express app
const app = express();
// socket io
const server = http.createServer(app);
dmSockets.io(server);
console.log(process.env.HOST);
// connect to mongodb
mongoose
    .connect(process.env.MONGOURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then((res) => {
        console.log("db Connected");
    })
    .catch((err) => {
        console.log("Connection failed! \n", err);
    });
// enable all CORS headers
app.use(cors());

// use json parsers
app.use(express.json());

// use interestRoute on '/api/interests'
app.use("/api/interests", interestRoute);

// use usersRoute on '/api/users'
app.use("/api/users", usersRoute);
app.use("/api/dms", dmsRoute);

// use discussionsRoute on '/api/discussions'
app.use("/api/discussions", discussionsRoute);

// use videosRoute on '/api/videos'
app.use("/api/videos", videosRoute);

// use companyRoute on '/api/videos'
app.use("/api/company", companyRoute);

// listen on PORT or 5000
const port = process.env.PORT || 5000;
server.listen(port, console.log("server running on port " + port));
