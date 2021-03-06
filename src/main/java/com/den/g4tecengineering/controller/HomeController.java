package com.den.g4tecengineering.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {
    @GetMapping({"","/","/home","/index"})
    public String home(){
        return "index";
    }

    @GetMapping("/glove")
    public String glove(){ return "glove"; }

    @GetMapping("/glove_spec")
    public String glove_spec(){
        return "glove-spec";
    }

    @GetMapping("/glove_cert")
    public String glove_cert(){ return "glove-cert"; }

    @GetMapping("/glove_pro_line")
    public String glove_pro_line(){ return "glove-production-line"; }

    @GetMapping("/glove_fac_design")
    public String glove_fac_design(){ return "glove-factory-design"; }

    @GetMapping("/glove_dis")
    public String glove_dis(){ return "glove-dis"; }

    @GetMapping("/about")
    public String about(){
        return "about";
    }

    @GetMapping("/service")
    public String service(){
        return "service";
    }

    @GetMapping("/contact-us")
    public String contact(){
        return "contact-us";
    }
}
