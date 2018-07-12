var Location=("../models/locations")
var middlewareObj={}
middlewareObj.checkLocations=function(req,res,next){
    if(req.isAuthenticated()){
        Location.findById(req.params.id,function(err,found){
            if(err){throw err}else{
                if (found.author.id.equals(req.user._id)) {
                    return next();
                } else { res.redirect("back") }
            }
            
        })
    }else{res.redirect("back")}
}
middlewareObj.isLoggedIn=function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error","You dont have the permission idiot LOG IN!!")
    res.redirect("/login");
}
module.exports=middlewareObj