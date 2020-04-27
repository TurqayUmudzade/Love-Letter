"use strict";
let userCounter = 1;
let lobbySize = 4;
let allcards = [1, 1, 1, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 7, 8];
var lobbyID = $('#lobbyID').text();
var connection = new signalR.HubConnectionBuilder().withUrl("/hub").build();
console.log(connection);


connection.start().then(function () {
}).catch(function (err) {
    return console.error(err.toString());
});


connection.on("UserConnected", function (ConnectionId) {
    userCounter++;
    $(".enemy-cards").append("<div class='card-container c2'> <h2>" + ConnectionId + "</h2> </div >");
    connection.invoke("JoinLobby", lobbyID).catch(function (err) {
        return console.error(err.toString());
    });
});

connection.on("GameStart", function () {
    //if lobby is full
    if (userCounter === lobbySize) {
        console.log("game starting");
        allcards.sort(() => Math.random() - 0.5);
        allcards.pop();
        connection.invoke("GiveFirstCards", allcards).catch(function (err) {
            return console.error(err.toString());
        });
    }
});

connection.on("GiveCards", function (a) {
    console.log("cards given");
    console.log(a);
    allcards = a;
    if (userCounter == 4) {
        getCard(allcards[0]);
    }
    if (userCounter == 3) {
        getCard(allcards[1]);
    }
    if (userCounter == 2) {
        getCard(allcards[2]);
    }
    if (userCounter == 1) {
        getCard(allcards[3]);
    }
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



//GAMEPLAY
function getCard(cardValue) {
    console.log("here is your card");
    $(".my-cards").append("<div class='card' id=" + cardValue + ">1</div>");
}

function gameStart(lobbySize) {
    console.log(userCounter + " " + lobbySize);
    if (userCounter === lobbySize) {
        console.log("game started your usercounter=" + userCounter);

        //shuffle the deck
        allcards.sort(() => Math.random() - 0.5);
        allcards.pop();
        getCard(allcards[0]);
        allcards.shift();
    }
};


