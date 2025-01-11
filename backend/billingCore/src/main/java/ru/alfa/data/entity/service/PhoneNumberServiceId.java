package ru.alfa.data.entity.service;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.Hibernate;

import java.io.Serializable;
import java.util.Objects;

/**
 * Класс, представляющий составной идентификатор для связи между номером телефона и услугой
 */
@Getter
@Setter
@Embeddable
public class PhoneNumberServiceId implements Serializable {

    /**
     * Уникальный идентификатор версии для сериализации
     */
    private static final long serialVersionUID = 1201653751565560421L;

    /**
     * Идентификатор номера телефона
     */
    @Column(name = "phone_number_id", nullable = false)
    private Long phoneNumberId;

    /**
     * Идентификатор мобильной услуги
     */
    @Column(name = "service_id", nullable = false)
    private Long serviceId;

    /**
     * Сравнение объектов по идентификаторам
     *
     * @param o объект
     * @return true, если объекты равны
     */
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        PhoneNumberServiceId entity = (PhoneNumberServiceId) o;
        return Objects.equals(this.serviceId, entity.serviceId) &&
                Objects.equals(this.phoneNumberId, entity.phoneNumberId);
    }

    /**
     * Получение хэш-код для текущего объекта
     *
     * @return хэш-значение текущего объекта
     */
    @Override
    public int hashCode() {
        return Objects.hash(serviceId, phoneNumberId);
    }

}