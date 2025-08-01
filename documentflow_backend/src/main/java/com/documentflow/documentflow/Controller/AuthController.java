package com.documentflow.documentflow.Controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.documentflow.documentflow.DTO.AuthReq;
import com.documentflow.documentflow.DTO.AuthRes;
import com.documentflow.documentflow.Security.JwtUtil;

import lombok.RequiredArgsConstructor;


import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;


    @PostMapping("/login")
    public AuthRes postMethodName(@RequestBody AuthReq req) {
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(req.getUserName(), req.getPassword())
        );
        
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();

        String token = jwtUtil.generateToken(userDetails);

        return new AuthRes(token);
    }
    

}
