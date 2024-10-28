package ru.alfa.service.tariff;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.alfa.data.dto.tariff.RequestTariffDto;
import ru.alfa.data.dto.tariff.ResponseTariffDto;
import ru.alfa.data.entity.tariff.Tariff;
import ru.alfa.data.mapper.tariff.TariffMapper;
import ru.alfa.data.repository.tariff.TariffRepository;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TariffService {

    private final TariffRepository tariffRepository;

    private final TariffMapper tariffMapper;

    public List<ResponseTariffDto> getAllTariffs() {
        return tariffRepository.findAll().stream()
                .map(tariffMapper::toResponseDto)
                .toList();
    }

    public ResponseTariffDto createTariff(RequestTariffDto requestTariffDto) {
        Tariff tariff = tariffMapper.toEntity(requestTariffDto);
        tariff.setCreatedAt(LocalDateTime.now());
        tariff.setUpdatedAt(LocalDateTime.now());
        Tariff tariffDb = tariffRepository.save(tariff);
        return tariffMapper.toResponseDto(tariffDb);
    }

    @Transactional
    public ResponseTariffDto updateTariff(Long id, RequestTariffDto requestTariffDto) {
        Tariff tariffDb = tariffRepository.getTariffById(id);

        tariffDb.setType(requestTariffDto.type());
        tariffDb.setStatus(requestTariffDto.status());
        tariffDb.setDescription(requestTariffDto.description());
        tariffDb.setCost(requestTariffDto.cost());
        tariffDb.setCountGigabytes(requestTariffDto.countGigabytes());
        tariffDb.setCountMinutes(requestTariffDto.countMinutes());
        tariffDb.setCountSms(requestTariffDto.countSms());
        tariffDb.setUpdatedAt(LocalDateTime.now());

        Tariff newTariff = tariffRepository.save(tariffDb);
        return tariffMapper.toResponseDto(newTariff);
    }

    @Transactional
    public void deleteTariffById(Long id) {
        tariffRepository.deleteTariffById(id);
    }

    public ResponseTariffDto getTariffById(Long id) {
        Tariff tariff = tariffRepository.getTariffById(id);
        return tariffMapper.toResponseDto(tariff);
    }
}
