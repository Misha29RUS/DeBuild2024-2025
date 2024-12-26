package ru.alfa.service.tariff;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.alfa.data.dto.tariff.RequestTariffDto;
import ru.alfa.data.dto.tariff.ResponseTariffDto;
import ru.alfa.data.entity.tariff.Tariff;
import ru.alfa.data.mapper.tariff.TariffMapper;
import ru.alfa.data.repository.tariff.TariffRepository;
import ru.alfa.exception.CreateException;
import ru.alfa.exception.EntityNotFoundException;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

/**
 * Сервис для управления тарифами.
 * Этот класс предоставляет методы для создания, обновления, удаления и получения тарифов.
 */
@Service
@RequiredArgsConstructor
public class TariffService {

    /**
     * Репозиторий для работы с тарифами.
     */
    private final TariffRepository tariffRepository;

    /**
     * Маппер для преобразования между сущностями тарифов и DTO.
     */
    private final TariffMapper tariffMapper;

    /**
     * Возвращает список всех тарифов.
     */
    public List<ResponseTariffDto> getAllTariffs() {
        return tariffRepository.findAll().stream()
                .map(tariffMapper::toResponseDto)
                .toList();
    }

    /**
     * Создает новый тариф на основе переданного DTO.
     *
     * @param requestTariffDto DTO с данными для создания тарифа.
     * @return DTO созданного тарифа.
     */
    @Transactional
    public ResponseTariffDto createTariff(RequestTariffDto requestTariffDto) {
        Optional<Tariff> existingTariff = tariffRepository.findByName(requestTariffDto.name());
        if (existingTariff.isPresent()){
            throw new CreateException("Тариф с таким названием уже существует");
        }
        Tariff tariff = tariffMapper.toEntity(requestTariffDto);
        tariff.setCreatedAt(LocalDateTime.now());
        tariff.setUpdatedAt(LocalDateTime.now());
        Tariff tariffDb = tariffRepository.save(tariff);
        return tariffMapper.toResponseDto(tariffDb);
    }

    /**
     * Обновляет существующий тариф по его идентификатору.
     *
     * @param id               Идентификатор тарифа, который необходимо обновить.
     * @param requestTariffDto DTO с новыми данными для обновления тарифа.
     * @return DTO обновленного тарифа.
     * @throws EntityNotFoundException Если тариф с указанным идентификатором не найден.
     */
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

    /**
     * Удаляет тариф по его идентификатору.
     *
     * @param id Идентификатор тарифа, который необходимо удалить.
     */
    @Transactional
    public void deleteTariffById(Long id) {
        tariffRepository.deleteById(id);
    }

    /**
     * Получает тариф по его идентификатору.
     *
     * @param id Идентификатор тарифа, который необходимо получить.
     * @return DTO запрашиваемого тарифа.
     * @throws EntityNotFoundException Если тариф с указанным идентификатором не найден.
     */
    public ResponseTariffDto getTariffById(Long id) {
        Tariff tariff = tariffRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Tariff", id));
        return tariffMapper.toResponseDto(tariff);
    }
}
