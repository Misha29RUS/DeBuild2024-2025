package ru.alfa.service.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.alfa.data.dto.service.RequestMobileServiceDto;
import ru.alfa.data.dto.service.ResponseMobileServiceDto;
import ru.alfa.data.entity.service.MobileService;
import ru.alfa.data.mapper.service.MobileServiceMapper;
import ru.alfa.data.repository.service.MobileServiceRepository;
import ru.alfa.exception.EntityNotFoundException;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MobileServiceService {

    private final MobileServiceRepository mobileServiceRepository;

    private final MobileServiceMapper mobileServiceMapper;

    public List<ResponseMobileServiceDto> getAllServices() {
        return mobileServiceRepository.findAll().stream()
                .map(mobileServiceMapper::toResponseDto)
                .toList();
    }

    public ResponseMobileServiceDto createService(RequestMobileServiceDto requestMobileServiceDto) {
        MobileService mobileService = mobileServiceMapper.toEntity(requestMobileServiceDto);
        mobileService.setCreatedAt(LocalDateTime.now());
        mobileService.setUpdatedAt(LocalDateTime.now());
        MobileService mobileServiceDb = mobileServiceRepository.save(mobileService);
        return mobileServiceMapper.toResponseDto(mobileServiceDb);
    }

    @Transactional
    public ResponseMobileServiceDto updateService(Long id, RequestMobileServiceDto requestMobileServiceDto) {
        MobileService mobileServiceDb = mobileServiceRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(id));

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

    @Transactional
    public void deleteMobileServiceById(Long id) {
        mobileServiceRepository.deleteById(id);
    }

    public ResponseMobileServiceDto getServiceById(Long id) {
        MobileService mobileService = mobileServiceRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(id));
        return mobileServiceMapper.toResponseDto(mobileService);
    }
}
