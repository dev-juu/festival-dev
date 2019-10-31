$(function () {
    select_button();
})

function select_button() {
    $(".btn_tab").click(function () {
        $(".btn_tab").removeClass("btn_selected");
        var selected = $(this).attr('id');
        // console.log(selected);
        $("#"+selected).addClass("btn_selected");
    })
}

function scroll_focus(id) {
    var scrollPosition = $("#"+id).offset().top;
    $('html,body').animate({
        scrollTop: scrollPosition
    }, 500);
}

