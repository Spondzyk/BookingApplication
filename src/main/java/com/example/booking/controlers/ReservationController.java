package com.example.booking.controlers;

import com.example.booking.Dto.ReservationDto;
import com.example.booking.Dto.ReservationInfoDto;
import com.example.booking.services.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "Requestor-Type", exposedHeaders = "X-Get-Header")
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
        ReservationDto resDto = reservationService.getReservationById(id);

        return ResponseEntity.ok(resDto);
    }
}
