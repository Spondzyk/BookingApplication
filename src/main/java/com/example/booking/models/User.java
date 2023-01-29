package com.example.booking.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Date;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@EqualsAndHashCode
@Entity
@Table(name = "user")
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "name")
    private String name;

    @Column(name = "lastname")
    private String lastname;

    @Column(name = "email")
    private String email;

    @Column(name = "date_of_birth")
    private Date dateOfBirth;

    @Column(name = "gender")
    private String gender;

    @Column(name = "image_path")
    private String imagePath;

    @Column(name = "phone_number")
    private String phoneNumber;

    @Column(name = "IBAN")
    private String IBAN;

    @Column(name = "status")
    private String status;

    @JsonIgnore
    @OneToMany(mappedBy = "user",
            fetch = FetchType.LAZY,
            cascade = CascadeType.ALL)
    private Set<Place> places;

    @Column(name = "password")
    private String password;

    @Column(name = "city")
    private String city;

    @Column(name = "street")
    private String street;

    @Column(name = "house_nr")
    private String house_nr;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public String getPassword() {
        return this.password;
    }

    @Override
    public String getUsername() {
        return this.email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }


    public static class UserBuilder {

        private Long id;

        private String name;

        private String lastname;

        private String email;

        private Date dateOfBirth;

        private String gender;

        private String imagePath;

        private String phoneNumber;

        private String IBAN;

        private String status;
        private Set<Place> places;

        private String password;

        private String city;

        private String street;

        private String house_nr;

        public UserBuilder() {
        }

        public UserBuilder Id(Long id) {
            this.id = id;
            return this;
        }

        public UserBuilder Name(String name) {
            this.name = name;
            return this;

        }

        public UserBuilder Lastname(String lastname) {
            this.lastname = lastname;
            return this;

        }

        public UserBuilder Email(String email) {
            this.email = email;
            return this;

        }

        public UserBuilder DateOfBirth(Date dateOfBirth) {
            this.dateOfBirth = dateOfBirth;
            return this;

        }

        public UserBuilder Gender(String gender) {
            this.gender = gender;
            return this;

        }

        public UserBuilder ImagePath(String imagePath) {
            this.imagePath = imagePath;
            return this;

        }

        public UserBuilder PhoneNumber(String phoneNumber) {
            this.phoneNumber = phoneNumber;
            return this;

        }

        public UserBuilder IBAN(String IBAN) {
            this.IBAN = IBAN;
            return this;

        }

        public UserBuilder Status(String status) {
            this.status = status;
            return this;

        }

        public UserBuilder Places(Set<Place> places) {
            this.places = places;
            return this;

        }

        public UserBuilder Password(String password) {
            this.password = password;
            return this;

        }

        public UserBuilder City(String city) {
            this.city = city;
            return this;

        }

        public UserBuilder Street(String street) {
            this.street = street;
            return this;

        }

        public UserBuilder House_nr(String house_nr) {
            this.house_nr = house_nr;
            return this;

        }
        public User build() {
            return new User(id, name, lastname, email, dateOfBirth, gender, imagePath, phoneNumber, IBAN, status, places, password, city, street, house_nr);
        }
    }
}