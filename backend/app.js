const express = require('express');
const app = express();

// listen on PORT or 5000
const port = process.env.PORT || 5000
app.listen(port, console.log("server running on port "+port));

