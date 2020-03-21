const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
const conn=require('./connection');
const app=express();

app.use(cors());
app.use(bodyParser.json());

conn.once('open',(err,db)=>{
    if(err){
        throw err;
    }
    console.log('Connected to MongodDB...')
})