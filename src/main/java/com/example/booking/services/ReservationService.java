package com.example.booking.services;

import com.example.booking.Dto.ReservationDto;
import com.example.booking.Dto.ReservationInfoDto;
import com.example.booking.Exception.ResourceNotFoundException;
import com.example.booking.models.Enums.PaymentStatus;
import com.example.booking.models.Enums.ReservationStatus;
import com.example.booking.models.Payment;
import com.example.booking.models.Reservation;
import com.example.booking.models.User;
import com.example.booking.repositories.ReservationRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.Period;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReservationService {

    private final ModelMapper modelMapper;
    private final ReservationRepository reservationRepository;
    private final PaymentService paymentService;

    @Autowired
    public ReservationService(ReservationRepository reservationRepository, ModelMapper modelMapper, PaymentService paymentService) {
        this.reservationRepository = reservationRepository;
        this.modelMapper = modelMapper;
        this.paymentService = paymentService;
    }


    public List<Reservation> getAllUserReservation(Long user_id) {
        return reservationRepository.findAll()
                .stream()
                .filter(place -> place.getUser().getId() == user_id)
                .sorted((p1, p2) -> p2.getStartDate().compareTo(p1.getStartDate()))
                .collect(Collectors.toList());
    }

    public Reservation getReservationById(Long id) {
        return reservationRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Reservation with id: " + id + " not found"));
    }
    public Reservation cancelBooking(Long id){
        Reservation res = reservationRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Reservation with id: " + id + " not found"));
        res.setStatus(ReservationStatus.CANCELED);
        reservationRepository.save(res);
        return res;
    }

    public Reservation updateReservation(Long id, ReservationDto reservationDto){
        LocalDate startDate = reservationDto.getStartDate();
        LocalDate endDate = reservationDto.getEndDate();
        double oldPrice = reservationDto.getPrice();

        Reservation res = reservationRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Reservation with id: " + id + " not found"));

        changePeriod(startDate, endDate, res);
        changePeopleNr(res, reservationDto.getPeople_nr());

        if(oldPrice != res.getPrice())
            paymentService.createUnpaidPayment(res.getId());
        reservationRepository.save(res);
        return res;
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

    public boolean isReservationOfUser(Long reservationId, User loggedUser){
        Reservation reservation = reservationRepository.findById(reservationId).orElseThrow();
        return reservation.getUser().getId() == loggedUser.getId();
    }

    private boolean validateDateRangeForAccommodation(LocalDate startDate, LocalDate endDate, Reservation res){
        if(!startDate.isAfter(endDate)) {
            List<Reservation> reservations = reservationRepository.findAllByDateRangeAndAccommodation(res.getAccomodation().getId(), startDate, endDate);
            reservations.remove(res);
            return reservations.isEmpty();
        }
        throw new IllegalArgumentException("Start date mustn't be grater than End date");
    }
    private double calculateNewPrice(LocalDate startDate, LocalDate endDate, Double price){
        Period period = Period.between(startDate, endDate);
        long daysDiff = Math.abs(period.getDays());

        return price * daysDiff;
    }
    private void changePeriod(LocalDate startDate, LocalDate endDate, Reservation res){
        if(this.validateDateRangeForAccommodation(startDate, endDate, res)) {
            res.setStartDate(startDate);
            res.setEndDate(endDate);
            res.setPrice(calculateNewPrice(startDate, endDate, res.getAccomodation().getPrice()));
        }else throw new IllegalArgumentException("This period is reserved");
    }

    private void changePeopleNr(Reservation res, int peopleNrToChange){
        int max_people = res.getAccomodation().getPeople_nr();
        if(0 < peopleNrToChange && peopleNrToChange <= max_people) {
            res.setPeople_nr(peopleNrToChange);
        } else throw new IllegalArgumentException("Incorrect People nr Max is " + max_people);
    }
}
