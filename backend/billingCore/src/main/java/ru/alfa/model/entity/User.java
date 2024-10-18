package ru.alfa.model.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "\"user\"")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id", nullable = false)
    private Long id;

    @Column(name = "name", length = Integer.MAX_VALUE)
    private String name;

    @Column(name = "surname", length = Integer.MAX_VALUE)
    private String surname;

    @Column(name = "patronymic", length = Integer.MAX_VALUE)
    private String patronymic;

    @OneToMany(mappedBy = "user")
    private Set<PhoneNumber> phoneNumbers = new LinkedHashSet<>();

    @OneToOne(mappedBy = "user")
    private UserCredential userCredential;

    @OneToOne(mappedBy = "user")
    private UserPassport userPassport;

}