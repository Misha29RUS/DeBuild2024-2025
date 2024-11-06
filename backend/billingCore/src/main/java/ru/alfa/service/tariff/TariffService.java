package ru.alfa.service.tariff;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.alfa.data.dto.tariff.RequestTariffDto;
import ru.alfa.data.dto.tariff.ResponseTariffDto;
import ru.alfa.data.entity.tariff.Tariff;
import ru.alfa.data.mapper.tariff.TariffMapper;
import ru.alfa.data.repository.tariff.TariffRepository;
import ru.alfa.exception.EntityNotFoundException;

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

    @Transactional
    public ResponseTariffDto createTariff(RequestTariffDto requestTariffDto) {
        Tariff tariff = tariffMapper.toEntity(requestTariffDto);
        tariff.setCreatedAt(LocalDateTime.now());
        tariff.setUpdatedAt(LocalDateTime.now());
        Tariff tariffDb = tariffRepository.save(tariff);
        return tariffMapper.toResponseDto(tariffDb);
    }

    @Transactional
    public ResponseTariffDto updateTariff(Long id, RequestTariffDto requestTariffDto) {
        Tariff tariffDb = tariffRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Tariff", id));

        Tariff newTariff = tariffMapper.toEntity(requestTariffDto);
        newTariff.setId(id);
        newTariff.getTariffResource().setId(id);
        newTariff.setUpdatedAt(LocalDateTime.now());
        newTariff.setCreatedAt(tariffDb.getCreatedAt());

        return tariffMapper.toResponseDto(tariffRepository.save(newTariff));
    }

    @Transactional
    public void deleteTariffById(Long id) {
        tariffRepository.deleteById(id);
    }

    public ResponseTariffDto getTariffById(Long id) {
        Tariff tariff = tariffRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Tariff", id));
        return tariffMapper.toResponseDto(tariff);
    }
}
