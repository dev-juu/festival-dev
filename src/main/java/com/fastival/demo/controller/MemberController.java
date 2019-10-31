package com.fastival.demo.controller;

import com.fastival.demo.model.dto.MemberDTO;
import com.fastival.demo.service.MemberService;
import com.fastival.demo.util.CommonUntil;
import com.fastival.demo.util.CustomReturn;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.stereotype.Controller;

import javax.inject.Inject;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;

@Controller
@RequestMapping("/member/*")
public class MemberController {

    @Inject
    MemberService memberService;

    @RequestMapping("login")
    public String view_login() {
        return "member/login";
    }

    @RequestMapping("join")
    public String view_join() {
        return "member/join";
    }

    @RequestMapping(value = "join", method = RequestMethod.POST)
    public ResponseEntity<?> create_join(@RequestBody MemberDTO dto) {
        String mem_email = dto.getMem_email();
        String mem_passwd = dto.getMem_passwd();
        String mem_nickname = dto.getMem_nickname();
        if (CommonUntil.isEmpty(mem_email) || CommonUntil.isEmpty(mem_passwd) || CommonUntil.isEmpty(mem_nickname)) {
            return new ResponseEntity(new CustomReturn(400, "[join] Null Point Exception.", null), HttpStatus.NOT_FOUND);
        } else {
            memberService.join(dto);
            return new ResponseEntity(new CustomReturn(200, "Membership success.", null), HttpStatus.OK);
        }
    }

    @RequestMapping(value = "login", method = RequestMethod.POST)
    public ResponseEntity<?> create_login_token(@RequestBody MemberDTO dto, HttpServletResponse response) {
        String mem_email = dto.getMem_email();
        String mem_passwd = dto.getMem_passwd();
        if (CommonUntil.isEmpty(mem_email) || CommonUntil.isEmpty(mem_passwd)) {
            return new ResponseEntity(new CustomReturn(400, "[login] Null Point Exception.", null), HttpStatus.NOT_FOUND);
        } else {
            int result = memberService.login(dto);
            if (result > 0) {
                Cookie cookie = new Cookie("_fid", "dd");
                cookie.setMaxAge(60 * 60 * 12);
                response.addCookie(cookie);
                return new ResponseEntity(new CustomReturn(200, "Login success.", null), HttpStatus.OK);
            } else {
                return new ResponseEntity(new CustomReturn(404, "Not Found Accounts.", null), HttpStatus.NOT_FOUND);
            }
        }
    }
}
