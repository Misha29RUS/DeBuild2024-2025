package ru.alfa.data.repository.user;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.alfa.data.entity.user.UserCredential;

/**
 * Репозиторий для работы с сущностью {@link UserCredential}
 */
public interface UserCredentialRepository extends JpaRepository<UserCredential, Long> {
}