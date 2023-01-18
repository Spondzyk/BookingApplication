package com.example.booking.controlers;

import com.example.booking.Dto.ReservationDto;
import com.example.booking.Dto.ReservationInfoDto;
import com.example.booking.models.User;
import com.example.booking.services.ReservationService;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@CrossOrigin("*")
@RestController
@RequestMapping("/api")
public class ReservationController {

    private final ReservationService reservationService;

    public ReservationController(ReservationService reservationService) {
        this.reservationService = reservationService;
    }

    @GetMapping("/reservations")
    @ApiResponse(responseCode = "200", description = "Success list of logged user reservations")
    public List<ReservationInfoDto> getAll() {
        Long loggedUserId = Objects.requireNonNull(getCurrentUser()).getId();

        return reservationService.getAllUserReservation(loggedUserId).stream()
                .map(reservationService::reservationToInfoDto)
                .collect(Collectors.toList());
    }

    @GetMapping("/reservations/{id}")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Success logged user reservation received"),
            @ApiResponse(responseCode = "403", description = "Invalid user tries to open someone reservation"),
            @ApiResponse(responseCode= "409", description = "Reservation with id not found")})
    public ResponseEntity<ReservationDto> getPlaceById(@PathVariable Long id) {
        ReservationDto resDto;
        try {
            resDto = reservationService.reservationToDto(reservationService.getReservationById(id));
        } catch (Exception e){
            throw new ResponseStatusException(HttpStatus.CONFLICT, e.getMessage());
        }

        if (reservationService.isNotReservationOfUser(id, Objects.requireNonNull(getCurrentUser())))
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Access forbidden");

        return ResponseEntity.ok(resDto);

    }

    @PutMapping("/reservations/{id}")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Success logged user reservation updated"),
            @ApiResponse(responseCode = "403", description = "Invalid user tries to open someone reservation"),
            @ApiResponse(responseCode= "409", description = "Reservation data invalid")})
    public ResponseEntity<ReservationDto> updatePlace(@PathVariable Long id, @RequestBody ReservationDto reservationDetails) {
        ReservationDto resDto;
        try {
            resDto = reservationService.reservationToDto(reservationService.updateReservation(id, reservationDetails));
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, e.getMessage());
        }

        if (reservationService.isNotReservationOfUser(id, Objects.requireNonNull(getCurrentUser())))
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Access forbidden");

        return ResponseEntity.ok(resDto);
    }

    @PutMapping("reservations/{id}/cancel")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Success logged user reservation canceled"),
            @ApiResponse(responseCode = "403", description = "Invalid user tries to open someone reservation"),
            @ApiResponse(responseCode= "409", description = "Reservation with id not found")})
    public ResponseEntity<ReservationDto> cancelBooking(@PathVariable Long id) {
        ReservationDto resDto;
        try {
            resDto = reservationService.reservationToDto(reservationService.cancelBooking(id));
        }catch (Exception e){
            throw new ResponseStatusException(HttpStatus.CONFLICT, e.getMessage());
        }

        if (reservationService.isNotReservationOfUser(id, Objects.requireNonNull(getCurrentUser())))
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Access forbidden");

        return ResponseEntity.ok(resDto);
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
