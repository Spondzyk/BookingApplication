package com.example.booking.services;

import com.example.booking.Exception.ResourceNotFoundException;
import com.example.booking.models.Enums.PaymentStatus;
import com.example.booking.models.Payment;
import com.example.booking.repositories.PaymentRepository;
import com.example.booking.repositories.ReservationRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class PaymentService {
    private final PaymentRepository paymentRepository;
    private final ReservationRepository reservationRepository;

    @Autowired
    public PaymentService(PaymentRepository paymentRepository,
                          ReservationRepository reservationRepository) {
        this.paymentRepository = paymentRepository;
        this.reservationRepository = reservationRepository;
    }

    void createUnpaidPayment(Long reservationId) {
        Payment payment = Payment.builder()
                .datetime(LocalDateTime.now())
                .status(PaymentStatus.UNPAID)
                .type("ChangeOfPrice")
                .reservation(reservationRepository.findById(reservationId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException("Reservation with id: " + reservationId + " not found")))
                .build();

        paymentRepository.save(payment);
    }
}
