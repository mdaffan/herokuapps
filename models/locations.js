var mongoose=require("mongoose")
var Schema=new mongoose.Schema({
    name:String,
    image:String,
    createdAt:{type:Date,default:Date.now},
    description:String,
    comments:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ],
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username:String
    }
})
module.exports=mongoose.model("Location",Schema)