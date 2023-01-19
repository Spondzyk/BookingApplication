package com.example.booking.services;

import com.example.booking.Dto.UserDto;
import com.example.booking.Dto.UserInfoDto;
import com.example.booking.Exception.ResourceNotFoundException;
import com.example.booking.models.User;
import com.example.booking.repositories.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final ModelMapper modelMapper;
    private final UserRepository userRepository;

    @Autowired
    public UserService(ModelMapper modelMapper, UserRepository userRepository) {
        this.modelMapper = modelMapper;
        this.userRepository = userRepository;
    }

    public User getUserById(Long id) {
        return userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User with id: " + id + " not found"));
    }

    public UserInfoDto userToUserInfoDto(User user) {
        return modelMapper.map(user, UserInfoDto.class);
    }

    public UserDto userToUserDto(User user) {
        return modelMapper.map(user, UserDto.class);
    }

    public void deleteUser(Long userId){
        userRepository.deleteById(userId);
    }

    public User updateUser(User user, UserDto userDto) {
        user.setName(userDto.getName());
        user.setLastname(userDto.getLastname());
        user.setEmail(userDto.getEmail());
        user.setGender(userDto.getGender());
        user.setPhoneNumber(userDto.getPhoneNumber());
        user.setStreet(userDto.getStreet());
        user.setHouse_nr(userDto.getHouse_nr());
        user.setCity(userDto.getCity());

        userRepository.save(user);
        return user;
    }
}
