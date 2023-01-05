package models;

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
@Table(name = "type_of_place")
public class TypeOfPlace {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(name = "name")
    private String name;

    @OneToMany(mappedBy = "type_of_place",
            fetch = FetchType.LAZY,
            cascade = CascadeType.ALL)
    private Set<Place> places;
}
