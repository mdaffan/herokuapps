var mongoose=require("mongoose")
var passport=require("passport-local-mongoose")
var Schema1=new mongoose.Schema({
    username:String,
    password:String
})
Schema1.plugin(passport)
module.exports=mongoose.model("User",Schema1)