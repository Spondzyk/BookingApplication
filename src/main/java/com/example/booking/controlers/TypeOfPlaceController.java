package com.example.booking.controlers;

import com.example.booking.Dto.TypeOfPlaceDto;
import com.example.booking.services.TypeOfPlaceService;
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
public class TypeOfPlaceController {

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private TypeOfPlaceService typeOfPlaceService;

    @GetMapping("/typesOfPlace")
    public List<TypeOfPlaceDto> getAll() {
        return typeOfPlaceService.getAll()
                .stream()
                .map(type -> modelMapper.map(type, TypeOfPlaceDto.class))
                .collect(Collectors.toList());
    }
}
