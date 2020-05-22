"use strict";

var hasCountess = false;
var Lost = false
var isProtectedH = false;

//CALLER
//connection.on("CardPower", function (card, towhom, bywho, card2) {
function caller(card){
    //show others that i moved
   // connection.invoke("CardMoved", lobbyID, card, bywho).catch(function (err) {
      //  return console.error(err.tostring());
    //});
    //Guard
    if (card == 1) {
      /*  $(".modal").show();
        $(".modal-content .card-text").remove();
        $(".modal-content").addClass('guard-rgba');
        $(".modal-content .close").addClass('d-none');
     */
        var guardContent = "<div class='modal-g-cards'> <div class='d-flex justify-content-center'> <div class='card priest guard-js' id='2'></div> <div class='card baron guard-js' id='3'></div> <div class='card handmaid guard-js' id='4'></div> </div> <div class='d-flex justify-content-center'> <div class='card prince guard-js' id='5'></div> <div class='card king guard-js' id='6'> </div> <div class='card countess guard-js' id='7'></div> <div class='card princess guard-js' id='8'></div> </div> </div>";
       // $(".modal-content").append(guardContent);
        //$(".modal-content").addClass('guardModal');
        //CHOICE CLICK
      /*  $('.guard-js').on("click", function () {
            var myGuess = $(this).attr('id');
            $(".modal-content").removeClass('guardModal');
            $(".modal-content").removeClass('guard-rgba');
            $(".modal-content .close").removeClass('d-none');
            $(".modal").hide();
            $(".modal-content").children(".modal-g-cards").remove();
            connection.invoke("Guard", lobbyID, towhom, bywho, myGuess).catch(function (err) {
                return console.error(err.tostring());
            }); */
       // })
    }
    if (card == 2) {
        console.log("Priest");
       /* connection.invoke("Priest", lobbyID, card, towhom, bywho, card2).catch(function (err) {
            return console.error(err.tostring());
        }); */
    }
    if (card == 3) {
        console.log("baron");
       /* connection.invoke("Baron", lobbyID, card, towhom, bywho, card2).catch(function (err) {
            return console.error(err.tostring());
        }); */
    }
    if (card == 4) {
        isProtectedH = true;
       /* connection.invoke("Handmaid", lobbyID, bywho).catch(function (err) {
            return console.error(err.tostring());
        }); */
    }
    if (card == 5) {
        console.log("Prince");
       /* connection.invoke("Prince", lobbyID, card, towhom, bywho).catch(function (err) {
            return console.error(err.tostring());
        }); */
    }
    if (card == 6) {
        console.log("King");
       /* connection.invoke("King", lobbyID, card, towhom, bywho, card2).catch(function (err) {
            return console.error(err.tostring());
        }); */
    }
    if (card == 7) {
        hasCountess = false;
       // let text = myconnectionID + " has used the Countess| ";
       /* connection.invoke("Result", lobbyID, text, "none", 7).catch(function (err) {
            return console.error(err.tostring());
        });
        connection.invoke("Next", lobbyID).catch(function (err) {
            return console.error(err.tostring());
        }); */ 
    }
    if (card == 8) {
        Lost = true;
        //let text = myconnectionID + " has used the Princess| ";
      //  connection.invoke("Result", lobbyID, text, myconnectionID, 8).catch(function (err) {
        //    return console.error(err.tostring());
       // });
       // connection.invoke("Next", lobbyID).catch(function (err) {
         //   return console.error(err.tostring());
        //});
    }
}


caller(8)

if(Lost!=true)
throw new Error ('Check fail: Error1');
else
console.log("Everything works 1")

caller(4)

if(isProtectedH!=true)
throw new Error ('Check fail: Error2');
else
console.log("Everything works 2")
