const express = require("express")
const app = express()
const session = require("express-session")
const  MongoStore = require("connect-mongo")
//session ke liye midleware bnya jta h 
app.use (session({
secret: "secretpassword",
resave: false,//session will not save if there is no change
saveUninitialized: false,//session will only be save when there is something in it
store: MongoStore.create({ mongoUrl :"mongodb://127.0.0.1:27017/sessiondb"}),
cookis:{ maxAge: 1000 * 60 * 60 *24 }

})) 

 
app.get("/",(req,res)=>{
     if(req.session.username){
    res.send( `<h1>username from session is : ${req.session.username}</h1>`)
}
else{
    res.send( `<h1>username is not found.</h1>`)
}
//     res.send("<h1>home page</h1>")
  })
 
app.get("/set-username",(req,res)=>{
    req.session.username = "nubthail mustafa"
    res.send("<h1>username has been set in session.</h1>")
})

app.get("/destroy",(req,res)=>{
    req.session.destroy((err)=>{
     if(err){
        res.status(500).send("failed to destory session")
     }
     res.send("<h1>session destroyed welly</h1>")
    })
})


app.listen("3000",()=>{
    console.log("server is walking on port 3000") 
})