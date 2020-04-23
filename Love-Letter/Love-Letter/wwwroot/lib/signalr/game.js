"use strict";


var connection = new signalR.HubConnectionBuilder().withUrl("/hub").build();
console.log(connection);



connection.start().then(function () {
}).catch(function (err) {
    return console.error(err.toString());
});

connection.on("UserConnected", function (ConnectionId) {
    $("#userlist").append($("<li>").text(ConnectionId+"has joined"));
});


connection.on("UserDisconnected   ", function (ConnectionId) {
    $("#userlist").append($("<li>").text(ConnectionId + "has disconnected"))
});


connection.on("CardMoved", function (id) {
    console.log(id);
    $('#'+id).addClass("moved");
});


$('.card').on("click", function (){
    console.log("click"+id);
    var id = $(this).attr("id");
    console.log("click" + id);
    connection.invoke("MoveCard",id).catch(function (err) {
        return console.error(err.toString());
    });
});


