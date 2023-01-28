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

    @Column(name = "name", nullable = false)
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

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "place_amenities",
            joinColumns = @JoinColumn(name = "place_id"),
            inverseJoinColumns = @JoinColumn(name = "amenities_id"))
    Set<Amenities> amenities;

    public static class PlaceBuilder {
        private Long id;
        private String name;
        private String description;
        private String country;
        private String city;
        private String street;
        private String house_nr;
        private String image_folder_path;
        private User user;
        private TypeOfPlace type_of_place;
        private Set<Amenities> amenities;

        public PlaceBuilder() {
        }

        public PlaceBuilder id(Long id) {
            this.id = id;
            return this;
        }

        public PlaceBuilder name(String name) {
            this.name = name;
            return this;
        }

        public PlaceBuilder description(String description) {
            this.description = description;
            return this;
        }

        public PlaceBuilder country(String country) {
            this.country = country;
            return this;
        }

        public PlaceBuilder city(String city) {
            this.city = city;
            return this;
        }

        public PlaceBuilder house_nr(String house_nr) {
            this.house_nr = house_nr;
            return this;
        }

        public PlaceBuilder street(String street) {
            this.street = street;
            return this;
        }

        public PlaceBuilder user(String house_nr) {
            this.house_nr = house_nr;
            return this;
        }

        public PlaceBuilder image_folder_path(String image_folder_path) {
            this.image_folder_path = image_folder_path;
            return this;
        }

        public PlaceBuilder user(User user) {
            this.user = user;
            return this;
        }

        public PlaceBuilder type_of_place(TypeOfPlace type_of_place) {
            this.type_of_place = type_of_place;
            return this;
        }

        public PlaceBuilder amenities(Set<Amenities> amenities) {
            this.amenities = amenities;
            return this;
        }

        public Place build() {
            return new Place(id, name, description, country, city, street, house_nr, image_folder_path, user, type_of_place, amenities);
        }
    }

}
