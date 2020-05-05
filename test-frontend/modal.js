$(".close").on("click", function() {
    $(this).parent().parent().hide();
});

$(".btn").on("click", function() {
    $(".modal").show();
});

$(".x").on("click", function() {
    $(".modal").hide();
});