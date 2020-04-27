$('.card').on("click", function() {
    //$(this).addClass("moved");
    $('.card').attr('id', '');
    $(this).attr('id', 'movethis');

});

$('.pressme').on("click", function() {
    let username = "use1"
        //  $(".enemy-cards").append($("<div class='card-container c2'>  </div >")).append($("<h2>"));
    $(".enemy-cards").append("<div class='card-container c2'> <h2>" + username + "</h2> </div >");
});

var lobbyID = $('#lobbyID').text();
console.log(lobbyID);