"use strict";
let userCounter = 1;
let lobbySize = 4;
let thiscard;
let allcards = [1, 1, 1, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 7, 8];
let mycards = new Array();
var enemydeck;
var lobbyID = $('#lobbyID').text();
var didnotcheat;
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
    for (let i = 0; i < lobbySize + 1; i++) {
        allcards.shift();
    }
    console.log(allcards);
    /*  $('.card').on("click", function () {
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
      });*/
});
//drag and drop
var draggedcard;
var draggedcardtype;

function dragStart(event) {
    if (userCounter == 4) {
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
    if (userCounter == 4 && didnotcheat) {
        event.preventDefault();

        $(draggedcard).removeAttr('draggable');
        $(draggedcard).removeAttr('ondragstart');
        $(draggedcard).css('margin', '0');
        $(draggedcard).remove();
        // for enemy view
        //$(enemydeck).append($(draggedcard).clone());
        //your view
        $('.deck').append(draggedcard);
        connection.invoke("CardPlayed", thiscard, lobbyID).catch(function (err) {
            return console.error(err.tostring());
        });
        allcards.shift();
        userCounter = 1;
        console.log("usercounte reset");
    }

}


connection.on("CardMoved", function (enemydeck, thiscard) {
    userCounter++;
    allcards.shift();
    console.log(userCounter);
    $(enemydeck).append($(thiscard).clone());
    if (userCounter == 4) {
        getCard(allcards[0]);
    }
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




