package com.example.booking.Dto;

import jakarta.persistence.criteria.CriteriaBuilder;
import lombok.Data;

@Data
public class ReservationDto extends ReservationInfoDto {
    private Double price;
    private Double accomodationPrice;
    private String paymentStatus;
    private Integer people_nr;
    private String accomodationName;
    private String accomodationDescription;
    private String accomodationPlaceDescription;
}
