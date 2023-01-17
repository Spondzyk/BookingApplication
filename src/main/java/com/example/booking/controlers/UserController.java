package com.example.booking.controlers;

import com.example.booking.Dto.ReservationInfoDto;
import com.example.booking.Dto.UserDto;
import com.example.booking.models.User;
import com.example.booking.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@CrossOrigin("*")
@RestController
@RequestMapping("/api")
public class UserController {

    private UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/loggedUser")
    public UserDto getLoggedUSer() {
        UserDto userDto;
        try {
            userDto = userService.userToUserDto(userService.getUserById(Objects.requireNonNull(getCurrentUser()).getId()));
            ;
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, e.getMessage());
        }
        return userDto;
    }

    private User getCurrentUser() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (principal instanceof User) {
            return ((User) principal);
        } else {
            return null;
        }
    }
}
