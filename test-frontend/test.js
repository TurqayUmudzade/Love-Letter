let lobbySize = 4;
$('.card').on("click", function() {
    //$(this).addClass("moved");
    $('.card').attr('id', '');
    $(this).attr('id', 'movethis');

});

$('.pressme').on("click", function() {
    getCard();
});


var lobbyID = $('#lobbyID').text();
console.log(lobbyID);



function getCard(cardValue) {
    $(".my-cards").append("<div class='card' id=" + cardValue + ">1</div>");
}

var userCounter = 4;


function gameStart(lobbySize) {
    console.log(userCounter + " and lobbysize: " + lobbySize);
    if (userCounter == lobbySize) {
        console.log("game started your usercounter=" + userCounter);
        allcards = [1, 1, 1, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 7, 8];
        //shuffle the deck
        console.log(allcards);
        allcards.sort(() => Math.random() - 0.5);
        allcards.pop();
        getCard(allcards[0]);
        allcards.shift();
    }
};
//gameStart(lobbySize);
console.log(allcards);