package ru.alfa.data.repository.phoneNumber;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.alfa.data.entity.phoneNumber.HistoryOfTransaction;

public interface HistoryOfTransactionRepository extends JpaRepository<HistoryOfTransaction, Long> {
}