var mongoose=require("mongoose")
commentSchema=new mongoose.Schema({
    content:String,
    createdAt:{type:Date,default:Date.now},
    author:{
        id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    username:String
    }
})
module.exports=mongoose.model("Comment",commentSchema)