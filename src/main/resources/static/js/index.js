var auto_no = 0;
var drag = false;

$(function () {
    setInterval("slide()", 3000);
});

function slide() {
    auto_no++;
    if (auto_no == 3) {
        auto_no = 0;
    }
    click_slide(auto_no);
}

function click_slide(clk_no) {
    clk_no = Number(clk_no);
    $("#pos" + (clk_no)).prop("checked", true);
    $(".wrap").animate({"left": -clk_no * $(window).width()}, 300);
    $(".wrap_title").animate({"left": -clk_no * $(window).width()}, 300);
    auto_no = clk_no;
}

function click_arrow(type) {
    var current = ($("[name='pos']:checked").attr("id")).split("pos");
    current = current[1];
    current = Number(current) + Number(type);
    if (type == 1) {
        if (current == 3) {
            current = 0;
        }
    } else if (type == -1) {
        if (current == -1) {
            current = 2;
        }
    }
    click_slide(current);
}
