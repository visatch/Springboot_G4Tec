package com.den.g4tecengineering.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {
    @GetMapping({"","/","/home","/index"})
    public String home(){
        return "index";
    }

    @GetMapping("/about")
    public String about(){
        return "about";
    }

    @GetMapping("/portfolio")
    public String portfolio(){
        return "portfolio";
    }

    @GetMapping("/contact-us")
    public String contact(){
        return "contact-us";
    }
}
