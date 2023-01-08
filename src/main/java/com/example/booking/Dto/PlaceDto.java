package com.example.booking.Dto;

import com.example.booking.models.TypeOfPlace;
import lombok.Data;

@Data
public class PlaceDto {

    private long id;
    private String name;
    private String description;
    private String city;
    private String street;
    private String house_nr;
    private String image_folder_path;
    private TypeOfPlace type_of_place;
}
