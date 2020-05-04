"use strict";
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
var Lost = false;

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
        console.log(allcards);
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
    for (let i = 0; i < lobbySize; i++) {
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
        if (enemyID)
        //UPDATEadd if null
        //make it undraggable
        $(draggedcard).removeAttr('draggable');
        $(draggedcard).removeAttr('ondragstart');
        $(draggedcard).css('margin', '0');
        $(draggedcard).remove();//remove from your cards
        $('.deck').append(draggedcard);
        //my changes
        /*  allcards.shift();//shift mydeck
          userCounter = 1;*/
        userCounter = 0;
        console.log("counter reset");
        var index = mycards.indexOf(parseInt(thiscard));
        if (index > -1) {
            mycards.splice(index, 1);
        }
        //cardplayed->others CardMove and All cardPower
        connection.invoke("CardPower", lobbyID, thiscard, enemyID, myconnectionID, mycards[0]).catch(function (err) {
            return console.error(err.tostring());
        });


    }

}


//CALLER
connection.on("CardPower", function (card, towhom, bywho, card2) {

    connection.invoke("CardMoved", lobbyID, card, bywho).catch(function (err) {
        return console.error(err.tostring());
    });
    //Guard
    if (card == 1) {
        console.log("Guard");
        connection.invoke("Guard", lobbyID, card, towhom, bywho, card2).catch(function (err) {
            return console.error(err.tostring());
        });
    }
    if (card == 2) {
        console.log("Priest");
        connection.invoke("Priest", lobbyID, card, towhom, bywho, card2).catch(function (err) {
            return console.error(err.tostring());
        });
    }
    if (card == 3) {
        console.log("baron");
        connection.invoke("Baron", lobbyID, card, towhom, bywho, card2).catch(function (err) {
            return console.error(err.tostring());
        });
    }
    if (card == 4) {
        console.log("Handmaid");
        connection.invoke("Handmaid", lobbyID, card, towhom, bywho, card2).catch(function (err) {
            return console.error(err.tostring());
        });
    }
    if (card == 5) {
        console.log("Prince");
        connection.invoke("Prince", lobbyID, card, towhom, bywho, card2).catch(function (err) {
            return console.error(err.tostring());
        });
    }
    if (card == 6) {
        console.log("King");
        connection.invoke("King", lobbyID, card, towhom, bywho, card2).catch(function (err) {
            return console.error(err.tostring());
        });
    }
    if (card == 7) {
        console.log("Countess");
        connection.invoke("Countess", lobbyID, card, towhom, bywho, card2).catch(function (err) {
            return console.error(err.tostring());
        });
    }
    if (card == 8) {
        console.log("Princess");
        connection.invoke("Princess", lobbyID, card, towhom, bywho, card2).catch(function (err) {
            return console.error(err.tostring());
        });
    }


});
//loops back to drag

//othersInGroup
connection.on("CardMoved", function (card, bywho) {
    $('#' + bywho).append($("<div class='card princess card-on-enemydeck ' id=" + card + " >" + card + "</div>").clone());//add to enemy view that i moved
});

//All
connection.on("Next", function () {
    userCounter++;
    allcards.shift();

    if (Lost == false) {
        if (userCounter == lobbySize) {
            console.log("your turn");
            if (typeof allcards[0] == 'undefined') {

                console.log("game over");
                connection.invoke("GameOver", lobbyID).catch(function (err) {
                    return console.error(err.tostring());
                });
            }
            else {
                console.log("get card");
                console.log(userCounter);
                getCard(allcards[0]);//whoevers turn it is draws a card
            }
        }
    }
    else if (Lost == true) {
        if (userCounter == lobbySize) 
        {
            userCounter = 1;
            console.log("lost true")
            connection.invoke("Next", lobbyID).catch(function (err) {
                return console.error(err.tostring());
            });
        }
    }
});






//CARDS
connection.on("Guard", function (card, towhom, bywho, attackercard) {
    console.log("send to" + towhom + "and youre " + myconnectionID);
    if (towhom == myconnectionID) {
        console.log("me");
        connection.invoke("Next", lobbyID).catch(function (err) {
            return console.error(err.tostring());
        });
    }

});
connection.on("Priest", function (card, towhom, bywho, attackercard) {
    console.log("send to" + towhom + "and youre " + myconnectionID);
    if (towhom == myconnectionID) {
        console.log("me");
        connection.invoke("Next", lobbyID).catch(function (err) {
            return console.error(err.tostring());
        });
    }
});
connection.on("Baron", function (card, towhom, bywho, attackercard) {
    let text = bywho + " attacked with " + card + " " + towhom;
    let loser;
    if (towhom == myconnectionID) {
        //win
        if (mycards[0] > attackercard) {
            text += towhom + "wins";
            loser = bywho;
        }
        else if (mycards[0] < attackercard) {
            text += bywho + "lost";
            loser = towhom;
            Lost = true;
        }
        else {
            text += " tie ";
        }
        console.log(text);

        connection.invoke("Result", lobbyID, text, loser).catch(function (err) {
            return console.error(err.tostring());
        });
        connection.invoke("Next", lobbyID).catch(function (err) {
            return console.error(err.tostring());
        });
    }
});


connection.on("Handmaid", function (card, towhom, bywho, attackercard) {
    console.log("card:" + card + "atackerscard" + attackercard + "send to" + towhom + "and youre " + myconnectionID);
    if (towhom == myconnectionID) {
        console.log("me");
        connection.invoke("Next", lobbyID).catch(function (err) {
            return console.error(err.tostring());
        });
    }

});

connection.on("Prince", function (card, towhom, bywho, attackercard) {
    console.log("send to" + towhom + "and youre " + myconnectionID);
    if (towhom == myconnectionID) {
        console.log("me");
        connection.invoke("Next", lobbyID).catch(function (err) {
            return console.error(err.tostring());
        });
    }
});

connection.on("King", function (card, towhom, bywho, attackercard) {
    console.log("send to" + towhom + "and youre " + myconnectionID);
    if (towhom == myconnectionID) {
        console.log("me");
        connection.invoke("Next", lobbyID).catch(function (err) {
            return console.error(err.tostring());
        });
    }
});

connection.on("Countess", function (card, towhom, bywho, attackercard) {
    console.log("send to" + towhom + "and youre " + myconnectionID);
    if (towhom == myconnectionID) {
        console.log("me");
        connection.invoke("Next", lobbyID).catch(function (err) {
            return console.error(err.tostring());
        });
    }
});

connection.on("Princess", function (card, towhom, bywho, attackercard) {
    console.log("send to" + towhom + "and youre " + myconnectionID);
    if (towhom == myconnectionID) {
        console.log("me");
        connection.invoke("Next", lobbyID).catch(function (err) {
            return console.error(err.tostring());
        });
    }
});





//
connection.on("Result", function (text, loser) {
    $(".modal").show();
    $(".modal-content").append("<h5 class='header'>" + text + "</h5>");
    $('#' + loser).append("<div>LOST</div>");
    $('#' + loser).removeAttr('ondrop');
    $('#' + loser).removeAttr('ondragover');
    //UPDATE add here remove droppable
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

function skip() {
    connection.invoke("Skip", lobbyID).catch(function (err) {
        return console.error(err.tostring());
    });
}

connection.on("Skipped", function () {
    userCounter++;
    if (userCounter == lobbySize) {
        getCard(allcards[0]);
    }
    console.log("skipped");
});

function iLost() {
    alert("you lost");
    /*Lost = true;
    userCounter = 5;*/
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