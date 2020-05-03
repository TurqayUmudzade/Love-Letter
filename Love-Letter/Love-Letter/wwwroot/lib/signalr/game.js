﻿"use strict";
//USER IDENTIFICATION
let userCounter = 1;
let myconnectionID;
let enemies = new Array();
var enemyID;

//GAME VARS
let lobbySize = 4;
let thiscard;
let allcards = [1, 1, 1, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 7, 8];
let mycards = new Array();
var enemydeck;
var lobbyID = $('#lobbyID').text();
var didnotcheat;

//CONNECT TO SOCKET
var connection = new signalR.HubConnectionBuilder().withUrl("/hub").build();
console.log(connection);

connection.start().then(function () {
}).catch(function (err) {
    return console.error(err.toString());
});

//CALLER
connection.on("UserConnected", function (ConnectionId) {
    myconnectionID = ConnectionId;
    enemies.push(myconnectionID);//because the first user will send it
    connection.invoke("JoinLobby", lobbyID).catch(function (err) {
        return console.error(err.toString());
    });

});
//WHEN SOMEONE JOINS
connection.on("JoinedLobby", function (ConnectionId) {
    userCounter++;//FOR ORDER
    console.log("usercounter on join:" + userCounter);
    //get all cards
    enemies.push(ConnectionId);//user one will get all the cards
    $(".enemy-cards").append("<div class='card-container '> <h4 class='username-h4'>" + ConnectionId + "</h4>  <div class='enemy-deck' id=" + ConnectionId + " ondrop='drop(event)' ondragover='dragover(event)'></div></div >");
    if (userCounter == lobbySize) {//for user1
        //send them
        connection.invoke("SendEnemylist", lobbyID, enemies).catch(function (err) {
            return console.error(err.toString());
        });
    }

});

//recive list of opponets
connection.on("RecievEnemyList", function (enemieslist) {
    enemies = enemieslist;
    //remove yourself from list
    var index = enemies.indexOf(myconnectionID);
    if (index > -1) {
        enemies.splice(index, 1);
    }
    console.log("enemieslist:" + enemies);
    for (var i = 0; i < enemies.length; i++) {
        var c = i + 1;
        console.log(i);
        $(".enemy-cards").children('.card-container:nth-child(' + c + ')').children(".enemy-deck").attr('id', enemies[i]);
    }
});
//INVOKED BY JOIN LOBBY
connection.on("GameStart", function () {
    //if lobby is full
    if (userCounter === lobbySize) {
        //user 1 will randomize cards
        allcards.sort(() => Math.random() - 0.5);
        allcards.pop();//discard one 
        connection.invoke("GiveFirstCards", allcards, lobbyID).catch(function (err) {
            return console.error(err.toString());
        });
    }
});

//ALL
connection.on("GiveCards", function (a) {
    allcards = a;//user 1 sends shuffled deck to everyone
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
    for (let i = 0; i < lobbySize + 1; i++) {
        allcards.shift();
    }
    console.log(allcards);
});
//drag and drop
var draggedcard;
var draggedcardtype;

function dragStart(event) {
    if (userCounter == lobbySize) {
        thiscard = $(event.target).attr('id');
        didnotcheat = mycards.includes(parseInt(thiscard));
        draggedcard = event.target;
        draggedcardtype = $(event.target).attr('class');
    }

}

function dragover(event) {
    event.preventDefault();;
}

function drop(event) {
    if (userCounter == lobbySize && didnotcheat) {
        event.preventDefault();

        enemyID = $(event.target).attr("id");
        //UPDATEadd if null
        //make it undraggable
        $(draggedcard).removeAttr('draggable');
        $(draggedcard).removeAttr('ondragstart');
        $(draggedcard).css('margin', '0');
        $(draggedcard).remove();//remove from your cards
        $('.deck').append(draggedcard);
        //cardplayed->others Card move and All cardPower
        connection.invoke("CardPlayed", lobbyID, thiscard, enemyID, myconnectionID).catch(function (err) {
            return console.error(err.tostring());
        });
        //my changes
        allcards.shift();//shift mydeck
        userCounter = 1;
        var index = mycards.indexOf(parseInt(thiscard));
        if (index > -1) {
            mycards.splice(index, 1);
        }

    }

}

//othersInGroup
connection.on("CardMoved", function (card, towhom, bywho) {
    userCounter++;
    //shift my card from others
    allcards.shift();//shift others deck
    $('#' + bywho).append($("<div class='card princess' id=" + card + " >" + card + "</div>").clone());//add to enemy view that i moved
    if (userCounter == lobbySize) {
        if (typeof allcards[0] == 'undefined') {
            connection.invoke("GameOver", lobbyID).catch(function (err) {
                return console.error(err.tostring());
            });
        } else
            getCard(allcards[0]);//whoevers turn it is draws a card
    }
});

//
connection.on("CardPower", function (card, towhom, bywho) {
    //Guard
    if (card == 1) {
        console.log("guard");
    }
    if (card == 2) {
        console.log("priest");
    }
    if (card == 3) {
        console.log("baron");
        connection.invoke("Baron", lobbyID, card, towhom, bywho).catch(function (err) {
            return console.error(err.tostring());
        });
    }


});
//loops back to drag

//CARDS
connection.on("Baron", function (card, towhom, bywho) {
    let text = bywho + " attacked with " + card + " " + towhom;
    let loser;
    if (towhom == myconnectionID) {
        //win
        if (mycards[0] > card) {
            text += towhom + "wins";
            loser = bywho;
        }
        else if (mycards[0] < card) {
            text += bywho + "lost";
            iLost();
            loser = towhom;
        }
        else {
            text += " tie ";
        }
        console.log(text);
        
        connection.invoke("Result", lobbyID, text,loser).catch(function (err) {
            return console.error(err.tostring());
        });

    }
});


connection.on("Result", function (text,loser) {
    $(".modal").show();
    $(".modal-content").append("<h5 class='header'>" + text + "</h5>");
    $('#' + loser).append("<div>LOST</div>");
    if (myconnectionID == loser) {
        iLost();
    }
});

//CARDS END
connection.on("GameOver", function () {
    alert("game over");
});

connection.on("UserDisconnected", function (ConnectionId) {
    $("#userlist").append($("<li>").text(ConnectionId + "has disconnected"))
});



//GAMEPLAY
function getCard(cardValue) {
    $('.pile-card').addClass('shift-card').delay(500).queue(function (next) {
        $(".my-cards").append("<div class='card princess' id=" + cardValue + " draggable='true' ondragstart='dragStart(event)'>" + cardValue + "</div>");
        $('.pile-card').removeClass('shift-card');
        mycards.push(cardValue);
        next();
    });
}

//
function activateCard(cardValue, toWho, bywhom) {
    console.log("attack on " + toWho + "by " + bywhom);
    $(".modal").show();
    $(".modal-content").append("<h2 class='header'>" + cardValue + "</h2><p>" + bywhom + "Play by on " + toWho + "</p>");
    if (cardValue == 3)//baron
    {


    }

}


function iLost() {
    alert("you lost");
    //make my view unplayable
    $('.my-cards').children('.card ').removeAttr('draggable');
    $('.my-cards').children('.card ').removeAttr('ondragstart');
}



//VISIBILITY

$(".close").on("click", function () {
    $(this).parent().parent().hide();
});


$(".x").on("click", function () {
    $(".modal").hide();
});

$