package ru.alfa.data.mapper.user;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import ru.alfa.data.dto.user.ResponseUserWithPassportDto;
import ru.alfa.data.entity.user.User;

@Mapper(componentModel = "spring", uses = {UserPassportMapper.class})
public interface UserMapper {

    @Mapping(target = "userPassport", source = "userPassport")
    ResponseUserWithPassportDto toDto(User user);
}