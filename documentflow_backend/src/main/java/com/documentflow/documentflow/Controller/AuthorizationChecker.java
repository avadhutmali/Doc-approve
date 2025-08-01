package com.documentflow.documentflow.Controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.documentflow.documentflow.Security.JwtUtil;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;



@RestController
@RequestMapping("/api/authority")
@RequiredArgsConstructor
public class AuthorizationChecker {
    
    private final JwtUtil jwtUtil;

    @GetMapping
    public String getRole(HttpServletRequest httpRequest){
        String authorization = httpRequest.getHeader("Authorization");

        if(authorization ==null || !authorization.startsWith("Bearer ")){
            return "";
        }
        System.out.println("here it is wrong"+authorization.substring(7)+"***");
        return "Your Role is "+jwtUtil.extractRoles(authorization.substring(7));
    }
    
}
