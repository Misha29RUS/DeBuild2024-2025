package ru.alfa.service.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.alfa.data.dto.service.RequestFiltersForServiceTableDto;
import ru.alfa.data.dto.service.ResponseMobileServiceDto;
import ru.alfa.data.entity.service.MobileService;
import ru.alfa.data.mapper.service.MobileServiceMapper;
import ru.alfa.data.repository.service.MobileServiceRepository;

/**
 * Сервис длч вывода мобильных услуг в виде таблицы.
 * Этот класс предоставляет методы для получения мобильных услуг с применением фильтров.
 */
@Service
@RequiredArgsConstructor
public class ServiceTableService {

    /**
     * Репозиторий для работы с мобильными услугами.
     */
    private final MobileServiceRepository mobileServiceRepository;

    /**
     * Маппер для преобразования между сущностями мобильных услуг и DTO.
     */
    private final MobileServiceMapper mobileServiceMapper;

    /**
     * Получает страницу мобильных услуг с применением фильтров.
     *
     * @param page                             Номер страницы (0 - первая страница).
     * @param size                             Количество элементов на странице.
     * @param requestFiltersForServiceTableDto DTO с фильтрами для поиска мобильных услуг.
     * @return Страница DTO мобильных услуг, соответствующих заданным фильтрам.
     */
    @Transactional
    public Page<ResponseMobileServiceDto> getServicesWithFilters(
            Integer page, Integer size,
            RequestFiltersForServiceTableDto requestFiltersForServiceTableDto) {

        Pageable pageable = PageRequest.of(page, size, Sort.by("updatedAt"));

        Specification<MobileService> mobileServiceSpecification = Specification.
                where(MobileServiceTableSpecification.hasName(requestFiltersForServiceTableDto.name())).
                and(MobileServiceTableSpecification.hasType(requestFiltersForServiceTableDto.type())).
                and(MobileServiceTableSpecification.hasTimesService(requestFiltersForServiceTableDto.oneTimeService())).
                and(MobileServiceTableSpecification.hasStatusActive());

        Page<MobileService> mobileServices = mobileServiceRepository.findAll(mobileServiceSpecification, pageable);

        return mobileServices.map(mobileServiceMapper::toResponseDto);
    }
}
