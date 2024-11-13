package ru.alfa.data.dto.abonentsTable;

import java.io.Serializable;
import java.util.List;

public record RequestFiltersForAbonentsTableDto(String phoneNumber, String name, String surname,
                                                String patronymic, List<Long> tariffsIds,
                                                List<Long> mobileServicesIds) implements Serializable {
}
