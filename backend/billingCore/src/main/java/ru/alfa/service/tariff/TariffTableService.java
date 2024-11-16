package ru.alfa.service.tariff;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.alfa.data.dto.tariff.RequestFiltersForTariffsTableDto;
import ru.alfa.data.dto.tariff.ResponseTariffDto;
import ru.alfa.data.entity.tariff.Tariff;
import ru.alfa.data.mapper.tariff.TariffMapper;
import ru.alfa.data.repository.tariff.TariffRepository;

@Service
@RequiredArgsConstructor
public class TariffTableService {

    private final TariffRepository tariffRepository;

    private final TariffMapper tariffMapper;

    @Transactional
    public Page<ResponseTariffDto> getTariffsWithFilters(
            Integer page, Integer size,
            RequestFiltersForTariffsTableDto requestFiltersForTariffsTableDto) {
        Pageable pageable = PageRequest.of(page, size);

        Specification<Tariff> tariffSpecification = Specification.
                where(TariffTableSpecification.hasName(requestFiltersForTariffsTableDto.name())).
                and(TariffTableSpecification.hasStatus(requestFiltersForTariffsTableDto.status())).
                and(TariffTableSpecification.hasType(requestFiltersForTariffsTableDto.type()));

        Page<Tariff> tariffs = tariffRepository.findAll(tariffSpecification, pageable);

        return tariffs.map(tariffMapper::toResponseDto);
    }
}
