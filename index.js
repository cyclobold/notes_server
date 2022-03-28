const express = require("express");
const mongodb = require("mongodb");
const cors = require("cors");
const server = express();

const mongoClient = mongodb.MongoClient; 

const DB_URL = "mongodb+srv://cyclobold_user:e6b5eBt.$5PAcgx@cluster0.qcoqo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

let connection = new mongoClient(DB_URL);



//Middleware
server.use(express.json());
server.use(cors());

//Port
const PORT = 4000;

//Endpoints

//Get All Posts
server.get("/get-posts", function(request, response){

})

//Create Posts
server.post("/create-post", function(request, response){
    post_title = request.body.postTitle;

    post_message = request.body.postContent;

    post_summary = request.body.postSummary;


    //Submit the data to mongodb
    connection.connect().then(() => {

        connection.db("test_posts").collection("posts").insertOne({
            post_title: post_title,
            post_message: post_message,
            post_summary: post_summary
        })

        response.send({
            code: "success",
            message: "Post created successfully",
            data: request.body
        })

    })

   
  
    


})





server.listen(PORT, () => console.log("Listening on PORT ", PORT));