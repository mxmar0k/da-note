//again first we import the modules we need, which are
//express router
// uuidv4 - we need to npm i it
// and require
const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const fs = require("fs");

// we have a get route handler to retrive notes 
// we read the content of the json file and return a string
//json.parse is to... parse the json sting and send it as js object
//that object is the dbjson
// in case it fails... 500
router.get('/api/notes', async (req, res) => {
  try {
    const dbJson = await JSON.parse(fs.readFileSync("db/db.json", "utf8"));
    res.json(dbJson);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});


//the next handler is for adding new notes
// we have to retrive the data from the client/user
//we give it an id
//push it as js object at the end
// we also have 500 error

router.post('/api/notes', (req, res) => {
  try {
    const dbJson = JSON.parse(fs.readFileSync("db/db.json", "utf8"));
    const newFeedback = {
      title: req.body.title,
      text: req.body.text,
      id: uuidv4(),
    };
    dbJson.push(newFeedback);
    fs.writeFileSync("db/db.json", JSON.stringify(dbJson));
    res.json(dbJson);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// finally we have the delete route for deleting notes
//we read the json, parse it and filter with params ti delete
// the filteded array gets written back and we have a message of deletion
//also error 500

router.delete('/api/notes/:id', (req, res) => {
  try {
    let data = fs.readFileSync("db/db.json", "utf8");
    const dataJSON = JSON.parse(data);
    const newNotes = dataJSON.filter((note) => note.id !== req.params.id);
    fs.writeFileSync("db/db.json", JSON.stringify(newNotes));
    res.json({ message: "Note deleted." });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

//also to export to other parts of the code
module.exports = router;
