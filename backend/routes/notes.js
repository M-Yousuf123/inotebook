const express = require('express')
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');

//Route 1: //Get all the notes using: GET "/api/notes/fetchallnotes"  login required
router.get('/fetchallnotes', fetchuser, async (req, res)=>{
    try {
        const notes = await Note.find({user:req.user.id});
        res.json(notes);
        
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Internal Server Error")
     }
})

//Route 2: //Add a new Note using: Post "/api/notes/addnote" login required
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid name').isLength({min: 2}),
    body('description', 'Enter a valid Email').isLength({min: 5})
], async (req, res)=>{
    try {
        
        const {title, description, tag} = req.body;
        // If there are errors, return Bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save()
        res.json(savedNote);
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Internal Server Error")
     }
})

//Route 3: //Update an existing Note using: Put "/api/notes/updatenote" login required
router.put('/updatenote/:id', fetchuser, async (req, res)=>{
     try {
        const {title, description, tag} = req.body;

        //create a newNote object
        const newNote = {};
        if(title) newNote.title = title
        if(description) newNote.description = description
        if(tag)  newNote.tag = tag

        // Find the note to be updated and update it
        let note = await Note.findById(req.params.id);
        if(!note) {return res.status(404).send("Not Found")}

        //checking weather the user is a owner of that note or not
        if(note.user.toString() !== req.user.id){
              return res.status(401).send("Not Allowed")
        }

        note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true})
        res.json({note});
     } catch (error) {
        console.log(error.message)
        res.status(500).send("Internal Server Error")
     }
})
//Route 4: //Delete an existing Note using: DELETE "/api/notes/deletenote" login required
router.delete('/deletenote/:id', fetchuser, async (req, res)=>{
     try {
        // Find the note to be deleted and delete it
        let note = await Note.findById(req.params.id);
        if(!note) {return res.status(404).send("Not Found")}

        //checking weather the user is a owner of that note or not
        if(note.user.toString() !== req.user.id){
              return res.status(401).send("Not Allowed")
        }

        note = await Note.findByIdAndDelete(req.params.id)
        res.json({"success":"note has been deleted", note:note});
     } catch (error) {
        console.log(error.message)
        res.status(500).send("Internal Server Error")
     }
})
module.exports = router;