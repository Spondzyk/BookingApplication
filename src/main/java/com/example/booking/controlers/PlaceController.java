package com.example.booking.controlers;

import com.example.booking.Dto.PlaceDto;
import com.example.booking.models.Place;
import com.example.booking.models.User;
import com.example.booking.services.UserService;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.booking.services.PlaceService;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.security.core.context.SecurityContextHolder;

import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

@CrossOrigin("*")
@RestController
@RequestMapping("/api")
public class PlaceController {

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private PlaceService placeService;

    @Autowired
    private UserService userService;

    public PlaceController(PlaceService placeService, UserService userService) {
        super();
        this.placeService = placeService;
        this.userService = userService;
    }

    @GetMapping("/places")
    @ApiResponse(responseCode = "200", description = "Success list of all places in database")
    public List<PlaceDto> getAll() {
        return placeService.getAll()
                .stream()
                .map(place -> modelMapper.map(place, PlaceDto.class))
                .collect(Collectors.toList());
    }

    @GetMapping("/places/user")
    @ApiResponse(responseCode = "200", description = "Success list of logged user places")
    public List<PlaceDto> getAllUser() throws IOException {
        return placeService.getAllUserPlace(Objects.requireNonNull(getCurrentUser()).getId())
                .stream()
                .map(place -> {
                    PlaceDto placeDto = modelMapper.map(place, PlaceDto.class);
                    try {
                        placeDto.listFilesUsingDirectoryStream();
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                    return placeDto;
                })
                .collect(Collectors.toList());
    }

    @GetMapping("/places/{id}")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Success logged user place received"),
            @ApiResponse(responseCode = "403", description = "Invalid user tries to open someone place"),
            @ApiResponse(responseCode = "409", description = "Place with id not found")})
    public ResponseEntity<PlaceDto> getPlaceById(@PathVariable Long id) throws IOException {
        Place place = placeService.getPlaceById(id);
        PlaceDto placeDto = modelMapper.map(place, PlaceDto.class);
        placeDto.listFilesUsingDirectoryStream();

        if (placeService.isNotPlaceOfUser(id, Objects.requireNonNull(getCurrentUser())))
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Access forbidden");

        return ResponseEntity.ok(placeDto);
    }

    @PutMapping("/places/{id}")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Success logged user place updated"),
            @ApiResponse(responseCode = "403", description = "Invalid user tries to open someone place"),
            @ApiResponse(responseCode = "409", description = "Place data invalid")})
    public ResponseEntity<PlaceDto> updatePlace(@PathVariable Long id, @RequestBody PlaceDto placeDetails) {
        Place place = placeService.getPlaceById(id);

        Place converted = modelMapper.map(placeDetails, Place.class);
        place = placeService.updatePlace(place, converted);

        PlaceDto placeDto = modelMapper.map(place, PlaceDto.class);

        if (placeService.isNotPlaceOfUser(id, Objects.requireNonNull(getCurrentUser())))
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Access forbidden");

        return ResponseEntity.ok(placeDto);
    }

    @DeleteMapping("/places/{id}")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Success logged user place deleted"),
            @ApiResponse(responseCode = "403", description = "Invalid user tries to open someone place"),
            @ApiResponse(responseCode = "409", description = "Place with id not found")})
    public ResponseEntity<Map<String, Boolean>> deletePlace(@PathVariable Long id) {
        Place place = placeService.getPlaceById(id);

        if (placeService.isNotPlaceOfUser(id, Objects.requireNonNull(getCurrentUser())))
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Access forbidden");

        placeService.deletePlace(place);

        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/places/add")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Success logged user place"),
            @ApiResponse(responseCode = "409", description = "Place data invalid")})
    public ResponseEntity<PlaceDto> createPlace(@RequestBody PlaceDto place) {

        Place converted = modelMapper.map(place, Place.class);

        User user = userService.getUserById(Objects.requireNonNull(getCurrentUser()).getId());
        converted.setUser(user);

        Place saved = placeService.savePlace(converted);

        PlaceDto dto = modelMapper.map(saved, PlaceDto.class);
        return ResponseEntity.ok(dto);
    }

    private User getCurrentUser() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (principal instanceof User) {
            return ((User) principal);
        } else {
            return null;
        }
    }
}
