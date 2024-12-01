package ru.alfa.data.repository.user;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.alfa.data.entity.user.UserPassport;

/**
 * Репозиторий для работы с сущностью {@link UserPassport}
 */
public interface UserPassportRepository extends JpaRepository<UserPassport, Long> {
}