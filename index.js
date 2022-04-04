const express = require("express");
const mongodb = require("mongodb");
const dotenv = require("dotenv");
const cors = require("cors");
const fs = require("fs");

dotenv.config(); //load dotenv


const server = express(); //creates tthe server app

server.use(cors());
server.use(express.json());

//Create a MongoClient
mongoClient = mongodb.MongoClient;
const DB_URL = process.env.DB_HOST_URL

const _conn = new mongoClient(DB_URL);

//Home
server.get("/", function(request, response){

    response.send({
        message: 'Welcome home',
        data: null
    })

})

//Endpoints
server.get("/get-posts", async function(request, response){
   feedback = await _conn.connect();

   if(feedback){
        result = await _conn.db(process.env.DB_NAME).collection("posts").find().toArray();
        if(result){
            response.send({
                message: "Data retrieved...",
                data: result,
                code: "success"
            });

        }
   }

})


server.get("/get-post", async function(request, response){
    post_id = request.query.post_id;

    post_id = mongodb.ObjectId(post_id).toString();

    console.log(post_id);

    result = await _conn.connect();

    if(result){
       search_result = await _conn.db(process.env.DB_NAME).collection("posts").findOne({_id: mongodb.ObjectId(post_id)});
        console.log(search_result)
       if(search_result){
           response.send({
               data: search_result
           })
       }
    
    }


})


server.post("/update-post", async function(request, response){
    post_title = request.body.post_title;
    post_summary = request.body.post_summary;
    post_content = request.body.post_content;
    post_id = request.body.post_id;


    result = await _conn.connect();

    if(result){
       feedback =  await _conn.db(process.env.DB_NAME).collection("posts").updateOne({_id: mongodb.ObjectId(post_id)}, {$set: {
            post_title: post_title,
            post_summary: post_summary,
            post_content: post_content
        }})

        if(feedback){
            response.send({
                message: "Post updated successfully", 
                code: "success"
            })
        }


    }


})


server.post("/create-post", async function(request, response){
    const post_title = request.body.postTitle;
    const post_summary = request.body.postSummary;
    const post_content = request.body.postContent;


    //connect
    feedback = await _conn.connect();

    if(feedback){
        feedback = await _conn.db(process.env.DB_NAME).collection("posts").insertOne({
            post_title: post_title,
            post_summary: post_summary,
            post_content: post_content
        });

        if(feedback){
            response.send({
                message: "Post saved successfully",
                code: "success"
            }) 
        }

        



    }





})


server.get("/users", function(request, response){
    // data = fs.readFileSync("data.json");
    // data = JSON.parse(data);
    // console.log(data);
   
    fs.readFile("data.json", function(error, result){
       if(error) throw new error;

       result = JSON.parse(result);

       console.log(result);




    })

})



const PORT = process.env.PORT || 5000;
server.listen(PORT, function(){
    console.log("Server is listening ...")
})
