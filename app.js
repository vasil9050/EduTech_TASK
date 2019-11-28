let express = require("express"),
      mongoose = require("mongoose"),
      bodyParser = require("body-parser")
      Add = require("./model/addmodel"),
      methodOverride = require("method-override");

let app = express();
app.set("view engine" , "ejs");
app.use(bodyParser.urlencoded({extended : true}));
app.use(methodOverride("_method"));

// app.use(function(req , res ,next){
// 	res.locals.id = req.Add._id;
// 	next();
// })

mongoose.connect("mongodb://localhost/add_app" , {useUnifiedTopology : true , useNewUrlParser: true , useCreateIndex: true} , console.log("mongo connected"));
  
app.get("/" , (req , res)=>{
    Add.find({} , (err , allquestions)=>{
        if(err){
            console.log(err)
        }else{
            console.log(allquestions)
            res.render("add" , {question : allquestions})
        }
    })  
})

app.get("/notify/:id" , (req , res)=>{
    Add.findById(req.params.id , (err , found)=>{
        if(err){
            console.log(err)
        }else{
            res.render("notification" , {question : found})
        }
    })
})

app.post("/" , (req , res)=>{
   let question = req.body.question;
   let addques = {question : question}
Add.create(addques , (err , question)=>{
    if(err){
        console.log(err)
    }else{
        res.redirect("/notify/"+question._id)
        console.log(question)
    }
})
})

app.delete("/" , (req , res)=>{
    Add.remove({} , (err)=>{
        if(err){
            console.log(err);
        }else{
            res.redirect("/")
        }
    })
})

app.listen("3000" , (req , res)=>{
    console.log("Server Started on Port 3000...")
})