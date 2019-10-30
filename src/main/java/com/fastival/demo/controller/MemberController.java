package com.fastival.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/member/*")
public class MemberController {

    @RequestMapping("login")
    public String view_login() {
        return "member/login";
    }

    @RequestMapping("join")
    public String view_join() {
        return "member/join";
    }

}
