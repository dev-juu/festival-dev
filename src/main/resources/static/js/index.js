var clicked = 0; // 클릭 여러번 했을 떄 손때도 계속 넘어 가는거 방지
var slideIndex = 1;
var div_hor; // 이미지 하나가 보여지는 넓이

$(function () {
    setInterval("slide()", 3000)
});

function slide() { // 자동
    if (clicked == 0) {
        slideIndex++;
        if (slideIndex == 3) {
            slideIndex = 0;
        }
        showBanner(slideIndex);
    }
}

function moveDiv(n) { // 화살표
    if (clicked == 0) {
        showBanner(slideIndex += n);
    }
}

function clickDiv(n) { // label 클릭
    if (clicked == 0) {
        showBanner(slideIndex = n);
    }
}

function showBanner(n) {
    div_hor = $("#slide").width(); // 이미지 하나가 보여지는 넓이
    if (clicked == 0) {
        // var i;
        clicked = 1;
        var img = document.getElementsByClassName("b_img");
        if (n > img.length) { // 넘어온 값이 이미지 길이보다 길면 1로
            slideIndex = 1
        }
        if (n < 1) { // 넘어온 값이 이미지 길이보다 작으면 이미지 길이로
            slideIndex = img.length
        }
        var swip = div_hor * (slideIndex - 1) * -1;
        $(".wrap").css("transform", "translateX(" + swip + "px)");
        $(".wrap_title").css("transform", "translateX(" + swip + "px)");
        $(".dot").removeClass("select");
        $("#pos" + slideIndex).addClass("select"); // 하단버튼 체크해줌
        setTimeout(function () {
            clicked = 0;
        }, 1000);

    }

}
