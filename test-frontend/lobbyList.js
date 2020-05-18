$('.js-cr-lobby').on('click', function() {
    $(this).hide();
    $('.create-lobby').removeClass("d-none");

});

$('.js-private-checkbox').change(function() {
    if (this.checked) {
        $('.js-pswd').attr("disabled", false);
    }
});