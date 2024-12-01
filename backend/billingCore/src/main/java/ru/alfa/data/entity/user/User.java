package ru.alfa.data.entity.user;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import ru.alfa.data.entity.phoneNumber.PhoneNumber;

import java.util.LinkedHashSet;
import java.util.Set;

/**
 * Сущность пользователя
 */
@Getter
@Setter
@Entity
@Table(name = "\"user\"")
public class User {

    /**
     * Идентификатор пользователя
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id", nullable = false)
    private Long id;

    /**
     * Имя пользователя
     */
    @Column(name = "name", length = Integer.MAX_VALUE)
    private String name;

    /**
     * Фамилия пользователя
     */
    @Column(name = "surname", length = Integer.MAX_VALUE)
    private String surname;

    /**
     * Отчество пользователя
     */
    @Column(name = "patronymic", length = Integer.MAX_VALUE)
    private String patronymic;

    /**
     * Перечень номеров телефонов пользователя
     */
    @OneToMany(mappedBy = "user")
    private Set<PhoneNumber> phoneNumbers = new LinkedHashSet<>();

    /**
     * Учетная запись пользователя
     */
    @OneToOne(mappedBy = "user")
    private UserCredential userCredential;

    /**
     * Паспортные данные пользователя
     */
    @OneToOne(mappedBy = "user")
    private UserPassport userPassport;

}