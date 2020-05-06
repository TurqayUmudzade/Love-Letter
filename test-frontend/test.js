let lobbySize = 4;
$('.card').on("click", function() {
    //$(this).addClass("moved");
    $('.card').attr('id', '');
    $(this).attr('id', 'movethis');

});
getCard(1);
$('.pressme').on("click", function() {
    $('.my-cards .card').remove();
});

$('#myModal').on('shown.bs.modal', function() {
    // $('#exampleModal').trigger('focus')
})



function getCard(cardValue) {
    $('.pile-card').addClass('shift-card').delay(500).queue(function(next) {
        $(".my-cards").append("<div class='card' id=" + cardValue + " draggable='true' ondragstart='dragStart(event)'>" + cardValue + "</div>");
        $('.pile-card').removeClass('shift-card');
        next();
    });
}

// $(".modal").show();
// $(".modal-content").children("modal-content").remove();
// var guardContent = "<div class='modal-g-cards'> <div class='d-flex justify-content-center'> <div class='card guard-js' id='1'></div> <div class='card guard-js' id='2'></div> <div class='card guard-js' id='3'></div> <div class='card guard-js' id='4'></div> </div> <div class='d-flex justify-content-center'> <div class='card guard-js' id='5'></div> <div class='card guard-js' id='6'> </div> <div class='card guard-js' id='7'></div> <div class='card guard-js' id='8'></div> </div> </div>";
// $(".modal-content").append(guardContent);
// $(".modal-content").addClass('guardModal');
// $('.guard-js').on("click", function() {
//     var value = $(this).attr('id');
//     $(".modal-content").removeClass('guardModal');
//     $(".modal").hide();
//     $(".modal-content").children(".modal-g-cards").remove();
// })

let enemies = new Array();

function addenemies(randomshit1, randomshit2, randomshit3) {
    enemies.push(randomshit1);
    enemies.push(randomshit2);
    enemies.push(randomshit3);
}
// addenemies("dsada1", "dsadas2", "dsadads3")
//     //
// const array = ["sa2", "sa3", "sa4"];
// $('#salam').append($("<div class='card princess' id=" + 1 + " >" + 1 + "</div>").clone()); //add to enemy view that i moved

// // const index = array.indexOf("sa2");
// // if (index > -1) {
// //     array.splice(index, 1);
// // }
// // towhom = "salam";
// //$('#' + towhom).append($("<h1>SDADAS</h1>").clone());
// for (var i = 0; i < array.length; i++) {
//     var c = i + 1;
//     $(".enemy-cards").children('.card-container:nth-child(' + c + ')').children(".enemy-deck").attr('id', array[i]);
// }

//$(".enemy-cards").children(".card-container").children(".enemy-deck").attr('id', 'value');
// var test = $(".enemy-cards").children(".card-container");
// console.log(test);
// test.forEach(element => {
//     element.children(".enemy-deck").attr('id', '1');
// });
// array = [2, 9]

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
    console.log(enemydeck);
    console.log(enemydeck.length);
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


});

var user = "GG7JgsUVa1tdZTu7vOiCRg";
$('#' + user + " .handmaidProtected").remove();
$('#' + user).attr("ondrop", "drop(event)");
$('#' + user).attr("ondragover", "dragover(event)");

function test() {
    console.log(test);
    $('.mycards .card').remove();
}