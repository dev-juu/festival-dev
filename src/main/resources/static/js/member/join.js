$(function () {

    $("#email,#passwd,#passwd_confirm").keyup(function () {
        join_validate(this);
    });

    $("#email_confirm").click(function () {
        if (join_validate($("#email"))) {
            console.log("이메일 인증 넣을 부분");
        }
    });

});

/**
 * 회원가입시 이메일, 비밀번호 유효성체크
 * @param obj
 * @returns {boolean} // 이메일 인증 시에만 true 값 반환
 */
function join_validate(obj) {
    let join_type = $(obj).attr('id');
    let join_value = $("#" + join_type).val();

    switch (join_type) {
        case "email":
        case "passwd":
            if (valid_check(join_type, join_value)) { //유효성 체크 성공
                $("." + join_type + "_check").addClass("none");
                ($("#" + join_type).closest('div')).removeClass("wrong_type");
                return true;
            } else { //유효성 체크 실패
                $("." + join_type + "_check").removeClass("none");
                ($("#" + join_type).closest('div')).addClass("wrong_type");
                let alert = "";
                if (join_type == "email") {
                    alert = "이메일을 정확히 입력해주세요.";
                } else if (join_type == "passwd") {
                    alert = "비밀번호는 영문, 숫자, 특수문자 포함 8자리 이상으로 입력해주세요.";
                }
                $("." + join_type + "_check").html(alert);
                return false;
            }
            break;
        case "passwd_confirm":
            if ($("#passwd").val() == join_value) {
                $(".passwd_confirm_check").addClass('none');
                ($("#" + join_type).closest('div')).removeClass('wrong_type');
                return true;
            } else {
                $(".passwd_confirm_check").removeClass('none');
                ($("#" + join_type).closest('div')).addClass('wrong_type');
                $(".passwd_confirm_check").html('비밀번호가 일치하지 않습니다.');
                return false;
            }
            break;
    }
}

function join() {
    let agree = $("#a4:checked").length;
    let email = $("#email").val();
    let name = $("#name").val();
    let passwd = $("#passwd").val();
    let passwd_confirm = $("#passwd_confirm").val();

    if (agree == 0) {
        $(".form_alert").removeClass('none');
        $(".form_alert").html("약관 동의는 필수입니다.");
        return false;
    } else if (email == "" || name == "" || passwd == "" || passwd_confirm == "") {
        $(".form_alert").removeClass('none');
        $(".form_alert").html("빈칸을 채워주세요.");
        $(".member_txt").addClass("wrong_type");
        return false;
    } else {
        $(".form_alert").addClass("none");
    }
}