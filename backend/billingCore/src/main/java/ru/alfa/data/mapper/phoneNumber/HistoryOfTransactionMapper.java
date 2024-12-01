package ru.alfa.data.mapper.phoneNumber;

import org.mapstruct.Mapper;
import ru.alfa.data.dto.phoneNumber.ResponseTransactionDto;
import ru.alfa.data.entity.phoneNumber.HistoryOfTransaction;

/**
 * Mapper интерфейс для преобразования объектов типа {@link HistoryOfTransaction} в
 * {@link ResponseTransactionDto}.
 */
@Mapper(componentModel = "spring")
public interface HistoryOfTransactionMapper {

    /**
     * Преобразует объект {@link HistoryOfTransaction} в {@link ResponseTransactionDto}.
     *
     * @param historyOfTransaction объект типа {@link HistoryOfTransaction}, который необходимо преобразовать.
     * @return объект типа {@link ResponseTransactionDto}, полученный в результате преобразования.
     */
    ResponseTransactionDto toResponseTransactionDto(HistoryOfTransaction historyOfTransaction);
}
