const express = require("express");
const mongodb = require("mongodb");
const cors = require("cors");
const server = express(); //creates tthe server app

server.use(cors());
server.use(express.json());

//Create a MongoClient
mongoClient = mongodb.MongoClient;
const DB_URL = "mongodb+srv://cyclobold_user:e6b5eBt.$5PAcgx@cluster0.qcoqo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

const _conn = new mongoClient(DB_URL);

//Endpoints
server.get("/get-posts", function(request, response){
    

})


server.post("/create-post", async function(request, response){
    const post_title = request.body.postTitle;
    const post_summary = request.body.postSummary;
    const post_content = request.body.postContent;


    //connect
    feedback = await _conn.connect();

    if(feedback){
        feedback = await _conn.db("test_posts").collection("posts").insertOne({
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




server.listen("4000", function(){
    console.log("Server is listening ...")
})
