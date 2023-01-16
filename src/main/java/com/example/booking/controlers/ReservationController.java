package com.example.booking.controlers;

import com.example.booking.Dto.ReservationDto;
import com.example.booking.Dto.ReservationInfoDto;
import com.example.booking.models.User;
import com.example.booking.services.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
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

    @Autowired
    private ReservationService reservationService;

    @GetMapping("/reservations")
    public List<ReservationInfoDto> getAll() {
        Long loggedUserId = Objects.requireNonNull(getCurrentUser()).getId();

        return reservationService.getAllUserReservation(loggedUserId).stream()
                .map(reservationService::reservationToInfoDto)
                .collect(Collectors.toList());
    }

    @GetMapping("/reservations/{id}")
    public ResponseEntity<ReservationDto> getPlaceById(@PathVariable Long id) {

        if (!reservationService.isReservationOfUser(id, Objects.requireNonNull(getCurrentUser())))
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Access forbidden");

        ReservationDto resDto = reservationService.reservationToDto(reservationService.getReservationById(id));

        return ResponseEntity.ok(resDto);
    }

    @PutMapping("/reservations/{id}")
    public ResponseEntity<ReservationDto> updatePlace(@PathVariable Long id, @RequestBody ReservationDto reservationDetails) {

        if (!reservationService.isReservationOfUser(id, Objects.requireNonNull(getCurrentUser())))
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Access forbidden");

        ReservationDto resDto;
        try {
            resDto = reservationService.reservationToDto(reservationService.updateReservation(id, reservationDetails));
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, e.getMessage());
        }

        return ResponseEntity.ok(resDto);
    }

    @PutMapping("reservations/{id}/cancel")
    public ResponseEntity<ReservationDto> cancelBooking(@PathVariable Long id) {

        if (!reservationService.isReservationOfUser(id, Objects.requireNonNull(getCurrentUser())))
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Access forbidden");

        ReservationDto resDto = reservationService.reservationToDto(reservationService.cancelBooking(id));

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
