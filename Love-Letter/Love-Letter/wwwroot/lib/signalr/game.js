"use strict";

var lobbyID = $('#lobbyID').text();
var connection = new signalR.HubConnectionBuilder().withUrl("/hub").build();
console.log(connection);


connection.start().then(function () {
}).catch(function (err) {
    return console.error(err.toString());
});

connection.on("UserConnected", function (ConnectionId) {
    $(".enemy-cards").append("<div class='card-container c2'> <h2>" + ConnectionId + "</h2> </div >");
    connection.invoke("JoinLobby", lobbyID).catch(function (err) {
        return console.error(err.toString());
    });
});



connection.on("UserDisconnected", function (ConnectionId) {
    $("#userlist").append($("<li>").text(ConnectionId + "has disconnected"))
});


connection.on("CardMoved", function (id) {
    $('#' + id).addClass("moved");
});


$('.card').on("click", function () {
    var id = $(this).attr("id");
    connection.invoke("MoveLobbyCard", id, lobbyID).catch(function (err) {
        return console.error(err.toString());
    });
});


