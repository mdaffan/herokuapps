var express=require("express")
var router=express.Router(),
    passport=require("passport")
var User=require("../models/user")
router.get("/",function(req,res){
    res.render("home")
})
router.get("/register",function(req,res){
    res.render("register")
})
router.post("/register",function(req,res){
    var newUser=new User({username:req.body.username})
    User.register(newUser,req.body.password,function(err,user){
        if(err){
            req.flash("error",err.message)
            res.redirect("/register")
        }else{res.redirect("/locations")}
    })
})
router.get("/login",function(req,res){
    res.render("login")
})
router.post("/login",passport.authenticate("local",{
    successRedirect:"/locations",
    failureRedirect:"/login"

}),function(req,res){

})
router.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/locations")
})   
module.exports=router