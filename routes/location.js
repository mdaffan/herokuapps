var express=require("express")
var router=express.Router({mergeParams:true})
var Location=require("../models/locations")
var middleware=require("../middleware")
function checkLocations(req, res, next) {
    if (req.isAuthenticated()) {
        Location.findById(req.params.id, function (err, found) {
            if (err) {
                req.flash("nope", "location is khaali peeli")
                throw err
            } else {
                if (found.author.id.equals(req.user._id) || req.user && req.user.isAdmin) {
                    next();
                } else {
                    req.flash("nope", "You are not the same shit who registered for This")
                    res.redirect("/locations")
                }

            }
        })
    } else {
        req.flash("nope", "You need to be logged in")
        res.redirect("back")
    }

}
// Location.create({
//     name:"Affan",
//     image:"https://images.unsplash.com/photo-1530888571925-c766bb10af92?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=755b031de4778851ef0db28deffa30b2&auto=format&fit=crop&w=500&q=60",
    
// })
router.get("/", function (req, res) {
    if(req.query.search){
        const regex=new RegExp(escapeRegex(req.query.search),'gi')
        Location.find({ name: regex }, function (err, location) {
            if (err) {
                throw err
            } else {

                res.render("locations/index", { location: location })
            }
        })
    }
    else{
    
    Location.find({},function(err,location){
        if(err){
            throw err
        }else{
           
            res.render("locations/index",{location:location})
        }
    })
    }    
})

router.post("/", middleware.isLoggedIn,function (req, res) {
    var name = req.body.name;
    var   image = req.body.image,
        description = req.body.description,
        author={
            id:req.user._id,
            username:req.user.username
        }
        newLocation = { name: name, image: image, description: description,author:author };
    Location.create(newLocation, function (err, new1) {
        if (err) { throw err } else { res.redirect("/locations") }
    })
})
router.get("/new",middleware.isLoggedIn,function(req,res){
    res.render("locations/new")
})
router.get("/:id",function(req,res){
    Location.findById(req.params.id).populate("comments").exec(function(err,found){
        if(err){throw err}else{res.render("locations/show",{location:found})}
    })
    
})
router.get("/:id/edit", checkLocations,function(req,res){
    Location.findById(req.params.id,function(err, found){
        if(err) { throw err }else{ res.render("locations/edit", { location: found })
    }
})
})
router.put("/:id", checkLocations,function(req,res){
    Location.findByIdAndUpdate(req.params.id,req.body.location,function(err,found){
        if(err){throw err}else{res.redirect("/locations/"+req.params.id)}
    })
})
router.delete("/:id", checkLocations,function(req,res){
    Location.findByIdAndRemove(req.params.id,function(err,found){
        if(err){
            throw err
        }else{res.redirect("/locations")}
    })
})
function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

module.exports=router;
