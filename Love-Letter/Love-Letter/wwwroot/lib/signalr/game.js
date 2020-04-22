"use strict";


var connection = new signalR.HubConnectionBuilder().withUrl("/hub").build();
console.log(connection);



connection.start().then(function () {
}).catch(function (err) {
    return console.error(err.toString());
});


connection.on("CardMoved", function (id) {
    
    $('#'+id).addClass("moved");
});


$('.card').on("click", function (){
   
    var id = $(this).attr("id");
    connection.invoke("MoveCard",id).catch(function (err) {
        return console.error(err.toString());
    });
});


