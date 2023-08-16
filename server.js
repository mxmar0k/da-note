// we import the modules and set up the server
// its important to note that the routes are custom made
// the port needs to be like that to work with herokuuuu
const express = require('express');
const htmlRoutes = require('./routes/html-routes');
const apiRoutes = require('./routes/api-routes');
const PORT = process.env.PORT || 3001;
// this is the instance of the express app
const app = express();
// this is the middleware to parse the incomming request data with url enconded ploads
//then we parse json information
// and we serve static files from the public dir
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

//this are the routes we need to use 
app.use(htmlRoutes);
app.use(apiRoutes);
// this starts the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
