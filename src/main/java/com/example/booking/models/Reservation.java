package com.example.booking.models;

import com.example.booking.models.Enums.ReservationStatus;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@EqualsAndHashCode
@Entity
@Table(name = "reservation")
public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "start_date", nullable = false)
    @JdbcTypeCode(SqlTypes.DATE)
    private LocalDate startDate;

    @Column(name = "end_date", nullable = false)
    @JdbcTypeCode(SqlTypes.DATE)
    private LocalDate endDate;

    @Column(name = "status", nullable = false)
    @JdbcTypeCode(SqlTypes.VARCHAR)
    @Enumerated(EnumType.STRING)
    private ReservationStatus status;

    @Column(name = "people_nr", nullable = false)
    private int people_nr;

    @Column(name = "price", nullable = false)
    private Double price;


    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "accomodation_id", nullable = false)
    private Accomodation accomodation;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "reservation")
    private List<Payment> payment;

}


