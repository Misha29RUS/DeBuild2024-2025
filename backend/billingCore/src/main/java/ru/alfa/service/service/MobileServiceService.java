package ru.alfa.service.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.alfa.data.dto.service.RequestMobileServiceDto;
import ru.alfa.data.dto.service.ResponseMobileServiceDto;
import ru.alfa.data.entity.service.MobileService;
import ru.alfa.data.entity.tariff.Tariff;
import ru.alfa.data.mapper.service.MobileServiceMapper;
import ru.alfa.data.repository.service.MobileServiceRepository;
import ru.alfa.exception.CreateException;
import ru.alfa.exception.EntityNotFoundException;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

/**
 * Сервис для управления мобильными услугами.
 * Этот класс предоставляет методы для создания, обновления, удаления и получения мобильных услуг.
 */
@Service
@RequiredArgsConstructor
public class MobileServiceService {

    /**
     * Репозиторий для работы с мобильными услугами.
     */
    private final MobileServiceRepository mobileServiceRepository;

    /**
     * Маппер для преобразования между сущностями мобильных услуг и DTO.
     */
    private final MobileServiceMapper mobileServiceMapper;

    /**
     * Возвращает список всех мобильных услуг.
     *
     * @return Список DTO всех мобильных услуг.
     */
    public List<ResponseMobileServiceDto> getAllServices() {
        return mobileServiceRepository.findAll().stream()
                .map(mobileServiceMapper::toResponseDto)
                .toList();
    }

    /**
     * Создает новую мобильную услугу на основе переданного DTO.
     *
     * @param requestMobileServiceDto DTO с данными для создания мобильной услуги.
     * @return DTO созданной мобильной услуги.
     */
    public ResponseMobileServiceDto createService(RequestMobileServiceDto requestMobileServiceDto) {
        Optional<MobileService> existingService = mobileServiceRepository.findByName(requestMobileServiceDto.name());
        if (existingService.isPresent()){
            throw new CreateException("Услуга с таким названием уже существует");
        }
        MobileService mobileService = mobileServiceMapper.toEntity(requestMobileServiceDto);
        mobileService.setCreatedAt(LocalDateTime.now());
        mobileService.setUpdatedAt(LocalDateTime.now());
        MobileService mobileServiceDb = mobileServiceRepository.save(mobileService);
        return mobileServiceMapper.toResponseDto(mobileServiceDb);
    }

    /**
     * Обновляет существующую мобильную услугу по ее идентификатору.
     *
     * @param id                      Идентификатор мобильной услуги, которую необходимо обновить.
     * @param requestMobileServiceDto DTO с новыми данными для обновления услуги.
     * @return DTO обновленной мобильной услуги.
     * @throws EntityNotFoundException Если мобильная услуга с указанным идентификатором не найдена.
     */
    @Transactional
    public ResponseMobileServiceDto updateService(Long id, RequestMobileServiceDto requestMobileServiceDto) {
        MobileService mobileServiceDb = mobileServiceRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Mobile service", id));

        mobileServiceDb.setOneTimeService(requestMobileServiceDto.oneTimeService());
        mobileServiceDb.setStatus(requestMobileServiceDto.status());
        mobileServiceDb.setType(requestMobileServiceDto.type());
        mobileServiceDb.setName(requestMobileServiceDto.name());
        mobileServiceDb.setDescription(requestMobileServiceDto.description());
        mobileServiceDb.setCost(requestMobileServiceDto.cost());
        mobileServiceDb.setCountResources(requestMobileServiceDto.countResources());
        mobileServiceDb.setUpdatedAt(LocalDateTime.now());

        MobileService newService = mobileServiceRepository.save(mobileServiceDb);
        return mobileServiceMapper.toResponseDto(newService);
    }

    /**
     * Удаляет мобильную услугу по ее идентификатору.
     *
     * @param id Идентификатор мобильной услуги, которую необходимо удалить.
     */
    @Transactional
    public void deleteMobileServiceById(Long id) {
        mobileServiceRepository.deleteById(id);
    }

    /**
     * Получает мобильную услугу по ее идентификатору.
     *
     * @param id Идентификатор мобильной услуги, которую необходимо получить.
     * @return DTO запрашиваемой мобильной услуги.
     * @throws EntityNotFoundException Если мобильная услуга с указанным идентификатором не найдена.
     */
    public ResponseMobileServiceDto getServiceById(Long id) {
        MobileService mobileService = mobileServiceRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Mobile service", id));
        return mobileServiceMapper.toResponseDto(mobileService);
    }
}
