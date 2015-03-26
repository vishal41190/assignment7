var express = require('express');
var http= require('http');
var path = require('path');
var redis= require('redis');

var app = express();

client = redis.createClient();

app.use(express.static(path.join(__dirname, 'public')));

http.createServer(app).listen(3000);

client.on("error",function(err){
    console.log("Error" + err);
});

app.get('/getUrl',function(req,res){
    var url = req.query.url;
    var index = url.indexOf("localhost:3000");
    if(index<8)
    {
        //shorturl
    }
    else{
        //longurl
        var dataset = {
        "shortUrl":
        "longUrl":
        "visit":
        }
        
        client.set("test","test",redis.print);
    }
    
//client.set("test","test",redis.print);
res.end("get url called");
});


