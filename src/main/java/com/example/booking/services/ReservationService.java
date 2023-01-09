package com.example.booking.services;

import com.example.booking.Dto.ReservationDto;
import com.example.booking.Dto.ReservationInfoDto;
import com.example.booking.Exception.ResourceNotFoundException;
import com.example.booking.models.Enums.PaymentStatus;
import com.example.booking.models.Payment;
import com.example.booking.models.Reservation;
import com.example.booking.repositories.ReservationRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReservationService {

    private final ModelMapper modelMapper;
    private final ReservationRepository reservationRepository;

    @Autowired
    public ReservationService(ReservationRepository reservationRepository, ModelMapper modelMapper) {
        this.reservationRepository = reservationRepository;
        this.modelMapper = modelMapper;
    }


    public List<ReservationInfoDto> getAllUserReservation(Long user_id) {
        return reservationRepository.findAll()
                .stream()
                .filter(place -> place.getUser().getId() == user_id)
                .sorted((p1, p2) -> p2.getStartDate().compareTo(p1.getStartDate()))
                .map(this::reservationToInfoDto)
                .collect(Collectors.toList());
    }

    public ReservationDto getReservationById(Long id) {
        Reservation res = reservationRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Reservation with id: " + id + " not found"));
        return reservationToDto(res);
    }

    public ReservationInfoDto reservationToInfoDto(Reservation reservation) {
        return modelMapper.map(reservation, ReservationInfoDto.class);
    }

    public ReservationDto reservationToDto(Reservation reservation) {
        ReservationDto dto = modelMapper.map(reservation, ReservationDto.class);
        List<Payment> payments = reservation.getPayment();
        if (payments.isEmpty())
            dto.setPaymentStatus(PaymentStatus.UNPAID.toString());
        else {
            dto.setPaymentStatus(payments.stream().sorted(
                            (p1, p2) -> p2.getDatetime().compareTo(p1.getDatetime()))
                    .toList().get(0).getStatus().toString());
        }
        return dto;
    }

}
