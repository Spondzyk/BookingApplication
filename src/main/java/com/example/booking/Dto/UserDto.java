package com.example.booking.Dto;

import lombok.Data;

@Data
public class UserDto extends UserInfoDto{
    String id;
    String email;
    String gender;
    String phoneNumber;
    String imagePath;
    String street;
    String house_nr;
    String city;
}
