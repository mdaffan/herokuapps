var express=require("express")
var router=express.Router(),
    passport=require("passport")
var User=require("../models/user")
router.get("/",function(req,res){
    res.render("landing")
})
router.get("/register",function(req,res){
    res.render("register")
})
router.post("/register",function(req,res){
    var newUser=new User({username:req.body.username})
    if (req.body.adminCode === "secret") {
        newUser.isAdmin =true
    }
    User.register(newUser,req.body.password,function(err,user){
       
        if(err){
            req.flash("error",err.message)
            res.redirect("/register")
        }passport.authenticate("local")(req,res,function(){
            req.flash("success","Nice to meet you "+ req.body.username)
            res.redirect("/locations")
        })
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