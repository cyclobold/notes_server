const express = require("express");
const mongodb = require("mongodb");
const cors = require("cors");
const server = express();

//create MongoDB Client
const mongoClient = mongodb.MongoClient; 

//Get the link to your database from your MongoDB Dashboard
//Remember to change your password
const DB_URL = "mongodb+srv://cyclobold_user:<password>@cluster0.qcoqo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

//Create an instance of the MongoClient
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
    //connect the instance of your MongoCLient with the connect() method. 
    //This method returns a promise
    connection.connect().then(() => {

        //insert a single item into the 'posts' collection of the 'test_posts' database
        //'test_posts' database will be created if it does not exist
        //'posts' collection will also be created if it does not exist
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