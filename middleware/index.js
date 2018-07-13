var Location=("../models/locations")
var middlewareObj={}
middlewareObj.checkLocations = function(req, res, next) {
    if (req.isAuthenticated()) {
        Location.findById(req.params.id, function(err, found) {
            if (err) {
                req.flash("nope", "location is khaali peeli")
                throw err
            } else {
                if (found.author.id.equals(req.user._id)) {
                   next();
                } else {
                    req.flash("nope", "You are not the same shit who registered for This")
                    res.redirect("back")
                }

            }
        })
    } else {
        req.flash("nope", "You need to be logged in")
        res.redirect("back")
    }

}
middlewareObj.isLoggedIn=function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error","You dont have the permission idiot LOG IN!!")
    res.redirect("/login");
}
module.exports=middlewareObj