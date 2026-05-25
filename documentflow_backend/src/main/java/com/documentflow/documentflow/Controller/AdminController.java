package com.documentflow.documentflow.Controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.documentflow.documentflow.DTO.RoleChangeRequest;
import com.documentflow.documentflow.Entity.User;
import com.documentflow.documentflow.Service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final UserService userService;

    @PostMapping("/role")
    public ResponseEntity<User> changeUserRole(Authentication authentication, @RequestBody RoleChangeRequest req){
        // Authentication is validated by SecurityConfig - this endpoint is only for ADMIN authority
        User updated = userService.changeUserRole(req.getUserName(), req.getRole());
        return ResponseEntity.ok(updated);
    }
}

