let lobbySize = 4;
$('.card').on("click", function() {
    //$(this).addClass("moved");
    $('.card').attr('id', '');
    $(this).attr('id', 'movethis');

});

$('.pressme').on("click", function() {
    getCard();
});



function getCard(cardValue) {
    $(".my-cards").append("<div class='card' id=" + cardValue + ">1</div>");
}
getCard(1);
getCard(2);

let userCounter = 4;

let allcards = [1, 1, 1, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 7, 8];
allcards.sort(() => Math.random() - 0.5);
allcards.pop();

let mycards = new Array();
mycards.push(1);
mycards.push(3);
$('.card').on("click", function() {
    let thiscard = $(this).attr('id')

    if (mycards.includes(parseInt(thiscard))) {
        console.log("nice");
    }

});

$(document).ready(function() {
    $('.card').on("click", function() {
        console.log("breakpoint1");
        if (userCounter == 4) {
            console.log("breakpoint1");
            let thiscard = $(this).attr('id');
            if (mycards.includes(parseInt(thiscard))) {
                console.log("breakpoint1");
                userCounter = 1;
                console.log("you played card");
                connection.invoke("PlayCard", thiscard, lobbyID).catch(function(err) {
                    return console.error(err.toString());
                });
            } else


        } else
            console.log("not your trun");

    });
});