package com.fastival.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/timeline/*")
public class TimelineController {

    @RequestMapping("timeline")
    public String view_timeline(Model model) {
        model.addAttribute("title", "타임라인");
        return "timeline/timeline";
    }

    @RequestMapping("review")
    public String view_review(Model model) {
        model.addAttribute("title", "후기");
        return "timeline/timeline";
    }
}
