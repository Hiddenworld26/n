const Note= require('../models/noteModel.js');
const asyncHandler = require('express-async-handler');

const getNotes = asyncHandler(async (req, res) => {
  const notes = await Note.find({user:req.user._id});
  res.json(notes);
});

const getNoteById = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);
  if (note) {
    res.json(note);
  } else {
    res.status(404).json({ message: "Note not found" });
  }
res.json(note);
});

const CreateNote = asyncHandler(async (req, res) => {
    const { title, content, category } = req.body;
  if (!title || !content || !category) {
      res.status(400);
      throw new Error("Please Fill all the feilds");
     } else {
      const note = new Note({ user:req.user._id, title, content, category });
      const createdNote = await note.save();
      res.status(201).json(createdNote);
    }
  });

  const DeleteNote = asyncHandler(async (req, res) => {
       try {
      const note = await Note.findById(req.params.id);
      if (!note) {
        return res.status(404).json({ message: 'Note not found' });
      }
      if (note.user.toString() !== req.user._id.toString()) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      await note.deleteOne();
      res.json({ message: 'Note deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
   const UpdateNote = asyncHandler(async (req, res) => {
    const { title, content, category } = req.body;
    const note = await Note.findById(req.params.id);
    if (note.user.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error("You can't perform this action");
    }if (note) {
      note.title = title;
      note.content = content;
      note.category = category;
      const updatedNote = await note.save();
      res.json(updatedNote);
    } else {
      res.status(404);
      throw new Error("Note not found");
    }
  });

module.exports={ getNoteById, getNotes,CreateNote, DeleteNote, UpdateNote };