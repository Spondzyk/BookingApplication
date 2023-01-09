package com.example.booking.repositories;

import com.example.booking.models.Accomodation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AccomodationRepository extends JpaRepository<Accomodation, Long> {
}