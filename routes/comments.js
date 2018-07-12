var express=require("express")
var router=express.Router({mergeParams:true})
var Location=require("../models/locations")
var Comment=require("../models/comments")
// Comment.create(
//     {
//     content:"Ok done karta hu",
//     // author:req.author._id
// },function(err,comment){
//     console.log(comment)
//     if(err){throw err}else{
//         Location.comments.push(comment);
//         Location.save();
//     }
// })
router.get("/new",function(req,res){
    Location.findById(req.params.id,function(err,found){
        if (err) {
            throw err
            
        }
        res.render("comments/index",{location:found})
    })
})
router.post("/",function(req,res){
    Location.findById(req.params.id,function (err,location) {
        if(err){throw err}else{
            Comment.create(req.body.comment,function(err,comment){
                if(err){throw err}else{
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    location.comments.push(comment);
                    location.save();
                    req.flash("success","Comment added")
                    res.redirect('/locations/' + location._id);
                }
            })
        }
        
    })
})
router.get("/:comment_id/editcomments",function(req,res){
    Comment.findById(req.params.comment_id,function(err,found){
        if(err){throw err}else{
            
            res.render("comments/editcomments",{location:req.params.id,comment:found})
        }
    })
    
})
router.put("/:comment_id", function (req, res) {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function (err, update) {
        if (err) {
            throw err
        } else {
            req.flash("success", "Your Comment has been edited")
            res.redirect("/locations/" + req.params.id)
        }
    })

})
router.delete("/:comment_id", function (req, res) {
    Comment.findByIdAndRemove(req.params.comment_id, function (err, delete1) {
        if (err) {
            throw err
        } else {
            req.flash("success", "Your Comment has been destroyed")
            res.redirect("/locations/" + req.params.id)
        }
    })
})
module.exports=router