const express = require("express");
const mongodb = require("mongodb");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config(); //load dotenv


const server = express(); //creates tthe server app

server.use(cors());
server.use(express.json());

//Create a MongoClient
mongoClient = mongodb.MongoClient;
const DB_URL = process.env.DB_HOST_URL

const _conn = new mongoClient(DB_URL);

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




server.listen(process.env.PORT, function(){
    console.log("Server is listening ...")
})
