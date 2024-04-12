const {getNoteById,
    getNotes,CreateNote,DeleteNote,
    UpdateNote }= require('../controllers/noteController')
const express = require('express');


const router= express.Router();
const protect =  require("../middleware/authMiddleware");

router.route("/").get(protect, getNotes);
router.route("/:id").put(protect, UpdateNote);
router.route("/:id").delete(protect, DeleteNote);
router.route("/create").post(protect,CreateNote);


module.exports=router;