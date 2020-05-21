"use strict";
//USER IDENTIFICATION
let userCounter = 1;
let myconnectionID;
let enemies = new Array();
var enemyID;
let unshiftcard;

const lobbySize = parseInt($('#lobby-space').text());
//GAME VARS
let thiscard;
let allcards = [1, 1, 1, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 7, 8];
//let allcards = [1, 2, 3, 4, 5, 7, 8];
let mycards = new Array();
var enemydeck;
var lobbyID = $('#lobbyID').text();
var didnotcheat;
var Lost = false;
var isProtectedH = false;
var hasCountess = false;
let mydeckPoints = 0;
let gameOver = false;
let loserCounter = 0;
//CONNECT TO SOCKET
var connection = new signalR.HubConnectionBuilder().withUrl("/hub").build();

connection.start().then(function () { }).catch(function (err) {
    return console.error(err.toString());
});

//CALLER
connection.on("UserConnected", function (ConnectionId) {
    myconnectionID = ConnectionId;
    enemies.push(myconnectionID); //because the first user will send it
    connection.invoke("JoinLobby", lobbyID).catch(function (err) {
        return console.error(err.toString());
    });

});
//WHEN SOMEONE JOINS
connection.on("JoinedLobby", function (ConnectionId) {
    userCounter++; //FOR ORDER
    //get all cards
    enemies.push(ConnectionId); //user one will get all the cards
    $(".enemy-cards").append("<div class='card-container '> <h4 class='username-h4'>" + ConnectionId + "</h4>  <div class='enemy-deck' id=" + ConnectionId + " ondrop='drop(event)' ondragover='dragover(event)'></div></div >");
    if (userCounter == lobbySize) { //for user1
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
        allcards.pop(); //discard one 
        if (lobbySize == 2) {
            allcards.pop();
            allcards.pop();
        }
        connection.invoke("GiveFirstCards", allcards, lobbyID).catch(function (err) {
            return console.error(err.toString());
        });
    }
});

//ALL
connection.on("GiveCards", function (a) {
    allcards = a; //user 1 sends shuffled deck to everyone
    if (userCounter == lobbySize) {
        getCard(allcards[0]);
        getCard(allcards[4]); //his turn
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

    if (hasCountess == true && (parseInt(thiscard) == 5 || parseInt(thiscard) == 6)) {
        alert("you cant use prince or king if you have countess ");
        return;
    }

    if (userCounter == lobbySize && didnotcheat) {
        event.preventDefault();
        if (hasCountess == true && (parseInt(thiscard) == 5 || parseInt(thiscard) == 6))
            if (isProtectedH == true) {
                isProtectedH = false;
                connection.invoke("RemoveProtection", lobbyID, myconnectionID).catch(function (err) {
                    return console.error(err.tostring());
                });
            }

        enemyID = $(event.target).attr("id");

        if (enemyID == null) {
            PopUps("Something went wrong", "danger")
            return;
        }
        if (!didnotcheat) {
            PopUps("Changed HTML ELEMENT", "danger");
            iLost();
            return;
        }
        //make it undraggable

        //make my cards on my throw undraggable
        $(draggedcard).removeAttr('draggable');
        $(draggedcard).removeAttr('ondragstart');
        $(draggedcard).css('margin', '0');
        $(draggedcard).remove(); //remove from your cards
        $('.deck').append(draggedcard);

        mydeckPoints += parseInt(thiscard);
        //restart my counter and remove that card from mycards array
        userCounter = 0;
        var index = mycards.indexOf(parseInt(thiscard));
        if (index > -1) {
            mycards.splice(index, 1);
        }
        connection.invoke("CardPower", lobbyID, thiscard, enemyID, myconnectionID, mycards[0]).catch(function (err) {
            return console.error(err.tostring());
        });
    }
}

//CALLER
connection.on("CardPower", function (card, towhom, bywho, card2) {

    //show others that i moved
    connection.invoke("CardMoved", lobbyID, card, bywho).catch(function (err) {
        return console.error(err.tostring());
    });
    //Guard
    if (card == 1) {
        $(".modal").show();
        $(".modal-content .card-text").remove();
        $(".modal-content").addClass('guard-rgba');
        $(".modal-content .close").addClass('d-none');

        var guardContent = "<div class='modal-g-cards'> <div class='d-flex justify-content-center'> <div class='card priest guard-js' id='2'></div> <div class='card baron guard-js' id='3'></div> <div class='card handmaid guard-js' id='4'></div> </div> <div class='d-flex justify-content-center'> <div class='card prince guard-js' id='5'></div> <div class='card king guard-js' id='6'> </div> <div class='card countess guard-js' id='7'></div> <div class='card princess guard-js' id='8'></div> </div> </div>";
        $(".modal-content").append(guardContent);
        $(".modal-content").addClass('guardModal');
        //CHOICE CLICK
        $('.guard-js').on("click", function () {
            var myGuess = $(this).attr('id');
            $(".modal-content").removeClass('guardModal');
            $(".modal-content").removeClass('guard-rgba');
            $(".modal-content .close").removeClass('d-none');
            $(".modal").hide();
            $(".modal-content").children(".modal-g-cards").remove();
            connection.invoke("Guard", lobbyID, towhom, bywho, myGuess).catch(function (err) {
                return console.error(err.tostring());
            });
        })
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
        isProtectedH = true;
        connection.invoke("Handmaid", lobbyID, bywho).catch(function (err) {
            return console.error(err.tostring());
        });
    }
    if (card == 5) {
        console.log("Prince");
        connection.invoke("Prince", lobbyID, card, towhom, bywho).catch(function (err) {
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
        hasCountess = false;
        let text = myconnectionID + " has used the Countess| ";
        connection.invoke("Result", lobbyID, text, "none", 7).catch(function (err) {
            return console.error(err.tostring());
        });
        connection.invoke("Next", lobbyID).catch(function (err) {
            return console.error(err.tostring());
        });
    }
    if (card == 8) {
        Lost = true;
        let text = myconnectionID + " has used the Princess| ";
        connection.invoke("Result", lobbyID, text, myconnectionID, 8).catch(function (err) {
            return console.error(err.tostring());
        });
        connection.invoke("Next", lobbyID).catch(function (err) {
            return console.error(err.tostring());
        });
    }


});

//othersInGroup
connection.on("CardMoved", function (card, bywho) {
    let cardClass = classDeterminer(card);
    $('#' + bywho).append($("<div class='card " + cardClass + " card-on-enemydeck ' id=" + card + " ></div>").clone()); //add to enemy view that i moved
});

//All
connection.on("Next", function () {
    unshiftcard = allcards[0];
    if (Lost === false) {
        userCounter++;
        if (userCounter == lobbySize) {
            if (typeof allcards[0] == 'undefined') {
                console.log("gg1");
                connection.invoke("GameOver", lobbyID).catch(function (err) {
                    return console.error(err.tostring());
                });
            } else {
                getCard(allcards[0]); //whoevers turn it is draws a card
            }
        }
    } else if (Lost == true) {
        userCounter++;
        if (userCounter == lobbySize) {
            userCounter = 0;
            //others
            connection.invoke("Next", lobbyID).catch(function (err) {
                return console.error(err.tostring());
            });
        }

    }
});

//CARDS
connection.on("Guard", function (towhom, bywho, guess) {
    if (towhom == myconnectionID) {

        let text = bywho + " guessed: " + guess + " " + towhom;
        let loser = "";
        if (mycards[0] == guess) {
            Lost = true;
            text += "|<i class='fas fa-check-circle'></i>";
            loser = myconnectionID;
        } else {
            text += "|<i class='fas fa-times-circle'></i>"
        }
        connection.invoke("Result", lobbyID, text, loser, 1).catch(function (err) {
            return console.error(err.tostring());
        });
        connection.invoke("Next", lobbyID).catch(function (err) {
            return console.error(err.tostring());
        });
    }
});
connection.on("Priest", function (card, towhom, bywho, attackercard) {
    if (towhom == myconnectionID) {
        let text = bywho + " peeked the card of" + towhom;
        connection.invoke("PriestShowCard", lobbyID, mycards[0], bywho, text).catch(function (err) {
            return console.error(err.tostring());
        });
        connection.invoke("Next", lobbyID).catch(function (err) {
            return console.error(err.tostring());
        });
    }
});

connection.on("PriestShowCard", function (card, attacker, text) {
    $(".modal-content .modal-info-content").remove();
    $(".modal").show();
    let content = "<div class='modal-info-content' >  <p class='card-text'>" + text + "</p> </div>";
    $(".modal-content").append(content);
    $(".modal-content").addClass(classDeterminer(2));
    if (attacker == myconnectionID) {
        //ISA show users card
        alert(card);
    }
});
connection.on("Baron", function (card, towhom, bywho, attackercard) {
    let text = bywho + " attacked " + towhom;
    let loser;
    if (towhom == myconnectionID) {
        console.log(mycards + "MYCARDS");
        //win
        if (mycards[0] > attackercard) {
            text += "|" + towhom + "wins";
            loser = bywho;
        } else
            if (mycards[0] < attackercard) {
                text += "|" + bywho + "wins";
                loser = towhom;
                Lost = true;
            } else {
                text += "|Draw! ";
            }
        console.log(text);

        connection.invoke("Result", lobbyID, text, loser, 3).catch(function (err) {
            return console.error(err.tostring());
        });
        connection.invoke("Next", lobbyID).catch(function (err) {
            return console.error(err.tostring());
        });
    }
});


connection.on("Handmaid", function (bywho) {

    $('#' + bywho).append("<div class='handmaidProtected' >PROTECTED</div>");
    $('#' + bywho).removeAttr('ondrop');
    $('#' + bywho).removeAttr('ondragover');

    $(".modal-content .modal-info-content").remove();
    $(".modal").show();

    let content = "<div class='modal-info-content' >  <p class='card-text'> " + bywho + " is now protected </p> </div>";
    $(".modal-content").append(content);
    $(".modal-content").addClass(classDeterminer(4));

    if (bywho == myconnectionID) {
        connection.invoke("Next", lobbyID).catch(function (err) {
            return console.error(err.tostring());
        });
    }

});

//Others
connection.on("RemoveProtection", function (user) {
    $('#' + user + " .handmaidProtected").remove();
    $('#' + user).attr("ondrop", "drop(event)");
    $('#' + user).attr("ondragover", "dragover(event)");

});

connection.on("Prince", function (card, towhom, bywho) {
    let text = bywho + " made " + towhom + " discard their card| ";
    let loser = "";
    if (towhom == myconnectionID) {

        $('.my-cards .card').remove();
        if (mycards[0] == 8) {
            iLost();
            loser = myconnectionID
        } else {
            mycards.shift();
            getCard(allcards[0]);
        }
        connection.invoke("Result", lobbyID, text, loser, 5).catch(function (err) {
            return console.error(err.tostring());
        });
        connection.invoke("Next", lobbyID).catch(function (err) {
            return console.error(err.tostring());
        });
    }
});

connection.on("King", function (card, towhom, bywho, attackercard) {
    let text = bywho + " switched cards with " + towhom;
    if (towhom == myconnectionID) {
        //remove my card view
        $('.my-cards .card').remove();
        //add king attacker card to view
        $(".my-cards").append("<div class='card " + classDeterminer(attackercard) + "' id=" + attackercard + " draggable='true' ondragstart='dragStart(event)'></div>");
        //save my old card
        var exchangecard = mycards[0];
        //update my card
        mycards[0] = attackercard;
        //sendit
        connection.invoke("ResultKing", lobbyID, text, bywho, exchangecard).catch(function (err) {
            return console.error(err.tostring());
        });
        connection.invoke("Next", lobbyID).catch(function (err) {
            return console.error(err.tostring());
        });
    }
});

//All
connection.on("Result", function (text, loser, attackCard) {
    //clean modal before it
    let info = text.split("|");

    $(".modal-content .modal-info-content").remove();
    $(".modal").show();

    let content = "<div class='modal-info-content' >  <p class='card-text'>" + info[0] + "<br>" + info[1] + " </p> </div>";
    $(".modal-content").append(content);
    $(".modal-content").addClass(classDeterminer(attackCard));
    $('#' + loser).append("<div>LOST</div>");
    $('#' + loser).removeAttr('ondrop');
    $('#' + loser).removeAttr('ondragover');
    //UPDATE add here remove droppable
    if (myconnectionID == loser) {
        iLost();
    }
});

connection.on("ResultKing", function (text, sender, returnCard) {

    $(".modal-content .modal-info-content").remove();
    $(".modal").show();

    let content = "<div class='modal-info-content' >  <p class='card-text'>" + text + " </p> </div>";
    $(".modal-content").append(content);
    $(".modal-content").addClass(classDeterminer(6));
    //UPDATE add here remove droppable

    if (myconnectionID == sender) {
        mycards[0] = returnCard;
        $('.my-cards .card').remove();
        //add king attacker card to view  
        $(".my-cards").append("<div class='card " + classDeterminer(returnCard) + " ' id=" + returnCard + " draggable='true' ondragstart='dragStart(event)'></div>");
    }
});

//CARDS END

//All
connection.on("GameOver", function () {
    gameOver = true;
    if (userCounter == 4) {
        if (Lost == false) {
            connection.invoke("RoundWinner", lobbyID, mycards[0], 1, myconnectionID).catch(function (err) {
                return console.error(err.tostring());
            });
        } else {
            connection.invoke("RoundWinner", lobbyID, 0, 1, "").catch(function (err) {
                return console.error(err.tostring());
            });
        }
    }
});

//All
connection.on("RoundWinner", function (highestCard, order, winner) {
    userCounter++;
    if (order == 4) {
        alert("highest card is" + highestCard + "the winner is" + winner);
    } else {
        if (userCounter == 4) {
            if (Lost == false) {
                if (mycards[0] > highestCard) {
                    connection.invoke("RoundWinner", lobbyID, mycards[0], order + 1, myconnectionID).catch(function (err) {
                        return console.error(err.tostring());
                    });
                } else {
                    connection.invoke("RoundWinner", lobbyID, highestCard, order + 1, winner).catch(function (err) {
                        return console.error(err.tostring());
                    });
                }
            } else if (Lost === true) {
                connection.invoke("RoundWinner", lobbyID, highestCard, order + 1, winner).catch(function (err) {
                    return console.error(err.tostring());
                });
            }
        }
    }
});


connection.on("Unshift", function () {
    allcards.unshift(unshiftcard);
});

connection.on("UserDisconnected", function (ConnectionId) {
    $("#userlist").append($("<li>").text(ConnectionId + "has disconnected"))
});



//GAMEPLAY
function getCard(cardValue) {
    $('.pile-card').addClass('shift-card').delay(500).queue(function (next) {
        var className = classDeterminer(cardValue);
        $(".my-cards").append("<div class='card " + className + "' id=" + cardValue + " draggable='true' ondragstart='dragStart(event)'></div>");
        $('.pile-card').removeClass('shift-card');
        mycards.push(cardValue);
        if (cardValue == 7) {
            hasCountess = true;
        }
        next();
    });
    connection.invoke("shiftdeck", lobbyID).catch(function (err) {
        return console.error(err.tostring());
    });

}
//All
connection.on("shiftdeck", function () {
    allcards.shift();
});

//All
connection.on("LoserCounterIncrement", function () {
    loserCounter++;
    if (loserCounter == lobbySize - 1) {
        if (Lost == false) {
            alert("you win");
        }
    }
});


function iLost() {
    PopUps("You lost", "danger");
    Lost = true;
    //make my view unplayable
    $('.my-cards').children('.card ').removeAttr('draggable');
    $('.my-cards').children('.card ').removeAttr('ondragstart');


    //discard my last card
    connection.invoke("CardMoved", lobbyID, mycards[0].toString(), myconnectionID).catch(function (err) {
        return console.error(err.tostring());
    });
    connection.invoke("LoserCounterIncrement", lobbyID).catch(function (err) {
        return console.error(err.tostring());
    });
}



//VISIBILITY

function PopUps(text, type, time) {
    if (time == undefined) {
        time = 2
    }
    var alert = "<div class='alert alert-" + type + "' role='alert'> " + text + " </div>";
    $('.alert-modal').append(alert);
    $('.alert').addClass('alert-box');
    setTimeout(() => {
        $(".alert").fadeOut('slow')
    }, time * 1000);
    setTimeout(() => {
        $(".alert").alert('close')
    }, (time * 1000) + 2000);
}

function cardInfoPopUp(cardID, type) {
    if (type == undefined) {
        type = "primary"
    }
    if (cardID == 1)
        text = "When you use the Guard, choose a player and pick a number (other than 1). If that player has that card , that player is knocked out of the round.";
    if (cardID == 2)
        text = "When you use the Priest, you can look at another player’s hand.";
    if (cardID == 3)
        text = "When you use the Baron, you and that player secretly compare your hands. The player with the lower number is knocked out of the round. In case of a tie, nothing happens.";
    if (cardID == 4)
        text = "When you use the Handmaid, you are immune to the effects of other players’ cards until the start of your next turn.";
    if (cardID == 5)
        text = "When you use the Prince, choose one player still in the round (including yourself). That player discards his or her hand ";
    if (cardID == 6)
        text = "When use the  King , trade the card in your hand with the card held by another player of your choice.";
    if (cardID == 7)
        text = "If you ever have the Countess and either the King or Prince in your hand, you must discard the Countes";
    if (cardID == 8)
        text = "If you use the Princess, you are immediately knocked out of the round";
    var alert = "<div class='alert alert-" + type + "' role='alert'> " + text + " </div>";
    $('.alert-modal').append(alert);
    $('.alert').addClass('alert-box');
}

$(".card").hover(
    function () {
        var id = $(this).attr('id');
        cardInfoPopUp(id);
    },
    function () {
        setTimeout(() => {
            $(".alert").fadeOut('slow')
        }, 1000);
        setTimeout(() => {
            $(".alert").alert('close')
        }, (1000) + 2000);
    }
);

$(".close").on("click", function () {
    $(this).parent().parent().hide();
    cleanModal();
});


$(".x").on("click", function () {
    $(".modal").hide();
});

function classDeterminer(cardValue) {
    let className;
    if (cardValue == 1)
        className = 'guard';
    if (cardValue == 2)
        className = 'priest';
    if (cardValue == 3)
        className = 'baron';
    if (cardValue == 4)
        className = 'handmaid';
    if (cardValue == 5)
        className = 'prince';
    if (cardValue == 6)
        className = 'king';
    if (cardValue == 7)
        className = 'countess';
    if (cardValue == 8)
        className = 'princess';

    return className;
}

function cleanModal() {
    for (var i = 1; i <= 8; i++) {
        $(".modal-content").removeClass(classDeterminer(i));
    }
}