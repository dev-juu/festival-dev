package com.fastival.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/festival/*")
public class FestivalController {

    @RequestMapping("info")
    public String view_info() {
        return "festival/info";
    }

    @RequestMapping("infoDetail")
    public String view_infoDetail() {
        return "festival/infoDetail";
    }

    @RequestMapping("calendar")
    public String view_calendar() {
        return "festival/calendar";
    }

    @RequestMapping("chat")
    public String view_chat() {
        return "festival/chat";
    }
}
