package com.example.booking.controlers;

import com.example.booking.models.Place;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.booking.services.PlaceService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:8080")
@RestController
@RequestMapping("/api")
public class PlaceController {

    @Autowired
    private PlaceService placeService;

//    @GetMapping("/places")
//    public List<Place> getAllUserPlaces(@RequestBody Long user_id) {
//        return placeService.getAllUserPlace(1L);
//    }

    @GetMapping("/places")
    public List<Place> getAll() {
        return placeService.getAll();
    }

    @GetMapping("/places/{id}")
    public ResponseEntity<Place> getPlaceById(@PathVariable Long id) {
        Place place = placeService.getPlaceById(id);
        return ResponseEntity.ok(place);
    }

    @PutMapping("/places/{id}")
    public ResponseEntity<Place> updatePlace(@PathVariable Long id, @RequestBody Place placeDetails) {
        Place place = placeService.getPlaceById(id);

        place = placeService.updatePlace(place, placeDetails);
        Place updatedPlace = placeService.savePlace(place);

        return ResponseEntity.ok(updatedPlace);
    }

    @DeleteMapping("/places/{id}")
    public ResponseEntity<Map<String, Boolean>> deletePlace(@PathVariable Long id) {
        Place place = placeService.getPlaceById(id);

        placeService.deletePlace(place);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/places/add")
    public Place createPlace(@RequestBody Place place) {
        return placeService.savePlace(place);
    }
}
