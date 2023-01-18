package com.example.booking.controlers;

import com.example.booking.Dto.UserDto;
import com.example.booking.Dto.UserInfoDto;
import com.example.booking.models.User;
import com.example.booking.services.UserService;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.Objects;

@CrossOrigin("*")
@RestController
@RequestMapping("/api")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/loggedUser")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Success logged user info received"),
            @ApiResponse(responseCode = "409", description = "User with id not found")})
    public UserInfoDto getLoggedUser() {
        UserInfoDto userDto;
        try {
            userDto = userService.userToUserInfoDto(userService.getUserById(Objects.requireNonNull(getCurrentUser()).getId()));
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, e.getMessage());
        }
        return userDto;
    }

    @GetMapping("/currentUser")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Success account data of logged received"),
            @ApiResponse(responseCode = "409", description = "User with id not found")})
    public UserDto getAccountData() {
        UserDto userDto;
        try {
            userDto = userService.userToUserDto(userService.getUserById(Objects.requireNonNull(getCurrentUser()).getId()));
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, e.getMessage());
        }
        return userDto;
    }

    @DeleteMapping("/currentUser")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Success account of logged user deleted"),
            @ApiResponse(responseCode = "409", description = "User with id not found")})
    public boolean deleteAccount() {
        try {
            userService.deleteUser(Objects.requireNonNull(getCurrentUser()).getId());
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, e.getMessage());
        }
        return true;
    }

    @PutMapping("/currentUser")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Success account of logged user updated"),
            @ApiResponse(responseCode = "409", description = "User data invalid")})
    public UserDto updateAccount(@RequestBody UserDto userDto) {
        UserDto dto;
        try {
            dto = userService.userToUserDto(userService.updateUser(Objects.requireNonNull(getCurrentUser()), userDto));
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, e.getMessage());
        }
        return dto;
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
