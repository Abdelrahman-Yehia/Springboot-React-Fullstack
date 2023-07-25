package com.example.demo.auth;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/v1/auth/**")
                .allowedOrigins("http://localhost:3000") // Replace this with the actual URL of your React app
                .allowedMethods("POST") // Adjust the allowed methods as needed
                .allowCredentials(true);
    }
}

