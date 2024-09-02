const express = require('express')
const fetchuser = require('../middleware/fetchuser');
const Note = require("../models/Note")
const { body, validationResult } = require('express-validator');

const router = express.Router()

// ROUT 1: get all notes using get "api/notes/getuser"
router.get('/fetchallnotes', fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id })

    res.json(notes)
  } catch (error) {
    console.error(error.meaage)
    res.status(500).send("Server error")
  }


})

// ROUT 2: Add a new note using post "localhost:5000/api/notes/addnote"
router.post('/addnote', fetchuser, [
  body("title", "Enter a valid title").isLength({ min: 3 }),
  body("description", "Description atleast 5 characters").isLength({ min: 8 }),

], async (req, res) => {
  try {
    const { title, description, tag } = req.body;

    // checking errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const note = new Note({
      title, description, tag, user: req.user.id
    })
    const saveNotes = await note.save()


    res.json(saveNotes)
  } catch (error) {
    console.error(error.meaage)
    res.status(500).send("Server error")
  }
})

// ROUT 3: Update existing note using put "localhost:5000/api/notes/updatenote"
router.put('/updatenote/:id', fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;
  try {
    // create new Note object
    const newNote = {}
    if (title) {
      newNote.title = title
    }
    if (description) {
      newNote.description = description
    }
    if (tag) {
      newNote.tag = tag
    }
    newNote.update = Date.now;

    // Find note to be updated
    let note = await Note.findById(req.params.id)
    if (!note) {
      return res.status(404).send("Not Found")
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Unauthorized access")
    }
    note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
    res.json(note)

  } catch (error) {
    console.error(error.meaage)
    res.status(500).send("Server error")
  }
})


// ROUT 4: Deleting existing note using delete "localhost:5000/api/notes/deletenote"
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;
  try {


    // Find note to be deleted
    let note = await Note.findById(req.params.id)
    if (!note) {
      return res.status(404).send("Not Found")
    }
    // Allow only authorised user to perform task
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Unauthorized access")
    }
    note = await Note.findByIdAndDelete(req.params.id)
    res.json({ "Success": "Note has been deleted", Note: note })

  } catch (error) {
    console.error(error.meaage)
    res.status(500).send("Server error")
  }
})


module.exports = router