package ru.alfa.service.tariff;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.alfa.data.dto.abonentsTable.ResponseEntitiesListSizeDto;
import ru.alfa.data.dto.service.RequestFiltersForServiceTableDto;
import ru.alfa.data.dto.tariff.RequestFiltersForTariffsTableDto;
import ru.alfa.data.dto.tariff.ResponseTariffDto;
import ru.alfa.data.entity.service.MobileService;
import ru.alfa.data.entity.tariff.Tariff;
import ru.alfa.data.mapper.tariff.TariffMapper;
import ru.alfa.data.repository.tariff.TariffRepository;
import ru.alfa.service.service.MobileServiceTableSpecification;

/**
 * Сервис для вывода тарифов в виде таблицы.
 * Этот класс предоставляет методы для получения тарифов с применением фильтров и пагинации.
 */
@Service
@RequiredArgsConstructor
public class TariffTableService {

    /**
     * Репозиторий для работы с тарифами.
     */
    private final TariffRepository tariffRepository;

    /**
     * Маппер для преобразования между сущностями тарифов и DTO.
     */
    private final TariffMapper tariffMapper;

    /**
     * Получает страницу тарифов с применением фильтров.
     *
     * @param page                             Номер страницы (0 - первая страница).
     * @param size                             Количество элементов на странице.
     * @param requestFiltersForTariffsTableDto DTO с фильтрами для поиска тарифов.
     * @return Страница DTO тарифов, соответствующих заданным фильтрам.
     */
    @Transactional
    public Page<ResponseTariffDto> getTariffsWithFilters(
            Integer page, Integer size,
            RequestFiltersForTariffsTableDto requestFiltersForTariffsTableDto) {

        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());

        Specification<Tariff> tariffSpecification = Specification.
                where(TariffTableSpecification.hasName(requestFiltersForTariffsTableDto.name())).
                and(TariffTableSpecification.hasStatus(requestFiltersForTariffsTableDto.status())).
                and(TariffTableSpecification.hasType(requestFiltersForTariffsTableDto.type()));

        Page<Tariff> tariffs = tariffRepository.findAll(tariffSpecification, pageable);

        return tariffs.map(tariffMapper::toResponseDto);
    }

    /**
     * Получает количество тарифов, соответствующих заданным фильтрам.
     *
     * @param requestFiltersForTariffsTableDto DTO с фильтрами для поиска тарифов.
     * @return DTO с общим количеством тарифов и количеством, соответствующим фильтрам.
     */
    public ResponseEntitiesListSizeDto getServicesListSizeWithFilters(RequestFiltersForTariffsTableDto requestFiltersForTariffsTableDto) {
        Specification<Tariff> tariffSpecification = Specification.
                where(TariffTableSpecification.hasName(requestFiltersForTariffsTableDto.name())).
                and(TariffTableSpecification.hasStatus(requestFiltersForTariffsTableDto.status())).
                and(TariffTableSpecification.hasType(requestFiltersForTariffsTableDto.type()));

        return new ResponseEntitiesListSizeDto(tariffRepository.count(tariffSpecification),tariffRepository.count());
    }
}
