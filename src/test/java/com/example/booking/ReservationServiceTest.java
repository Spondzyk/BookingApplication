package com.example.booking;

import com.example.booking.Exception.ResourceNotFoundException;
import com.example.booking.models.Reservation;
import com.example.booking.repositories.ReservationRepository;
import com.example.booking.services.ReservationService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.Optional;

import static java.time.LocalDate.now;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(SpringExtension.class)
public class ReservationServiceTest {
    @Mock
    private ReservationRepository reservationRepository;

    @InjectMocks
    private ReservationService reservationService;
    private Reservation expectedReservation;
    private static final Long TEST_ID = 1L;

    @BeforeEach
    public void setUp() {
        expectedReservation = new Reservation.ReservationBuilder()
                .id(TEST_ID)
                .startDate(now())
                .endDate(now().plusDays(1))
                .people_nr(3)
                .build();
    }

    @Test
    public void findReservationById() {
        //when
        when(reservationRepository.findById(any(Long.class))).thenReturn(Optional.of(expectedReservation));
        //then
        Reservation reservation = reservationService.getReservationById(TEST_ID);
        Assertions.assertEquals(expectedReservation, reservation);
    }

    @Test
    public void findReservationByIdNoReservation() {
        //when
        when(reservationRepository.findById(any(Long.class))).thenReturn(Optional.empty());
        //then
        Assertions.assertThrows(ResourceNotFoundException.class,
                () -> reservationService.getReservationById(TEST_ID));
    }
}
