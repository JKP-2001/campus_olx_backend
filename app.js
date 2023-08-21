require("dotenv").config();

const express = require("express");
const app = express();
var cors = require('cors')

const corsOptions ={
  origin:'*', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200,
}


app.use(cors(corsOptions))
const bodyParser = require("body-parser");
const mongoose = require("mongoose");




app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static("public"));



// const url=`mongodb://Freinds:${process.env.mongo_password}@cluster0-shard-00-00.azngz.mongodb.net:27017,cluster0-shard-00-01.azngz.mongodb.net:27017,cluster0-shard-00-02.azngz.mongodb.net:27017/?ssl=true&replicaSet=atlas-10r9e4-shard-0&authSource=admin&retryWrites=true&w=majority`
// const url = "mongodb://0.0.0.0:27017/campusOLX"
const url = "mongodb+srv://chsianabhishekiitg:Axfj3aJcumvFgTpo@cluster0.7gasmau.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(url,(err)=>{
  if(err){
    console.log(err);
  }else{
    console.log('connected to db')
  }
});
app.use(express.json());
app.use('/uploads', express.static('uploads'));




app.use("/api/auth",require("./Routes/Auth"));
app.use("/api/item",require("./Routes/Item"))
app.use("/api/query",require("./Routes/ContactUs"))
app.use("/admin", require("./Routes/Admin"));
app.use("/api/conversation",require("./Routes/Conversation"));
app.use("/api/message",require("./Routes/Message"));


app.get("/",function(req,res){
	res.send("login");
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 5000;
}



app.listen(port,(err)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log("Server Run On Port 5000");
    }
})



