package ru.alfa.data.mapper.user;

import org.mapstruct.*;
import ru.alfa.data.dto.user.ResponseUserPassportDto;
import ru.alfa.data.entity.user.UserPassport;

@Mapper(componentModel = "spring")
public interface UserPassportMapper {
    ResponseUserPassportDto toDto(UserPassport userPassport);


}