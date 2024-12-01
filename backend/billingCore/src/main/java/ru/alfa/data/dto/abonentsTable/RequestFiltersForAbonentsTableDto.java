package ru.alfa.data.dto.abonentsTable;

import java.io.Serializable;
import java.util.List;

/**
 * DTO для передачи фильтров, используемых при запросе
 * данных абонентов в таблице.
 *
 * @param phoneNumber номер телефона абонента.
 * @param name имя абонента.
 * @param surname фамилия абонента.
 * @param patronymic отчество абонента.
 * @param tariffsIds список идентификаторов тарифов, по которым будет осуществляться фильтрация.
 * @param mobileServicesIds список идентификаторов мобильных услуг, по которым будет осуществляться фильтрация.
 */
public record RequestFiltersForAbonentsTableDto(String phoneNumber, String name, String surname,
                                                String patronymic, List<Long> tariffsIds,
                                                List<Long> mobileServicesIds) implements Serializable {
}
