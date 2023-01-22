package com.example.booking.services;

import com.example.booking.Exception.ResourceNotFoundException;
import com.example.booking.models.Place;
import com.example.booking.models.User;
import com.example.booking.repositories.PlaceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.FileSystemUtils;

import java.io.File;
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

        //usunięcie directory
        this.deleteDirectoryStream(new File("src/main/resources/booking-angular/src" +
                place.getImage_folder_path().substring(8)));
    }

    public Place savePlace(Place place) {

        List<Place> places = this.getAll();
        int number_of_places = Integer.parseInt(places.get(places.size() - 1).getImage_folder_path().substring(35)) + 1;
        place.setImage_folder_path("../../../assets/images/Places/Place" + number_of_places);

        Place saved = placeRepository.save(place);

        // dodanie directory o ile nie ma zdjęć na start
        this.directoryAssurance("src/main/resources/booking-angular/src/assets/images/Places/Place" + number_of_places);

        return saved;
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

    public boolean isNotPlaceOfUser(Long placeId, User loggedUser) {
        Place place = placeRepository.findById(placeId).orElseThrow();
        return place.getUser().getId() != loggedUser.getId();
    }

    private void deleteDirectoryStream(File path) {
        FileSystemUtils.deleteRecursively(path);
    }

    private void directoryAssurance(String directory) {
        File dir = new File(directory);
        if (!dir.exists()) dir.mkdirs();
    }
}
