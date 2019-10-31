package com.fastival.demo.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

public class MainController {

    @RequestMapping("/")
    public ModelAndView main(ModelAndView mav) {
        mav.setViewName("index");
        return mav;
    }

}
