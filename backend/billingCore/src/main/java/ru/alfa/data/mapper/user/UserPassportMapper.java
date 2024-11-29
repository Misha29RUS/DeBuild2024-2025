package ru.alfa.data.mapper.user;

import org.mapstruct.Mapper;
import ru.alfa.data.dto.user.ResponseUserPassportDto;
import ru.alfa.data.entity.user.UserPassport;

/**
 * Mapper интерфейс для преобразования объектов типа {@link UserPassport}
 */
@Mapper(componentModel = "spring")
public interface UserPassportMapper {

    /**
     * Преобразует объект {@link UserPassport} в {@link ResponseUserPassportDto}.
     *
     * @param userPassport объект типа {@link UserPassport}, который необходимо преобразовать.
     * @return объект типа {@link ResponseUserPassportDto},
     *         полученный в результате преобразования.
     */
    ResponseUserPassportDto toDto(UserPassport userPassport);
}