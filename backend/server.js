const express=require('express');
//const notes= require('./data/notes.js');
const dotenv=require('dotenv');
const app=express();
const connectDB = require("./config/db.js");
const userRoutes = require('./routes/userRoutes.js');
const noteRoutes = require('./routes/noteRoutes.js');
const  errorHandler  = require('./middleware/errorMiddleware.js');
dotenv.config();
connectDB();
app.use(express.json()); 
app.use('/api/users',userRoutes);
app.use('/api/notes',noteRoutes);
app.use(errorHandler) ;
//const PORT = 1234;~
app.listen(console.log(`app is running on ${process.env.PORT}`));