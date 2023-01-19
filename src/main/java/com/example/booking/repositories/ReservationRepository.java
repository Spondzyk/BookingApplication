package com.example.booking.repositories;

import com.example.booking.models.Enums.ReservationStatus;
import com.example.booking.models.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    @Query("select r from Reservation r where r.accomodation.id = ?1 and r.startDate < ?3 and r.endDate > ?2 and r.status = 'CURRENT'")
    List<Reservation> findAllByDateRangeAndAccommodation(Long id, LocalDate startDate, LocalDate endDate);
}