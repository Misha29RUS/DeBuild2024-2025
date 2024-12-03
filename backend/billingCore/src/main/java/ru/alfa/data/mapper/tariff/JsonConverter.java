package ru.alfa.data.mapper.tariff;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

import java.io.IOException;
import java.util.List;

/**
 * Конвертер для преобразования списка целых чисел ({@link List<Integer>}) в строку
 * JSON и обратно.
 */
@Converter
public class JsonConverter implements AttributeConverter<List<Integer>, String> {

    /**
     * Объект {@link ObjectMapper}, используемый для преобразования между
     * объектами Java и их представлением в формате JSON.
     */
    private final ObjectMapper objectMapper = new ObjectMapper();

    /**
     * Преобразует список целых чисел в строку JSON для хранения в базе данных.
     *
     * @param attribute список целых чисел, который необходимо преобразовать.
     * @return строка JSON, представляющая список целых чисел;
     * возвращает null, если входной список равен null.
     * @throws IllegalArgumentException если происходит ошибка при преобразовании
     *                                  списка в JSON.
     */
    @Override
    public String convertToDatabaseColumn(List<Integer> attribute) {
        try {
            return attribute == null ? null : objectMapper.writeValueAsString(attribute);
        } catch (JsonProcessingException e) {
            throw new IllegalArgumentException("Error converting list to JSON", e);
        }
    }

    /**
     * Преобразует строку JSON из базы данных обратно в список целых чисел.
     *
     * @param dbData строка JSON, представляющая список целых чисел;
     *               может быть null.
     * @return список целых чисел, полученный из строки JSON;
     * возвращает null, если входная строка равна null.
     * @throws IllegalArgumentException если происходит ошибка при чтении
     *                                  JSON из базы данных.
     */
    @Override
    public List<Integer> convertToEntityAttribute(String dbData) {
        try {
            return dbData == null ? null : objectMapper.readValue(dbData, new TypeReference<List<Integer>>() {
            });
        } catch (IOException e) {
            throw new IllegalArgumentException("Error reading JSON from database", e);
        }
    }
}
