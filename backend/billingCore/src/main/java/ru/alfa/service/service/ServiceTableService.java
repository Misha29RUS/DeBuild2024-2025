package ru.alfa.service.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.alfa.data.dto.service.RequestFiltersForServiceTableDto;
import ru.alfa.data.dto.service.ResponseMobileServiceDto;
import ru.alfa.data.entity.service.MobileService;
import ru.alfa.data.mapper.service.MobileServiceMapper;
import ru.alfa.data.repository.service.MobileServiceRepository;

@Service
@RequiredArgsConstructor
public class ServiceTableService {

    private final MobileServiceRepository mobileServiceRepository;

    private final MobileServiceMapper mobileServiceMapper;

    @Transactional
    public Page<ResponseMobileServiceDto> getServicesWithFilters(
            Integer page, Integer size,
            RequestFiltersForServiceTableDto requestFiltersForServiceTableDto) {
        Pageable pageable = PageRequest.of(page, size);

        Specification<MobileService> mobileServiceSpecification = Specification.
                where(MobileServiceTableSpecification.hasName(requestFiltersForServiceTableDto.name())).
                and(MobileServiceTableSpecification.hasType(requestFiltersForServiceTableDto.type())).
                and(MobileServiceTableSpecification.hasTimesService(requestFiltersForServiceTableDto.oneTimeService())).
                and(MobileServiceTableSpecification.hasStatusActive());

        Page<MobileService> mobileServices = mobileServiceRepository.findAll(mobileServiceSpecification, pageable);

        return mobileServices.map(mobileServiceMapper::toResponseDto);
    }
}
