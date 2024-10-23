/* Скрипт для заполнения таблицы тариф */
INSERT INTO tariff ("type", "status", "name", "description", "cost", "count_minutes",
                    "count_SMS", "count_Gigabytes", "created_at", "updated_at")
VALUES
    ('fixed', 'active', 'Везде онлайн+', 'Фиксированный тариф с ограниченными ресурсами',
     600.0, 600, 50, 40.0, '2023-01-15 10:00:00', '2024-01-15 10:00:00'),

    ('customizable', 'active', 'Гибкий План', 'Настраиваемый тариф с гибкими опциями',
     350.0, 300, 25, 20.0, '2023-02-20 11:30:00', '2024-02-20 11:30:00'),

    ('fixed', 'hidden', 'Скрытое Сокровище', 'Этот тариф скрыт для особых клиентов',
     250.0, 200, 100, 4.0, '2023-03-10 09:45:00', '2024-03-10 09:45:00'),

    ('customizable', 'deleted', 'Старый Настраиваемый', 'Этот тариф больше недоступен',
     350.0, 400, 200, 10.0, '2023-04-05 14:00:00', '2024-04-05 14:00:00'),

    ('fixed', 'active', 'Мой онлайн', 'Доступный план для экономных пользователей',
     400.0, 500, 0, 15.0, '2023-05-18 08:15:00', '2024-05-18 08:15:00'),

    ('customizable', 'active', 'Премиум План', 'Высококачественный тариф для требовательных пользователей',
     800.0, 1000, 500, 50.0, '2023-06-22 12:45:00', '2024-06-22 12:45:00'),

    ('fixed', 'hidden', 'Тайный План', 'Тариф для избранных клиентов',
     200.0, 150, 75, 5.0, '2023-07-11 15:30:00', '2024-07-11 15:30:00'),

    ('customizable', 'active', 'Семейный План', 'Идеально подходит для всей семьи',
     950.0, 1200, 350, 80.0, '2023-08-30 10:10:00', '2024-08-30 10:10:00'),

    ('fixed', 'deleted', 'Антикризисный План', 'Тариф для экономии в сложные времена',
     300.0, 250, 200, 5.0, '2023-09-25 09:00:00', '2024-09-25 09:00:00'),

    ('customizable', 'active', 'Корпоративный План', 'Тариф для бизнеса с расширенными возможностями',
     1500.0, 2000, 1000, 100.0, '2023-10-15 11:00:00', '2024-10-15 11:00:00');

/* Скрипт для заполнения таблицы сервис */
INSERT INTO service ("one_time_service", "status", "name", "description", "cost",
                     "count_minutes", "count_SMS", "count_Gigabytes", "created_at", "updated_at")
VALUES
    (true, 'active', 'Мега смс', 'Пакет из 300 СМС',
     300.0, 0, 300, 0.0, '2023-01-10 09:00:00', '2024-01-10 09:00:00'),

    (false, 'active', 'Мега минуты', 'Пакет из 1000 минут',
     499.99, 1000, 0, 0.0, '2023-02-15 10:30:00', '2024-02-15 10:30:00'),

    (true, 'hidden', 'Тайный Бонус', 'Скрытая услуга для особых клиентов',
     199.99, 0, 50, 1.0, '2023-03-20 11:45:00', '2024-03-20 11:45:00'),

    (false, 'deleted', 'СМС Пакет', 'Пакет из 500 СМС',
     99.99, 0, 500, 0.0, '2023-04-25 13:00:00', '2024-04-25 13:00:00'),

    (false, 'active', 'Интернет 10 ГБ', 'Ежемесячный пакет мобильного интернета 10 ГБ',
     399.99, 0, 0, 10.0, '2023-05-30 14:15:00', '2024-05-30 14:15:00'),

    (true, 'active', 'Разовый Интернет', 'Разовая покупка 1 ГБ интернета',
     49.99, 0, 0, 1.0, '2023-06-12 15:30:00', '2024-06-12 15:30:00'),

    (true, 'hidden', 'Интернет 5 ГБ', 'Разовая покупка 5 ГБ интернета',
     230.99, 0, 0, 5.0, '2023-07-18 16:45:00', '2024-07-18 16:45:00'),

    (true, 'active', 'Разовый СМС Пакет', 'Пакет из 100 СМС, единоразово',
     99.99, 0, 100, 0.0, '2023-08-22 17:50:00', '2024-08-22 17:50:00'),

    (true, 'deleted', 'Интернет 10 ГБ', 'Разовая покупка 10 ГБ интернета',
     420.99, 0, 0, 10.0, '2023-09-27 18:05:00', '2024-09-27 18:05:00'),

    (true, 'hidden', 'Бонусные Минуты', '200 минут в подарок',
     0.0, 200, 0, 0.0, '2023-10-05 19:20:00', '2024-10-05 19:20:00');

/* Скрипт для заполнения таблицы user */
INSERT INTO "user" ("name", "surname", "patronymic")
VALUES
    ('Алексей', 'Иванов', 'Сергеевич'),
    ('Марина', 'Петрова', 'Александровна'),
    ('Дмитрий', 'Сидоров', 'Владимирович'),
    ('Екатерина', 'Кузнецова', 'Игоревна'),
    ('Игорь', 'Смирнов', 'Андреевич'),
    ('Анна', 'Новикова', 'Олеговна'),
    ('Сергей', 'Федоров', 'Анатольевич'),
    ('Людмила', 'Васильева', 'Николаевна'),
    ('Олег', 'Попов', 'Дмитриевич'),
    ('Наталья', 'Морозова', 'Сергеевна'),
    ('Андрей', 'Волков', 'Валерьевич'),
    ('Ольга', 'Зайцева', 'Константиновна'),
    ('Максим', 'Соловьёв', 'Евгеньевич'),
    ('Татьяна', 'Павлова', 'Алексеевна'),
    ('Владимир', 'Михайлов', 'Григорьевич'),
    ('Юлия', 'Семенова', 'Павловна'),
    ('Константин', 'Егоров', 'Романович'),
    ('Елена', 'Лебедева', 'Викторовна'),
    ('Николай', 'Козлов', 'Петрович'),
    ('Виктория', 'Кравцова', 'Ильинична');


/* Скрипт для заполнения таблицы user_passport */
INSERT INTO user_passport ("user_id", "passport_series", "passport_number", "date_of_birth", "issued_by_whom", "department_code", "date_of_issue")
VALUES
    (1, '4501', '123456', '1985-04-12', 'УВД района Иваново', '770001', '2005-05-20'),
    (2, '4502', '654321', '1990-07-23', 'УВД района Петрово', '770002', '2010-06-15'),
    (3, '4503', '112233', '1978-11-05', 'УВД района Сидорово', '770003', '1998-12-01'),
    (4, '4504', '334455', '1995-03-18', 'УВД района Кузнецово', '770004', '2015-08-10'),
    (5, '4505', '556677', '1982-08-30', 'УВД района Смирново', '770005', '2002-09-25'),
    (6, '4506', '778899', '1993-06-14', 'УВД района Новиково', '770006', '2013-11-21'),
    (7, '4507', '990011', '1980-12-01', 'УВД района Федорово', '770007', '2000-04-30'),
    (8, '4508', '223344', '1975-09-10', 'УВД района Васильево', '770008', '1995-02-14'),
    (9, '4509', '445566', '1988-01-27', 'УВД района Попово', '770009', '2008-07-19'),
    (10, '4510', '667788', '1992-05-05', 'УВД района Морозово', '770010', '2012-03-08'),
    (11, '4511', '889900', '1981-10-17', 'УВД района Волково', '770011', '2001-06-11'),
    (12, '4512', '001122', '1996-02-02', 'УВД района Зайцево', '770012', '2016-09-09'),
    (13, '4513', '334477', '1983-07-21', 'УВД района Соловьево', '770013', '2003-05-18'),
    (14, '4514', '556688', '1991-11-11', 'УВД района Павлово', '770014', '2011-10-02'),
    (15, '4515', '778899', '1979-03-03', 'УВД района Михайлово', '770015', '1999-12-27'),
    (16, '4516', '001133', '1986-08-08', 'УВД района Семеново', '770016', '2006-01-15'),
    (17, '4517', '445577', '1994-12-22', 'УВД района Егорово', '770017', '2014-07-07'),
    (18, '4518', '667799', '1987-04-14', 'УВД района Лебедево', '770018', '2007-11-05'),
    (19, '4519', '889911', '1998-09-09', 'УВД района Козлово', '770019', '2018-06-21'),
    (20, '4520', '002244', '1999-06-06', 'УВД района Кравцово', '770020', '2019-03-30');

/* Скрипт для заполнения таблицы phone_number */
INSERT INTO phone_number ("phone_number", "user_id", "balance")
VALUES
    ('79123456781', 1, 150.75),
    ('79123456782', 1, 300.50),
    ('79134567890', 2, 50.00),
    ('79134567891', 2, 75.25),
    ('79145678901', 3, 200.00),
    ('79145678902', 3, 125.10),
    ('79156789012', 4, 500.50),
    ('79156789013', 4, 600.00),
    ('79167890123', 5, 80.20),
    ('79167890124', 6, 20.00),
    ('79178901234', 7, 400.40),
    ('79178901235', 8, 150.00),
    ('79189012345', 9, 200.75),
    ('79189012346', 10, 300.30),
    ('79190123456', 11, 50.00),
    ('79190123457', 12, 75.25),
    ('79201234567', 13, 200.00),
    ('79201234568', 14, 125.10),
    ('79212345678', 15, 500.50),
    ('79212345679', 16, 600.00),
    ('79223456789', 17, 80.20),
    ('79223456790', 18, 20.00),
    ('79234567890', 19, 400.40),
    ('79234567891', 20, 150.00),
    ('79245678901', 1, 200.75),
    ('79245678902', 2, 300.30),
    ('79256789012', 3, 50.00),
    ('79256789013', 4, 75.25),
    ('79267890123', 5, 200.00),
    ('79267890124', 6, 125.10);

/* Скрипт для заполнения таблицы phone_number_service */
INSERT INTO phone_number_service ("phone_number_id", "service_id", "date_of_start_period", "date_of_end_period", "remaining_minutes", "remaining_SMS", "remaining_Gigabytes")
VALUES
    (1, 1, '2024-01-01', '2024-01-31', 0, 300, 0.0),
    (1, 2, '2024-01-01', '2024-01-31', 1000, 0, 0.0),
    (2, 3, '2024-01-01', '2024-01-31', 0, 50, 1.0),
    (2, 4, '2024-01-01', '2024-01-31', 0, 500, 0.0),
    (3, 5, '2024-01-01', '2024-01-31', 0, 0, 10.0),
    (3, 6, '2024-01-01', '2024-01-31', 0, 0, 1.0),
    (4, 7, '2024-01-01', '2024-01-31', 0, 0, 5.0),
    (4, 8, '2024-01-01', '2024-01-31', 0, 100, 0.0),
    (5, 9, '2024-01-01', '2024-01-31', 0, 0, 10.0),
    (5, 10, '2024-01-01', '2024-01-31', 200, 0, 0.0),
    (6, 1, '2024-01-01', '2024-01-31', 0, 300, 0.0),
    (6, 2, '2024-01-01', '2024-01-31', 1000, 0, 0.0),
    (7, 3, '2024-01-01', '2024-01-31', 0, 50, 1.0),
    (7, 4, '2024-01-01', '2024-01-31', 0, 500, 0.0),
    (8, 5, '2024-01-01', '2024-01-31', 0, 0, 10.0),
    (8, 6, '2024-01-01', '2024-01-31', 0, 0, 1.0),
    (9, 7, '2024-01-01', '2024-01-31', 0, 0, 5.0),
    (9, 8, '2024-01-01', '2024-01-31', 0, 100, 0.0),
    (10, 9, '2024-01-01', '2024-01-31', 0, 0, 10.0),
    (10, 10, '2024-01-01', '2024-01-31', 200, 0, 0.0),
    (11, 1, '2024-01-01', '2024-01-31', 0, 300, 0.0),
    (11, 2, '2024-01-01', '2024-01-31', 1000, 0, 0.0),
    (12, 3, '2024-01-01', '2024-01-31', 0, 50, 1.0),
    (12, 4, '2024-01-01', '2024-01-31', 0, 500, 0.0),
    (13, 5, '2024-01-01', '2024-01-31', 0, 0, 10.0),
    (13, 6, '2024-01-01', '2024-01-31', 0, 0, 1.0),
    (14, 7, '2024-01-01', '2024-01-31', 0, 0, 5.0),
    (15, 8, '2024-01-01', '2024-01-31', 0, 100, 0.0),
    (15, 9, '2024-01-01', '2024-01-31', 0, 0, 10.0),
    (16, 10, '2024-01-01', '2024-01-31', 200, 0, 0.0),
    (16, 1, '2024-01-01', '2024-01-31', 0, 300, 0.0),
    (17, 2, '2024-01-01', '2024-01-31', 1000, 0, 0.0),
    (17, 3, '2024-01-01', '2024-01-31', 0, 50, 1.0),
    (18, 4, '2024-01-01', '2024-01-31', 0, 500, 0.0),
    (18, 5, '2024-01-01', '2024-01-31', 0, 0, 10.0),
    (19, 6, '2024-01-01', '2024-01-31', 0, 0, 1.0),
    (19, 7, '2024-01-01', '2024-01-31', 0, 0, 5.0),
    (20, 8, '2024-01-01', '2024-01-31', 0, 100, 0.0),
    (20, 9, '2024-01-01', '2024-01-31', 0, 0, 10.0),
    (21, 10, '2024-01-01', '2024-01-31', 200, 0, 0.0),
    (21, 1, '2024-01-01', '2024-01-31', 0, 300, 0.0),
    (22, 2, '2024-01-01', '2024-01-31', 1000, 0, 0.0),
    (22, 3, '2024-01-01', '2024-01-31', 0, 50, 1.0),
    (23, 4, '2024-01-01', '2024-01-31', 0, 500, 0.0),
    (23, 5, '2024-01-01', '2024-01-31', 0, 0, 10.0),
    (24, 6, '2024-01-01', '2024-01-31', 0, 0, 1.0),
    (24, 7, '2024-01-01', '2024-01-31', 0, 0, 5.0),
    (25, 8, '2024-01-01', '2024-01-31', 0, 100, 0.0),
    (25, 9, '2024-01-01', '2024-01-31', 0, 0, 10.0),
    (26, 10, '2024-01-01', '2024-01-31', 200, 0, 0.0),
    (26, 1, '2024-01-01', '2024-01-31', 0, 300, 0.0),
    (27, 2, '2024-01-01', '2024-01-31', 1000, 0, 0.0),
    (28, 3, '2024-01-01', '2024-01-31', 0, 50, 1.0),
    (28, 4, '2024-01-01', '2024-01-31', 0, 500, 0.0),
    (29, 5, '2024-01-01', '2024-01-31', 0, 0, 10.0),
    (30, 6, '2024-01-01', '2024-01-31', 0, 0, 1.0);

/* Скрипт для заполнения таблицы phone_number_tariff */
INSERT INTO phone_number_tariff ("phone_number_id", "tariff_id", "is_active", "date_of_start_period",
                                 "date_of_end_period", "remaining_minutes", "remaining_SMS",
                                 "remaining_Gigabytes", "count_minutes_at_start_of_period",
                                 "count_SMS_at_start_of_period", "count_Gigabytes_at_start_of_period")
VALUES
    (1, 1, true, '2024-01-15', '2025-01-15', 600, 50, 40.0, 600, 50, 40.0),
    (2, 2, true, '2024-02-20', '2025-02-20', 300, 25, 20.0, 300, 25, 20.0),
    (3, 3, true, '2024-03-10', '2025-03-10', 200, 100, 4.0, 200, 100, 4.0),
    (4, 4, true, '2024-04-05', '2025-04-05', 400, 200, 10.0, 400, 200, 10.0),
    (5, 5, true, '2024-05-18', '2025-05-18', 500, 0, 15.0, 500, 0, 15.0),
    (6, 6, true, '2024-06-22', '2025-06-22', 1000, 500, 50.0, 1000, 500, 50.0),
    (7, 7, true, '2024-07-11', '2025-07-11', 150, 75, 5.0, 150, 75, 5.0),
    (8, 8, true, '2024-08-30', '2025-08-30', 1200, 350, 80.0, 1200, 350, 80.0),
    (9, 9, true, '2024-09-25', '2025-09-25', 250, 200, 5.0, 250, 200, 5.0),
    (10, 10, true, '2024-10-15', '2025-10-15', 2000, 1000, 100.0, 2000, 1000, 100.0),
    (11, 1, true, '2024-01-15', '2025-01-15', 600, 50, 40.0, 600, 50, 40.0),
    (12, 2, true, '2024-02-20', '2025-02-20', 300, 25, 20.0, 300, 25, 20.0),
    (13, 3, true, '2024-03-10', '2025-03-10', 200, 100, 4.0, 200, 100, 4.0),
    (14, 4, true, '2024-04-05', '2025-04-05', 400, 200, 10.0, 400, 200, 10.0),
    (15, 5, true, '2024-05-18', '2025-05-18', 500, 0, 15.0, 500, 0, 15.0),
    (16, 6, true, '2024-06-22', '2025-06-22', 1000, 500, 50.0, 1000, 500, 50.0),
    (17, 7, true, '2024-07-11', '2025-07-11', 150, 75, 5.0, 150, 75, 5.0),
    (18, 8, true, '2024-08-30', '2025-08-30', 1200, 350, 80.0, 1200, 350, 80.0),
    (19, 9, true, '2024-09-25', '2025-09-25', 250, 200, 5.0, 250, 200, 5.0),
    (20, 10, true, '2024-10-15', '2025-10-15', 2000, 1000, 100.0, 2000, 1000, 100.0),
    (21, 1, true, '2024-01-15', '2025-01-15', 600, 50, 40.0, 600, 50, 40.0),
    (22, 2, true, '2024-02-20', '2025-02-20', 300, 25, 20.0, 300, 25, 20.0),
    (23, 3, true, '2024-03-10', '2025-03-10', 200, 100, 4.0, 200, 100, 4.0),
    (24, 4, true, '2024-04-05', '2025-04-05', 400, 200, 10.0, 400, 200, 10.0),
    (25, 5, true, '2024-05-18', '2025-05-18', 500, 0, 15.0, 500, 0, 15.0),
    (26, 6, true, '2024-06-22', '2025-06-22', 1000, 500, 50.0, 1000, 500, 50.0),
    (27, 7, true, '2024-07-11', '2025-07-11', 150, 75, 5.0, 150, 75, 5.0),
    (28, 8, true, '2024-08-30', '2025-08-30', 1200, 350, 80.0, 1200, 350, 80.0),
    (29, 9, true, '2024-09-25', '2025-09-25', 250, 200, 5.0, 250, 200, 5.0),
    (30, 10, true, '2024-10-15', '2025-10-15', 2000, 1000, 100.0, 2000, 1000, 100.0);

