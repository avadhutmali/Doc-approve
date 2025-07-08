package com.documentflow.documentflow.Service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.documentflow.documentflow.Entity.User;
import com.documentflow.documentflow.Repository.UserRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class UserService {
    
    private UserRepository userRepository;

    public UserService(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    public User RegisterUser(User user){
        if(userRepository.existsByUserName(user.getUserName())){
            throw new IllegalArgumentException("User Name Already Exits");
        }

        return userRepository.save(user);
    }

    public Optional<User> getUserByUserName(String userName){
        return userRepository.findByUserName(userName);
    }

    public User getUserById(Long id){
        return userRepository.findById(id)
                .orElseThrow(()->new EntityNotFoundException("User Not Found"));
    }
}
