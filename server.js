const express=require('express');
const errorHandler = require('./middleware/errorHandle');
const connectDb = require('./config/dbconnection');
const dotenv=require("dotenv").config();

connectDb();
const port=process.env.PORT;

const app=express();
app.use(express.json());

app.use(errorHandler);


app.use("/api/contacts",require('./routes/contactroutes'));

app.listen(port,()=>
{
    console.log("Server Running successfully");
})


