package ru.alfa.service.abonentsTable;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.alfa.data.dto.abonentsTable.RequestFiltersForAbonentsTableDto;
import ru.alfa.data.dto.abonentsTable.ResponseAbonentsListSizeDto;
import ru.alfa.data.dto.abonentsTable.ResponseAbonetsTableDto;
import ru.alfa.data.entity.phoneNumber.PhoneNumber;
import ru.alfa.data.mapper.abonentsTable.AbonentsTableMapper;
import ru.alfa.data.repository.phoneNumber.PhoneNumberRepository;

/**
 * Сервис для вывода абонентов в виде таблицы.
 * Этот класс предоставляет методы для получения списка абонентов с применением фильтров
 * и получения количества абонентов, соответствующих заданным фильтрам.
 */
@Service
@RequiredArgsConstructor
public class AbonentsTableService {

    /**
     * Репозиторий для работы с телефонными номерами.
     */
    private final PhoneNumberRepository phoneNumberRepository;

    /**
     * Маппер для преобразования между сущностями абонентов и DTO.
     */
    private final AbonentsTableMapper abonentsTableMapper;

    /**
     * Получает страницу абонентов с применением фильтров.
     *
     * @param page                              Номер страницы (0 - первая страница).
     * @param size                              Количество элементов на странице.
     * @param requestFiltersForAbonentsTableDto DTO с фильтрами для поиска абонентов.
     * @return Страница DTO абонентов, соответствующих заданным фильтрам.
     */
    @Transactional
    public Page<ResponseAbonetsTableDto> getAbonentsWithFilters(
            Integer page, Integer size,
            RequestFiltersForAbonentsTableDto requestFiltersForAbonentsTableDto
    ) {
        Pageable pageable = PageRequest.of(page, size);

        Specification<PhoneNumber> phoneNumberSpecification = Specification.
                where(AbonentsTableSpecification.hasPhoneNumber(requestFiltersForAbonentsTableDto.phoneNumber())).
                and(AbonentsTableSpecification.hasName(requestFiltersForAbonentsTableDto.name())).
                and(AbonentsTableSpecification.hasSurname(requestFiltersForAbonentsTableDto.surname())).
                and(AbonentsTableSpecification.hasPatronymic(requestFiltersForAbonentsTableDto.patronymic())).
                and(AbonentsTableSpecification.hasTariffsIds(requestFiltersForAbonentsTableDto.tariffsIds())).
                and(AbonentsTableSpecification.hasMobileServicesIds(requestFiltersForAbonentsTableDto.mobileServicesIds()));

        Page<PhoneNumber> phoneNumbers = phoneNumberRepository.findAll(phoneNumberSpecification, pageable);

        return phoneNumbers.map(abonentsTableMapper::toResponseAbonetsTableDto);
    }

    /**
     * Получает количество абонентов, соответствующих заданным фильтрам.
     *
     * @param requestFiltersForAbonentsTableDto DTO с фильтрами для поиска абонентов.
     * @return DTO с общим количеством абонентов и количеством, соответствующим фильтрам.
     */
    public ResponseAbonentsListSizeDto getAbonentsListSizeWithFilters(
            RequestFiltersForAbonentsTableDto requestFiltersForAbonentsTableDto) {
        Specification<PhoneNumber> phoneNumberSpecification = Specification.
                where(AbonentsTableSpecification.hasPhoneNumber(requestFiltersForAbonentsTableDto.phoneNumber())).
                and(AbonentsTableSpecification.hasName(requestFiltersForAbonentsTableDto.name())).
                and(AbonentsTableSpecification.hasSurname(requestFiltersForAbonentsTableDto.surname())).
                and(AbonentsTableSpecification.hasPatronymic(requestFiltersForAbonentsTableDto.patronymic())).
                and(AbonentsTableSpecification.hasTariffsIds(requestFiltersForAbonentsTableDto.tariffsIds())).
                and(AbonentsTableSpecification.hasMobileServicesIds(requestFiltersForAbonentsTableDto.mobileServicesIds()));

        return new ResponseAbonentsListSizeDto(
                phoneNumberRepository.count(), phoneNumberRepository.count(phoneNumberSpecification)
        );
    }
}
