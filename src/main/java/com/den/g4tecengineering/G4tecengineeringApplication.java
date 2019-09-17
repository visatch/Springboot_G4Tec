package com.den.g4tecengineering;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

@SpringBootApplication
public class G4tecengineeringApplication extends SpringBootServletInitializer {

    public static void main(String[] args) {
        SpringApplication.run(G4tecengineeringApplication.class, args);
    }

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
        return builder.sources(G4tecengineeringApplication.class);
    }
}
