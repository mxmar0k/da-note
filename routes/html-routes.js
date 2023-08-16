// first we import the router module from the express lib
// we want it to create modular routes for our paths
const router = require('express').Router();
//then we import the path module from node for directory paths
const path = require('path');

//then we define a get route, to send the index.html file to the user
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});
// this is another path for the notes.html 
router.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'notes.html'));
});
//finally this makes it available for other parts 
module.exports = router;
