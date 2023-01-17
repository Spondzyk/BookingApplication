package com.example.booking.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.Set;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@EqualsAndHashCode
@Entity
@Table(name = "place")
public class Place {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "country")
    private String country;

    @Column(name = "city")
    private String city;

    @Column(name = "street")
    private String street;

    @Column(name = "house_nr")
    private String house_nr;

    @Column(name = "image_folder_path")
    private String image_folder_path;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "type_of_place_id", nullable = false)
    private TypeOfPlace type_of_place;

    @ManyToMany
    @JoinTable(name = "place_amenities",
            joinColumns = @JoinColumn(name = "amenities_id"),
            inverseJoinColumns = @JoinColumn(name = "place_id"))
    Set<Amenities> amenities;

}
