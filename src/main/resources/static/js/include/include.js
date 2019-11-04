let $window = $(window);
let $document = $(document);
let url = location.href;
let result = null;

$(function () {
    let cookie = getCookie('_fid');
    (cookie == null) ? $(".login").removeClass("none") : $(".logout").removeClass("none");
    let window_height = $window.height();
    let doc_height = $(document).height() - $(".footer_").height();
    if (doc_height < window_height) {
        $(".footer_").css('position', 'fixed');
    }
    header_select();

    // mobile_footer();

});

// function mobile_footer() {
//     if (matchMedia("screen and (max-width: 768)").matches) {
//         $window.on('scroll', function () {
//             // 현재의 위치 = 스크롤이 이동한 값 + 윈도우 높이 - 처음에 선언한 지연 위치값(200);
//             console.log("윈도우 높이" + ($document.height() - $window.height()));
//             console.log("스크롤 높이" + window.scrollY);
//         });
//     }
//     // transition: top 0.2s ease-in-out;
// }

function getCookie(name) {
    let value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return value ? value[2] : null;
}

function get_parameter(param) {
    let parameters = (url.slice(url.indexOf('?') + 1, url.length)).split('&');
    for (let i = 0; i < parameters.length; i++) {
        let varName = parameters[i].split('=')[0];
        if (varName.toUpperCase() == param.toUpperCase()) {
            let varValue = parameters[i].split('=')[1];
            return decodeURIComponent(varValue);
        }
    }
}

function valid_check(type, value) {
    let exp = '';
    switch (type) {
        case "phone":
            exp = '';
            break;
        case "email":
            exp = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
            break;
        case "passwd":
            exp = /^(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9])(?=.*[0-9]).{8,16}$/;
            break;
    }
    if (exp.test(value)) {
        return true;
    } else {
        return false;
    }
}

function header_select() {
    if (url.indexOf("/festival/info") != -1) {
        $(".tab_festival").css("color", "#3494E6");
    } else if (url.indexOf("/timeline/timeline") != -1) {
        $(".tab_timeline").css("color", "#3494E6");
    }
}

function public_ajax(url, param = '') {
    let result;
    $.ajax({
        url: url,
        dataType: "json",
        type: "POST",
        contentType: 'application/json;charset=utf-8', // 추가
        async: false,
        data: JSON.stringify(param),
        success: function (data) {
            if (data.state == 200 || data.state == 400) {
                result = data;
            } else {
                console.error(data.message);
                result = false;
            }
        }, error: function (a, b, c) {
            console.error(c);
            result = false;
        }
    });
    return result;
}