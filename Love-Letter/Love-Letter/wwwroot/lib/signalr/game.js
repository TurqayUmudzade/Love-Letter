"use strict";
let userCounter = 1;
let lobbySize = 4;
let allcards = [1, 1, 1, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 7, 8];
let mycards = new Array();
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
    userCounter++;
    console.log(userCounter);
    $(".enemy-cards").append("<div class='card-container '> <h4 class='username-h4'>" + ConnectionId + "</h4>  <div class='enemy-deck' ondrop='drop(event)' ondragover='dragover(event)'></div></div >");

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


connection.on("GiveCards", function (a) {
    allcards = a;
    if (userCounter == lobbySize) {
        getCard(allcards[0]);
        getCard(allcards[4]);//his turn
    }
    if (userCounter == lobbySize - 1) {
        getCard(allcards[1]);
    }
    if (userCounter == lobbySize - 2) {
        getCard(allcards[2]);
    }
    if (userCounter == lobbySize - 3) {
        getCard(allcards[3]);
    }
    for (let i = 0; i < lobbySize+1; i++) {
        allcards.shift();
    }
    console.log(allcards);
    $('.card').on("click", function () {
        if (userCounter == 4) {
            let thiscard = $(this).attr('id');
            if (mycards.includes(parseInt(thiscard))) {
                userCounter = 1;
                connection.invoke("PlayCard", thiscard, lobbyID).catch(function (err) {
                    return console.error(err.toString());
                });
            }

        } else
            console.log("not your trun");
    });
});


connection.on("CardMoved", function (thiscard) {
    userCounter++;
    console.log(userCounter);
});


connection.on("UserDisconnected", function (ConnectionId) {
    $("#userlist").append($("<li>").text(ConnectionId + "has disconnected"))
});



//GAMEPLAY
function getCard(cardValue) {
    console.log("here is your card");
    $(".my-cards").append("<div class='card' id=" + cardValue + ">1</div>");
    mycards.push(cardValue);
}




