let lobbySize = 4;
$('.card').on("click", function() {
    //$(this).addClass("moved");
    $('.card').attr('id', '');
    $(this).attr('id', 'movethis');

});

$('.pressme').on("click", function() {
    getCard(1);
});



function getCard(cardValue) {
    $('.pile-card').addClass('shift-card').delay(500).queue(function(next) {
        $(".my-cards").append("<div class='card princess' id=" + cardValue + " draggable='true' ondragstart='dragStart(event)'>" + cardValue + "</div>");
        $('.pile-card').removeClass('shift-card');
        next();
    });
}

var draggedcard;
var draggedcardtype;

function dragStart(event) {
    console.log(event.target);
    draggedcard = event.target;
    draggedcardtype = $(event.target).attr('class');
}

function dragover(event) {
    event.preventDefault();;
}

function drop(event) {
    event.preventDefault();
    var enemydeck = event.target;

    $(draggedcard).removeAttr('draggable');
    $(draggedcard).removeAttr('ondragstart');
    $(draggedcard).css('margin', '0');
    $(draggedcard).remove();
    // for enemy view
    $(enemydeck).append($(draggedcard).clone());
    //your view
    $('.deck').append(draggedcard);
}

//getCard(1);
//getCard(2);

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