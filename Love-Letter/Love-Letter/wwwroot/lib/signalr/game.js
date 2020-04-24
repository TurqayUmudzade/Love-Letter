"use strict";


var connection = new signalR.HubConnectionBuilder().withUrl("/hub").build();
console.log(connection);


connection.start().then(function () {
}).catch(function (err) {
    return console.error(err.toString());
});
var lobbyID = $('#lobbyID').text();
connection.on("UserConnected", function (ConnectionId) {
    $("#userlist").append($("<li>").text(ConnectionId + "has joined"));
    
    
    connection.invoke("JoinLobby", lobbyID).catch(function (err) {
        return console.error(err.toString());
    });
});



connection.on("UserDisconnected", function (ConnectionId) {
    $("#userlist").append($("<li>").text(ConnectionId + "has disconnected"))
});


connection.on("CardMoved", function (id) {
    $('#'+id).addClass("moved");
});


$('.card').on("click", function (){
    var id = $(this).attr("id");
    console.log(lobbyID);
    console.log(id)
    connection.invoke("MoveLobbyCard",id,lobbyID).catch(function (err) {
        return console.error(err.toString());
    });
});


