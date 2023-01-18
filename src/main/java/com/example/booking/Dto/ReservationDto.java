package com.example.booking.Dto;

import lombok.Data;

import java.util.List;

@Data
public class ReservationDto extends ReservationInfoDto {
    private Double price;
    private Double accomodationPrice;
    private String paymentStatus;
    private Integer people_nr;
    private String accomodationName;
    private String accomodationDescription;
    private String accomodationPlaceDescription;
    private String accomodationPlaceUserName;
    private Integer accomodationPeople_nr;
    private List<String> photosUrl;
}
