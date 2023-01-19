package com.example.booking.services;

import com.example.booking.models.TypeOfPlace;
import com.example.booking.repositories.TypeOfPlaceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TypeOfPlaceService {

    private final TypeOfPlaceRepository typeOfPlaceRepository;

    @Autowired
    public TypeOfPlaceService(TypeOfPlaceRepository typeOfPlaceRepository) {
        this.typeOfPlaceRepository = typeOfPlaceRepository;
    }

    public List<TypeOfPlace> getAll() {
        return typeOfPlaceRepository.findAll();
    }
}
