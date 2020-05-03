$(".close").on("click", function() {
    $(this).parent().parent().hide();
});

$(".btn").on("click", function() {
    $(".modal").show();
});

$(".x").on("click", function() {
    $(".modal").hide();
});

$(".modal-content").append("<h2 class='header'>CarddVaue</h2><p>Play by on </p>");