$(function () {

    $("#email").keyup(function () {
        if (valid_check('email', $(this).val())) {
            $(".email_check").addClass('none');
            $(this).removeClass('wrong_type');
        } else {
            $(".email_check").removeClass('none');
            $(this).addClass('wrong_type');
            $(".email_check").html('이메일을 정확히 입력해주세요.');
        }
    });

});

function login() {
    var email = $("#email").val();
    var passwd = $("#passwd").val();

    if (email == "" || !valid_check('email', email) || passwd == "") {
        $(".member_txt").addClass('wrong_type');
        $(".passwd_check").removeClass("none");
        $(".passwd_check").html("FASTival에 등록되지 않은 아이디거나, 아이디 또는 비밀번호가 회원정보와 일치하지 않습니다.");
    } else {
        $(".member_txt").removeClass('wrong_type');
        $(".passwd_check").addClass("none");
        // 하단부분 추가 [muzi]
        var ajax_url = "/member/login";
        var param = {"mem_email": email, "mem_passwd":passwd};
        var result = public_ajax(ajax_url, param);
        if(result.state==200){
            location.href = "/";
        }else if(result.state==400){
            alert("아이디 혹은 비밀번호가 일치하지 않습니다.");
        }
    }
}

