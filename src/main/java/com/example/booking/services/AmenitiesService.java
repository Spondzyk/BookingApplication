package com.example.booking.services;

import com.example.booking.models.Amenities;
import com.example.booking.repositories.AmenitiesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AmenitiesService {

    private final AmenitiesRepository amenitiesRepository;

    @Autowired
    public AmenitiesService(AmenitiesRepository amenitiesRepository){
        this.amenitiesRepository = amenitiesRepository;
    }

    public List<Amenities> getAll() {
        return amenitiesRepository.findAll();
    }
}
