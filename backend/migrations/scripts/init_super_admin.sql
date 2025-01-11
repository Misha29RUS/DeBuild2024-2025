INSERT INTO employee (name, surname, patronymic)
VALUES ('Супер админ', 'Корпоративный', 'Аккаунт');
INSERT INTO employees_credentials (employee_id, email, password_hash, role, created_at, updated_at, status)
VALUES (1, 'billingsystemofficial@gmail.com', '$2a$10$0w1/kpSf9xTb.VUx1kgfe.zLf9AX5WBfPyJX7YTEdRBlfXMkfRuN2',
        'ROLE_SUPER_ADMIN', now(), now(), 'VERIFIED');