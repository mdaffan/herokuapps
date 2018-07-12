
var express=require("express"),
    bodyParser=require("body-parser"),
    mongoose=require("mongoose"),
    location=require("./models/locations"),
    method=require("method-override"),
    passport=require("passport"),
    local=require("passport-local")
    User=require("./models/user"),
    moment=require("moment"),
    flash=require("connect-flash")
    Comment=require("./models/comments"),
    app=express();
var indexRoutes=require("./routes/index")    
var locationRoute = require("./routes/location")
var commentRoute=require("./routes/comments")  
app.use(express.static(__dirname + "/public"));  
app.use(bodyParser.urlencoded({ extended: true }));
app.use(flash())
app.use(method("_method"))
app.use(require("express-session")({
    secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session())
passport.use(new local(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())
app.use(function(req,res,next){
    res.locals.current=req.user;
    res.locals.moment=require("moment");
    res.locals.error=req.flash("error");
    res.locals.success=req.flash("success");
    next();
})    
app.use("/", indexRoutes)
app.use("/locations",locationRoute)
app.use("/locations/:id/comments",commentRoute)
mongoose.connect("mongodb://locations:locations123@ds235411.mlab.com:35411/myapp2",{ useNewUrlParser: true });    
app.set("view engine", "ejs");    
app.listen(3000,function (req,res) {
    console.log("Server Exploded")
    
})