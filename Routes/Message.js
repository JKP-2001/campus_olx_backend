const router=require("express").Router();
const Message=require("../Models/Message");

// add a message
router.post("/",async (req,res)=>{
    try{
        const newMessage=  new Message({
                text:req.body.text,
                sender:req.body.sender,
                conversationId:req.body.conversationId
        });
        const savedMessage=await newMessage.save();
        res.status(200).json({success:true,message:savedMessage});

    }catch(error)
    {
        res.json({success:false,message:error});
    }
})


// get a message
router.get("/:id",async (req,res)=>{
    try{

        const messages=await Message.find({
            conversationId:req.params.id
        })
        if(messages)
        {
            res.status(200).json({success:true,messages:messages});
            return ;
        }
        else
        {
            res.status(200).json({success:true,messages:[]})
        }

    }catch(error)
    {
        res.json({success:false,message:error});
    }
})




module.exports=router;