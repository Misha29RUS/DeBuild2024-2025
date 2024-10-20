package ru.alfa.data.entity.service;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.Hibernate;

import java.io.Serializable;
import java.util.Objects;

@Getter
@Setter
@Embeddable
public class PhoneNumberServiceId implements Serializable {
    private static final long serialVersionUID = 1201653751565560421L;
    @Column(name = "phone_number_id", nullable = false)
    private Long phoneNumberId;

    @Column(name = "service_id", nullable = false)
    private Long serviceId;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        PhoneNumberServiceId entity = (PhoneNumberServiceId) o;
        return Objects.equals(this.serviceId, entity.serviceId) &&
                Objects.equals(this.phoneNumberId, entity.phoneNumberId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(serviceId, phoneNumberId);
    }

}