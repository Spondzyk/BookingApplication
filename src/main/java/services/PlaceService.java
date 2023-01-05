package services;

import models.Place;
import org.springframework.beans.factory.annotation.Autowired;
import repositories.PlaceRepository;
import Exception.ResourceNotFoundException;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

public class PlaceService {

    @Autowired
    PlaceRepository placeRepository;

    public PlaceService() {
    }

    public List<Place> getAll(){
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
