//jshint esversion:6
console.log("hello");
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose=require("mongoose");
let alert = require('alert');


mongoose.connect("mongodb://localhost:27017/codegeniussdb",{useNewUrlParser:true});

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const userSchema=mongoose.Schema({
    userId:Number,
    email:String
  });


  const User=mongoose.model("User",userSchema);

  app.get("/",function(req,res){
    
    res.render("userLogin");
  })

  app.get("/courses",function(req,res){
     res.render("courses");
  })

  app.post("/",function(req,res){
    let emailId=req.body.email;
    
    
    User.findOne({email:emailId}).then(function(student){
      let dbEmail=student.email;
      
      if(emailId===dbEmail){
        
        res.redirect("/courses");
      }
      
      
    }).catch(function(err){

      res.send("Oops! Email is not registered");
      console.log(err);
    })
      
      



    
  });

app.get("/addnewuser",function(req,res){

    res.render("addUserPage");
   
})



app.post("/addnewuser",function(req,res){
    const email=req.body.userEmail;
    const userId=req.body.userId;

    console.log(email);
    console.log(userId);

    const user=new User({
        userId:userId,
        email:email
    });

    user.save().then(function(){
        res.redirect("/addnewuser");
    
      })
      .catch(function(err){
        console.log(err);
      })
})


app.get("/deleteuser",function(req,res){
  res.render("deleteUserPage");
})




app.post("/",function(req,res){

})


app.post("/deleteuser",function(req,res){
  let userId=req.body.userId;
  // var query = { userId: userId };

  User.deleteOne({userId: userId}).then(function(){
    res.redirect("/deleteuser");

  })
  .catch(function(err){
    console.log(err);
  })  


  // res.redirect("/deleteuser");
})






app.listen(3000, function() {
    console.log("Server started on port 3000");
  });