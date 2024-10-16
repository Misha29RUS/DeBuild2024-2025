BEGIN;

CREATE TABLE IF NOT EXISTS "user"
(
    "user_id"    BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    "name"       varchar,
    "surname"    varchar,
    "patronymic" varchar
);

CREATE TABLE IF NOT EXISTS user_credentials
(
    "user_id"       BIGINT PRIMARY KEY REFERENCES "user" (user_id),
    "phone_number"  varchar,
    "password_hash" varchar,
    "created_at"    timestamp,
    "updated_at"    timestamp,
    "is_active"     boolean
);

CREATE TABLE IF NOT EXISTS user_passport
(
    "user_id"         BIGINT PRIMARY KEY REFERENCES "user" (user_id),
    "passport_series" varchar(4),
    "passport_number" varchar(6),
    "date_of_birth"   Date,
    "issued_by_whom"  varchar,
    "department_code" varchar(6),
    "date_of_issue"   Date
);

CREATE TYPE employee_role AS ENUM ('super_admin', 'admin', 'operator');

CREATE TABLE IF NOT EXISTS employee
(
    "employee_id" BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    "role"        employee_role,
    "name"        varchar,
    "surname"     varchar,
    "patronymic"  varchar
);

CREATE TABLE IF NOT EXISTS employees_credentials
(
    "employee_id"   BIGINT PRIMARY KEY REFERENCES employee (employee_id),
    "email"         varchar,
    "password_hash" varchar,
    "created_at"    timestamp,
    "updated_at"    timestamp,
    "is_active"     boolean
);

/* фиксированный и настраиваемый*/
CREATE TYPE tariff_type AS ENUM ('fixed', 'customizable');
/* активный и неактивный*/
CREATE TYPE tariff_status AS ENUM ('active', 'hidden', 'deleted');

CREATE TABLE IF NOT EXISTS tariff
(
    "tariff_id"       BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    "type"            tariff_type,
    "status"          tariff_status,
    "name"            varchar,
    "description"     text,
    "cost"            decimal(10, 2),
    "count_minutes"   integer,
    "count_SMS"       integer,
    "count_Gigabytes" double precision,
    "created_at"      timestamp,
    "updated_at"      timestamp
);

CREATE TYPE service_status AS ENUM ('active', 'hidden', 'deleted');

CREATE TABLE IF NOT EXISTS service
(
    "service_id"       BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    "one_time_service" boolean,
    "status"           service_status,
    "name"             varchar,
    "description"      text,
    "cost"             decimal(10, 2),
    "count_minutes"    integer,
    "count_SMS"        integer,
    "count_Gigabytes"  double precision,
    "created_at"       timestamp,
    "updated_at"       timestamp
);

CREATE TABLE IF NOT EXISTS phone_number
(
    "phone_number_id" BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    "phone_number"    varchar,
    "user_id"         BIGINT REFERENCES "user" (user_id),
    "balance"         decimal(10, 2)
);

/* пополнение и снятие*/
CREATE TYPE history_type AS ENUM ('replenishment', 'withdrawal');

CREATE TABLE IF NOT EXISTS history_of_transactions
(
    "phone_number_id"       BIGINT PRIMARY KEY REFERENCES phone_number (phone_number_id),
    "type_of_transaction"   history_type,
    "name_of_transaction"   varchar,
    "amount_of_transaction" decimal(10, 2),
    "date_of_transaction"   timestamp
);

CREATE TABLE IF NOT EXISTS phone_number_service
(
    "phone_number_id"      BIGINT REFERENCES phone_number (phone_number_id),
    "service_id"           BIGINT REFERENCES service (service_id),
    "date_of_start_period" date,
    "date_of_end_period"   date,
    "remaining_minutes"    integer,
    "remaining_SMS"        integer,
    "remaining_Gigabytes"  double precision,
    PRIMARY KEY ("phone_number_id", "service_id")
);

CREATE TABLE IF NOT EXISTS phone_number_tariff
(
    "phone_number_id"                    BIGINT PRIMARY KEY REFERENCES phone_number (phone_number_id),
    "tariff_id"                          BIGINT REFERENCES tariff (tariff_id),
    "is_active"                          boolean,
    "date_of_start_period"               date,
    "date_of_end_period"                 date,
    "remaining_minutes"                  integer,
    "remaining_SMS"                      integer,
    "remaining_Gigabytes"                double precision,
    "count_minutes_at_start_of_period"   integer,
    "count_SMS_at_start_of_period"       integer,
    "count_Gigabytes_at_start_of_period" double precision
);

CREATE TABLE IF NOT EXISTS base_cost_of_resources
(
    "id"                BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    "cost_one_minute"   decimal(10, 2),
    "cost_one_SMS"      decimal(10, 2),
    "cost_one_Gigabyte" decimal(10, 2)
);

COMMIT;
