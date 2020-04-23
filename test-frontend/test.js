$('.card').on("click", function() {
    //$(this).addClass("moved");
    $('.card').attr('id', '');
    $(this).attr('id', 'movethis');

});

$('.pressme').on("click", function() {

    $("#userlist").append($("<li>").text("User x joined"));
});

var lobbyID = $('#lobbyID').text();
console.log(lobbyID);