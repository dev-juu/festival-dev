let _baseTime = 180;
let _Mno;
let _Timer;
$(function () {

    //keyup 유효성, 중복확인
    $("#email").keyup(function () {
        join_validate(this);
        join_overlap(this);
    });
    $("#nickname").keyup(function () {
        join_overlap(this);
    });
    $("#passwd").keyup(function () {
        join_validate(this);
    });
    $("#passwd_confirm").keyup(function () {
        if ($("#passwd").val() == $("#passwd_confirm").val()) {
            $(".passwd_confirm_check").addClass('none');
            ($("#passwd_confirm").closest('div')).removeClass('wrong_type');
            return true;
        } else {
            $(".passwd_confirm_check").removeClass('none');
            ($("#passwd_confirm").closest('div')).addClass('wrong_type');
            $(".passwd_confirm_check").html('비밀번호가 일치하지 않습니다.');
            return false;
        }
    });

    //이메일 인증하기
    $("#btn_emailConfirm").click(function () {
        if (join_validate($("#email"))) {
            let email = $("#email").val();
            let param = {"mail_address": email};
            $.ajax({
                url: "/mail/send",
                dataType: "json",
                type: "POST",
                contentType: "application/json;charset=utf-8",
                data: JSON.stringify(param),
                success: function (data) {
                    if (data.state == 200) {
                        $("#email_certification_div,#btn_reConfirm").removeClass("none");
                        $("#btn_emailConfirm").addClass("none");
                        $(".email_info").css("color", "#3494E6").html("인증번호가 발송되었습니다.<br>메일에 입력된 4자리 숫자를 입력하세요.");
                        _Timer = setInterval('certification_time()', 1000);
                        _Mno = data.result;
                    } else {
                        alert("다시 시도해주세요.");
                    }
                }, error: function (a, b, c) {
                    console.error(c);
                }, beforeSend: function () {
                    $("#btn_emailConfirm").attr("disabled", "disabled");
                }, complete: function () {
                    $("#btn_emailConfirm").removeAttr("disabled");
                }
            });
        }
    });

    $("#btn_emailCertification").click(function () {
        let email = $("#email").val();
        let certification = $("#email_certification").val();
        let param = {"mail_address": email, "mail_key": certification};
        let ajx_result = public_ajax("/mail/certification", param);
        if (ajx_result.state == 200) {
            $("#email_certification_div,#btn_emailConfirm").addClass('none');
            $(".email_info").css("color", "#3494E6").html("인증되었습니다.");
            $("#email").attr("readonly", true);
            $("#btn_reConfirm").removeClass('none');
            clearInterval(_Timer);
        } else {
            alert("다시 시도해주세요.");
        }
    });

    $("#btn_reConfirm").click(function () {
        $("#btn_emailConfirm").removeClass('none').text("인증하기").css("background-color", "#3494E6").css("color", "#fff").css("border-color", "#3494E6");
        clearInterval(_Timer);
        $("#btn_reConfirm,#email_certification_div").addClass('none');
        $(".email_info").css("color", "black").html("위 이메일로 인증번호가 발송됩니다.");
        $("#email").attr("readonly", false);
        $("#email_certification").val("");
        $("#email").val("").focus();
    });

});

function certification_time() {
    if (_baseTime > 0) {
        _baseTime--;
        let set_time = time_setting(_baseTime);
        $(".emailCertification" +
            "_time").html(set_time);
        _baseTime = _baseTime;
    } else {
        $(".emailCertification_time").html("인증시간초과").css("font-weight", "600");
        $("#email").val("");
        $("#btn_emailConfirm").removeClass('none').text("인증하기").css("background-color", "#3494E6").css("color", "#fff").css("border-color", "#3494E6");
        $(".email_info").css("color", "black").html("위 이메일로 인증번호가 발송됩니다.");
        let param = {
            "mail_no": _Mno,
            "mail_state": 2
        };
        public_ajax("/mail/update", param);
        clearInterval(_Timer);
    }
}

//시간 형식 지정
function time_setting(time) {
    let hour;
    let min;
    let sec;
    hour = Math.floor(time / 3600);
    min = Math.floor((time - (hour * 3600)) / 60);
    sec = time - (hour * 3600) - (min * 60);

    if (hour < 10) hour = "0" + hour;
    if (min < 10) min = "0" + min;
    if (sec < 10) sec = "0" + sec;
    if (hour > 0) {
        result = hour + ":" + min + ":" + sec;
    } else {
        result = min + ":" + sec;
    }
    return result;
}

function join_validate(obj) {
    let join_type = $(obj).attr("id");
    let join_value = $("#" + join_type).val();
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
}

function join_overlap(obj) {
    let result;
    let join_type = $(obj).attr("id");
    let join_value = $("#" + join_type).val();
    let param = {"type": join_type, "value": join_value};
    let ajx_result = public_ajax("/member/overlap", param);
    if (ajx_result.state == 200 && ajx_result.result != 0) {
        $("." + join_type + "_check").removeClass('none');
        let text = (join_type == "email") ? '이메일' : '닉네임'
        $("." + join_type + "_check").html("이미 사용중인 " + text + "입니다.");
        result = false;
    } else if (ajx_result.state == 200 && ajx_result.result == 0) {
        $(".nickname_check").addClass('none');
        result = true;
    }
    return result;
}

function join() {
    let agree = $("#a4:checked").length;
    let mem_email = $("#email").val();
    let mem_passwd = $("#passwd").val();
    let mem_passwd_ck = $("#passwd_confirm").val();
    let mem_nickname = $("#nickname").val();
    let mem_key = $("#email_certification").val();
    if (agree == 0) {
        $(".form_alert").removeClass('none');
        $(".form_alert").html("약관 동의는 필수입니다.");
        return false;
    } else if (mem_email == "" || mem_passwd == "" || mem_passwd_ck == "") {
        $(".form_alert").removeClass('none');
        $(".form_alert").html("빈칸을 채워주세요.");
        $(".member_txt").addClass("wrong_type");
        return false;
    } else if (!join_overlap($("#email")) || !join_overlap($("#nickname"))) {
        $(".form_alert").removeClass('none');
        $(".form_alert").html("중복된 아이디나 닉네임은 사용할 수 없습니다.");
    } else {
        $(".form_alert").addClass("none");
        let emailConfirm_param = {
            "mail_address": mem_email,
            "mail_key": mem_key,
            "mail_state": 1
        }
        let ajx_result_emailConfirm = public_ajax("/mail/certification", emailConfirm_param);
        let count = (!(ajx_result_emailConfirm.result)) ? null : (ajx_result_emailConfirm.result)["count(*)"];
        if (count > 0) {
            let join_param = {
                "mem_email": mem_email,
                "mem_passwd": mem_passwd,
                "mem_nickname": mem_nickname
            };
            let ajx_result_join = public_ajax("/member/join", join_param);
            if (ajx_result_join.state == 200) {
                location.href = "/member/login";
                alert("반가워요! 로그인 해주세요 :)");
            } else {
                alert("죄송해요 :( 다시 시도해주세요.");
            }
        } else {
            alert("이메일 인증을 완료해주세요.");
            $("#email").focus();
            return false;
        }
    }
}