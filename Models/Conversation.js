const mongoose=require("mongoose");

const conversationSchema=new mongoose.Schema({
    members:{
        type:Array
    }
},{
    timestamps:true
})

const Message=mongoose.model("Message",messageSchema);

module.exports=Message