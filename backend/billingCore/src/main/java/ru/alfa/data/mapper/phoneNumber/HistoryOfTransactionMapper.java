package ru.alfa.data.mapper.phoneNumber;

import org.mapstruct.Mapper;
import ru.alfa.data.dto.phoneNumber.ResponseTransactionDto;
import ru.alfa.data.entity.phoneNumber.HistoryOfTransaction;

@Mapper(componentModel = "spring")
public interface HistoryOfTransactionMapper {

    ResponseTransactionDto toResponseTransactionDto(HistoryOfTransaction historyOfTransaction);
}
