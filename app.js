const express = require('express');
const mongoose = require('mongoose');
const app = express();

//Port
app.listen(3000,()=>{
    console.log("Running on Port 3000")
});


//connect to db
mongoose.connect(
    "mongodb://localhost:27017/moviesdb",
    {
        useNewUrlParser: true,
        useUnifiedTopology:true

    },()=>{console.log('Connected to db')});

// Schema
const sch={
    name:String,
    img:String,
    summary:String
}
const monmodel = mongoose.model("appdata", sch);

//Post Route
app.post("/post", async(req, res) => {
    console.log("Inside Post Function")
    
    const data = new monmodel({
        name:req.body.name,
        img:req.body.img,
        summary:req.body.summary
    });

    const val=await data.save();
    res.send("Posted");

});

// UpdateById
app.put("/update/:id", async(req, res)=>{
    let upid = req.params.id;
    let upname = req.body.name;
    let upimg = req.body.img;
    let upsummary = req.body.summary;

    //To Find and update
    monmodel.findOneAndUpdate({id:upid}, {$set:{name:upname, img:upimg, summary,upsummary}},
        {new:true},(err, data)=>{
        if(err){
            res.send("Error")
        }else{

            if(data==null)
            {
                res.send("nothing found")  // if id or data is missing
            }
            else{
                res.send(data)
            }
        }
    })
})

//Fetch or Get

app.get('/fetch/:id', function(req, res){
    fetchid=req.params.id;
    monmodel.find(({id:fetchid}), function(err, val){

        if (val.length==0){
            res.send("data does not exist")

        }else{
            res.send(val);
        }
    })
})

// Delete

app.delete('/del/:id', function(req, res){

    let delid=req.params.id;
    monmodel.findOneAndDelete(({id:delid}), function(err, docs){
        if(err)
        {
            res.send("Error")
        }
        else{

            if(docs==null)
            {
                
                res.send("Wrong Id")
            }
            else{
            res.send(docs);
            }
        }
    })
})

