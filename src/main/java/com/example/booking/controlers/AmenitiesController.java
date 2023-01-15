package com.example.booking.controlers;

import com.example.booking.Dto.AmenitiesDto;
import com.example.booking.services.AmenitiesService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "Requestor-Type", exposedHeaders = "X-Get-Header")
@RestController
@RequestMapping("/api")
public class AmenitiesController {

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private AmenitiesService amenitiesService;

    @GetMapping("/amenities")
    public List<AmenitiesDto> getAll() {
        return amenitiesService.getAll()
                .stream()
                .map(amenities -> modelMapper.map(amenities, AmenitiesDto.class))
                .collect(Collectors.toList());
    }
}
