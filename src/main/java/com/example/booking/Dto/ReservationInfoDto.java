package com.example.booking.Dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class ReservationInfoDto {
    private Long id;
    private LocalDate startDate;
    private LocalDate endDate;
    private String status;
    private String accomodationPlaceCity;
    private String accomodationPlaceStreet;
    private String accomodationPlaceHouse_nr;
    private String accomodationPlaceName;
}
