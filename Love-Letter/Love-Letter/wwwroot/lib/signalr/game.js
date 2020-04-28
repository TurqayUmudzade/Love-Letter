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
    connection.invoke("JoinLobby", lobbyID).catch(function (err) {
        return console.error(err.toString());
    });
});

connection.on("JoinedLobby", function (ConnectionId) {
    console.log("JoinedLobby " + ConnectionId)
    userCounter++;
    console.log(userCounter);
    $(".enemy-cards").append("<div class='card-container c2'> <h2>" + ConnectionId + "</h2> </div >");
});


connection.on("GameStart", function () {
    //if lobby is full
    if (userCounter === lobbySize) {
        console.log("game starting");
        allcards.sort(() => Math.random() - 0.5);
        allcards.pop();
        connection.invoke("GiveFirstCards", allcards, lobbyID).catch(function (err) {
            return console.error(err.toString());
        });
    }
});

function Myturn() {
    if (userCounter == 4) {
        getCard(allcards[0]);
        alert("your turn");
    }
    allcard.shift();
}

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
    for (let i = 0; i < lobbySize; i++) {
        allcards.shift();
    }

});

connection.on("UserDisconnected", function (ConnectionId) {
    $("#userlist").append($("<li>").text(ConnectionId + "has disconnected"))
});


connection.on("CardMoved", function (id) {
    userCounter++;
    $('#' + id).addClass("moved");
});


$('.card').on("click", function () {
    if (userCounter == 4) {
        connection.invoke("MoveLobbyCard", id, lobbyID).catch(function (err) {
            return console.error(err.toString());
        });
        userCounter = 0;

    }
    connection.invoke("cardplusone", id, lobbyID).catch(function (err) {
        return console.error(err.toString());
    });
    var id = $(this).attr("id");
  
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


