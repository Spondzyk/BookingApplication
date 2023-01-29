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

    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "reservation")
    private List<Payment> payment;

    public static class ReservationBuilder{
        private Long id;
        private LocalDate startDate;
        private LocalDate endDate;
        private ReservationStatus status;
        private Integer people_nr;
        private Double price;
        private User user;
        private Accomodation accomodation;
        private List<Payment> payment;

        public ReservationBuilder(){
        }

        public ReservationBuilder id(Long id) {
            this.id = id;
            return this;
        }

        public ReservationBuilder startDate(LocalDate startDate) {
            this.startDate = startDate;
            return this;
        }

        public ReservationBuilder endDate(LocalDate endDate) {
            this.endDate = endDate;
            return this;
        }

        public ReservationBuilder status(ReservationStatus status) {
            this.status = status;
            return this;
        }

        public ReservationBuilder people_nr(Integer people_nr) {
            this.people_nr = people_nr;
            return this;
        }

        public ReservationBuilder price(Double price) {
            this.price = price;
            return this;
        }

        public ReservationBuilder user(User user) {
            this.user = user;
            return this;
        }

        public ReservationBuilder accomodation(Accomodation accomodation) {
            this.accomodation = accomodation;
            return this;
        }

        public ReservationBuilder payment(List<Payment> payment) {
            this.payment = payment;
            return this;
        }
        public Reservation build(){
            return new Reservation(id, startDate, endDate, status, people_nr, price, user, accomodation, payment);
        }
    }
}


