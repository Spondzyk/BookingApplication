package com.example.booking.controlers;

import com.example.booking.Dto.ReservationDto;
import com.example.booking.Dto.ReservationInfoDto;
import com.example.booking.models.Reservation;
import com.example.booking.services.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api")
public class ReservationController {

    @Autowired
    private ReservationService reservationService;

    @GetMapping("/reservations")
    public List<ReservationInfoDto> getAll() {
        return reservationService.getAllUserReservation(1L);
    }

    @GetMapping("/reservations/{id}")
    public ResponseEntity<ReservationDto> getPlaceById(@PathVariable Long id) {
        ReservationDto resDto = reservationService.reservationToDto(reservationService.getReservationById(id));

        return ResponseEntity.ok(resDto);
    }

    @PutMapping("/reservations/{id}")
    public ResponseEntity<ReservationDto> updatePlace(@PathVariable Long id, @RequestBody ReservationDto reservationDetails) {
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
        ReservationDto resDto = reservationService.reservationToDto(reservationService.cancelBooking(id));

        return ResponseEntity.ok(resDto);
    }
}
