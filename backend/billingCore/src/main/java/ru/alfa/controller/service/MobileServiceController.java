package ru.alfa.controller.service;

import io.swagger.v3.oas.annotations.Parameter;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import ru.alfa.data.dto.service.RequestMobileServiceDto;
import ru.alfa.data.dto.service.ResponseMobileServiceDto;
import ru.alfa.service.service.MobileServiceService;

import java.util.List;

@RestController
@RequestMapping("/api/service")
@RequiredArgsConstructor
@Validated
public class MobileServiceController {

    private final MobileServiceService mobileServiceService;

    @GetMapping
    public ResponseEntity<List<ResponseMobileServiceDto>> getAllServices(){
        List<ResponseMobileServiceDto> services = mobileServiceService.getAllServices();
        return ResponseEntity.ok(services);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResponseMobileServiceDto> getServiceById(
            @Parameter(name = "id", description = "Идентификатор услуги", example = "1")
            @NotNull @Positive @PathVariable("id") Long id) {
        ResponseMobileServiceDto responseMobileServiceDto = mobileServiceService.getServiceById(id);
        return ResponseEntity.ok(responseMobileServiceDto);

    }

    @PostMapping
    public ResponseEntity<ResponseMobileServiceDto> createService(@RequestBody @Validated
                                                                  RequestMobileServiceDto requestMobileServiceDto){
        ResponseMobileServiceDto createdService = mobileServiceService.createService(requestMobileServiceDto);
        return ResponseEntity.ok(createdService);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ResponseMobileServiceDto> updateService(
            @Parameter(name = "id", description = "Идентификатор услуги", example = "1")
            @NotNull @Positive @PathVariable("id") Long id,
            @RequestBody @Validated RequestMobileServiceDto requestMobileServiceDto){
        ResponseMobileServiceDto updateService = mobileServiceService.updateService(id, requestMobileServiceDto);
        return ResponseEntity.ok(updateService);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteService(
            @Parameter(name = "id", description = "Идентификатор тарифа", example = "1")
            @NotNull @Positive @PathVariable("id") Long id) {
        mobileServiceService.deleteMobileServiceById(id);
        return ResponseEntity.noContent().build();
    }
}
