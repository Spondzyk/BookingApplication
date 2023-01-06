package com.example.booking.services;

import com.example.booking.models.Place;
import org.springframework.beans.factory.annotation.Autowired;
import com.example.booking.repositories.PlaceRepository;
import com.example.booking.Exception.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PlaceService {

    private final PlaceRepository placeRepository;

    @Autowired
    public PlaceService(PlaceRepository placeRepository) {
        this.placeRepository = placeRepository;
    }

    public List<Place> getAll() {
        return placeRepository.findAll();
    }

    public List<Place> getAllUserPlace(Long user_id) {
        return placeRepository.findAll()
                .stream()
                .filter(place -> place.getUser().getId() == user_id)
                .collect(Collectors.toList());
    }

    public Place getPlaceById(Long id) {
        return placeRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User with id: " + id + " not exist "));
    }

    public void deletePlace(Place place) {
        placeRepository.delete(place);
    }

    public Place savePlace(Place place) {
        return placeRepository.save(place);
    }

    public Place updatePlace(Place place, Place newDetails) {
        place.setName(newDetails.getName());
        place.setDescription(newDetails.getDescription());
        place.setType_of_place(newDetails.getType_of_place());
        place.setCity(newDetails.getCity());
        place.setStreet(newDetails.getStreet());
        place.setHouse_nr(newDetails.getHouse_nr());

        return place;
    }
}
