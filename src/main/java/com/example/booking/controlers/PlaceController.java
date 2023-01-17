package com.example.booking.controlers;

import com.example.booking.Dto.PlaceDto;
import com.example.booking.models.Place;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.booking.services.PlaceService;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "Requestor-Type", exposedHeaders = "X-Get-Header")
@RestController
@RequestMapping("/api")
public class PlaceController {

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private PlaceService placeService;

    public PlaceController(PlaceService placeService) {
        super();
        this.placeService = placeService;
    }

    //    @GetMapping("/places")
//    public List<Place> getAllUserPlaces(@RequestBody Long user_id) {
//        return placeService.getAllUserPlace(1L);
//    }

    @GetMapping("/places")
    public List<PlaceDto> getAll() {
        return placeService.getAllUserPlace(1L)
                .stream()
                .map(place -> modelMapper.map(place, PlaceDto.class))
                .collect(Collectors.toList());
    }

    @GetMapping("/places/{id}")
    public ResponseEntity<PlaceDto> getPlaceById(@PathVariable Long id) throws IOException {
        Place place = placeService.getPlaceById(id);
        PlaceDto placeDto = modelMapper.map(place, PlaceDto.class);
        placeDto.listFilesUsingDirectoryStream();

        return ResponseEntity.ok(placeDto);
    }

    @PutMapping("/places/{id}")
    public ResponseEntity<PlaceDto> updatePlace(@PathVariable Long id, @RequestBody PlaceDto placeDetails) {
        Place place = placeService.getPlaceById(id);

        Place converted = modelMapper.map(placeDetails, Place.class);
        place = placeService.updatePlace(place, converted);
        Place updatedPlace = placeService.savePlace(place);

        PlaceDto placeDto = modelMapper.map(updatedPlace, PlaceDto.class);

        return ResponseEntity.ok(placeDto);
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
    public ResponseEntity<PlaceDto> createPlace(@RequestBody PlaceDto place) {

        Place converted = modelMapper.map(place, Place.class);
        Place saved = placeService.savePlace(converted);
        PlaceDto dto = modelMapper.map(saved, PlaceDto.class);

        return ResponseEntity.ok(dto);
    }
}
