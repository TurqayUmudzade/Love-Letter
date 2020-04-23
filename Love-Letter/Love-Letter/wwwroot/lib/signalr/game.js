"use strict";


var connection = new signalR.HubConnectionBuilder().withUrl("/hub").build();
console.log(connection);


connection.start().then(function () {
}).catch(function (err) {
    return console.error(err.toString());
});

connection.on("UserConnected", function (ConnectionId) {
    $("#userlist").append($("<li>").text(ConnectionId + "has joined"));
    var lobbyID = $('#lobbyID').text();
    console.log(lobbyID);
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
    
    connection.invoke("MoveLobbyCard",id,lobbyID).catch(function (err) {
        return console.error(err.toString());
    });
});


