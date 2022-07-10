const router=require("express").Router();
const Conversation=require("../Models/Conversation");

// get the converstaion
router.get("/:id1/:id2",async(req,res)=>{
    try{

        const conversation=await Conversation.findOne({
            members:{$all:[req.params.id1,req.params.id2]}
        })
        if(conversation)
        {
            res.status(200).json({success:true,converstation:conversation});
            return ;
        }
        else
        {
            const newConversation= await new Conversation({
                members:[req.params.id1,req.params.id2]
            })
            const savedConversation = await newConversation.save();
            res.status(200).json({success:true,conversation:savedConversation});
            return ;
        }

    }catch(error)
    {
        res.status(500).json({success:false,message:error});
    }
})


module.exports=router;