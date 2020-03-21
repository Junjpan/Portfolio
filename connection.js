const mongoose=require('mongoose');

require('dotenv').config();

const conn=mongoose.createConnection(process.env.DBA_URL,{useNewUrlParser:true,useUnifiedTopology: true});

module.exports=conn;