var url = location.href;
var result = null;

$(function () {
    var window_height = $(window).height();
    var doc_height = $(document).height() - $(".footer_").height();
    if (doc_height < window_height) {
        $(".footer_").css('position', 'fixed');
    }
    header_select();
});

function get_parameter(param) {
    var parameters = (url.slice(url.indexOf('?') + 1, url.length)).split('&');
    for (var i = 0; i < parameters.length; i++) {
        var varName = parameters[i].split('=')[0];
        if (varName.toUpperCase() == param.toUpperCase()) {
            var varValue = parameters[i].split('=')[1];
            return decodeURIComponent(varValue);
        }
    }
}

function valid_check(type, value) {
    var exp = '';
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