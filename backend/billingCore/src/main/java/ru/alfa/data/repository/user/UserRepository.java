package ru.alfa.data.repository.user;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.alfa.data.entity.user.User;

/**
 * Репозиторий для работы с сущностью {@link User}
 */
public interface UserRepository extends JpaRepository<User, Long> {
}