"use strict";

var hasCountess = false;
//GAMEPLAY
function getCard(cardValue) {
   // $('.pile-card').addClass('shift-card').delay(500).queue(function (next) {
       // var className = classDeterminer(cardValue);
  //      $(".my-cards").append("<div class='card " + className + "' id=" + cardValue + " draggable='true' ondragstart='dragStart(event)'></div>");
     //   $('.pile-card').removeClass('shift-card');
    //    mycards.push(cardValue);
        if (cardValue == 7) {
            hasCountess = true;
        }
       // next();
   // });
   // connection.invoke("shiftdeck", lobbyID).catch(function (err) {
     //   return console.error(err.tostring());
    //});

}

getCard(7)

if(hasCountess!==true){
throw new Error ('Check fail: Error');
}
else 
return console.log("Everything works")
