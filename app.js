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

var longurl;

var islongUrlExist= function(longurl,callback){
     client.hget("sort1","longurl",function(err,response){
            callback(err,response);
        }); 
};

app.get('/getUrl',function(req,res){
    var url = req.query.url;
    var index = url.indexOf("localhost:3000");
    if(index>-1 && index<8)
    {
        //sorturl
        client.hget(url,"longurl",function(err,response){
            res.json({"url":response});
            
        });
    }
    else{
        //longurl
        client.hget(url,"sorturl",function(err,response){
            if(response===null)
            {
                //LongUrl not yet exist
                //create new url 
                var sorturl ="localhost:3000/sorturl3";
                client.hset(url,"sorturl",sorturl,redis.print);
                client.hset(sorturl,"longurl",url,redis.print);
                client.zadd("views",1,sorturl,redis.print);
                res.json({"url":sorturl});
            }
            else{
                //LongUrl already exit
                res.json({"url":response});
            }
        });
        
             
        //client.set("test","test",redis.print);

    }
   

});

app.get('/:url',function(req,res){
    var url = req.params.url;
    url="localhost:3000/"+url;
    client.hget(url,"longurl",function(err,response){
        if(response===null){
            res.status(404).send("Url not exist");
        }
        else{
        
            res.redirect(response);
        }
    });
    
});



