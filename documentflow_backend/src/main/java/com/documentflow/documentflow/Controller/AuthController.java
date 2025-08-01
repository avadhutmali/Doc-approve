package com.documentflow.documentflow.Controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.documentflow.documentflow.DTO.AuthReq;
import com.documentflow.documentflow.DTO.AuthRes;
import com.documentflow.documentflow.Entity.User;
import com.documentflow.documentflow.Security.JwtUtil;
import com.documentflow.documentflow.Service.UserService;

import lombok.RequiredArgsConstructor;


@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final UserService userService;
    
    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody User user) {
        try {
            userService.RegisterUser(user);
            return ResponseEntity.ok("User Registered Succesfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Username Already Exit");
        }
    }

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
