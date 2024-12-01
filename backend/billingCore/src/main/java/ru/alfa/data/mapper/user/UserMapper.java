package ru.alfa.data.mapper.user;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import ru.alfa.data.dto.user.ResponseUserDto;
import ru.alfa.data.dto.user.ResponseUserWithPassportDto;
import ru.alfa.data.entity.user.User;

/**
 *  Mapper интерфейс для преобразования объектов типа {@link User}
 *  в различные DTO
 */
@Mapper(componentModel = "spring", uses = {UserPassportMapper.class})
public interface UserMapper {

    /**
     * Преобразует объект {@link User} в {@link ResponseUserWithPassportDto},
     * включая информацию о паспорте пользователя.
     *
     * @param user объект типа {@link User}, который необходимо преобразовать.
     * @return объект типа {@link ResponseUserWithPassportDto},
     *         полученный в результате преобразования.
     */
    @Mapping(target = "userPassport", source = "userPassport")
    ResponseUserWithPassportDto toResponseDtoWithPassport(User user);

    /**
     * Преобразует объект {@link User} в {@link ResponseUserDto}.
     *
     * @param user объект типа {@link User}, который необходимо преобразовать.
     * @return объект типа {@link ResponseUserDto},
     *         полученный в результате преобразования.
     */
    ResponseUserDto toDto(User user);
}