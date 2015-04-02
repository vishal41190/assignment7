$(document).ready(function(){
    
    $("#button").click(function(){
    var url = $("#url").val();
        if(url===undefined)
        {
            alert("Please enter url in text box");
        }
        else{
           var  UserUrl=JSON.stringify({url1:url});
             $.ajax({
            
            type: "POST",
            url: "/getUrl",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: UserUrl
        })
        .done(function (data,status){
        
            $('#result').html("");
            $('#result').append(data.url);
                  
               
        })
        .fail(function (data, status){
            console.log("fail called");
            console.log(data);
            console.log(status);
        });
        
        }
    
    });
    
});