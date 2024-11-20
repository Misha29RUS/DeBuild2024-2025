export interface TariffDetails {
  name_tariff: string;
  count_minute: number | number[];
  count_internet: number | number[];
  count_message: number | number[];
  tariff_format: "custom" | "fixed";
  price?: number;
  price_minute: number;
  price_internet: number;
  price_message: number;
  description: string;
  created_at: Date;
  edited_at: Date;
}

export interface ServiceDetails {
  name_tariff: string;
  count_minute?: number;
  count_internet?: number;
  count_message?: number;
}

export interface Tariff {
  type: "active" | "archive";
  details: TariffDetails;
}

export interface Service {
  type: "internet" | "call" | "message";
  details: ServiceDetails;
}

export interface FinancialOperation {
  operation_date: Date;
  operation_quantity: number;
  operation_type: "top_up_balance" | "payment_tariff" | "payment_service";
}

export interface UserDetails {
  id: number;
  lastName: string;
  firstName: string;
  middleName: string;
  phoneNumber: string;
  birthDate: string;
  passportSeries: string;
  passportNumber: string;
  tariff: Tariff;
  services: Service[];
  balance: number;
  financialOperations: FinancialOperation[];
}

export const users: UserDetails[] = [
  {
    id: 1,
    lastName: "Иванов",
    firstName: "Иван",
    middleName: "Иванович",
    phoneNumber: "+7(900)123-45-67",
    birthDate: "11.11.1987",
    passportSeries: "4510",
    passportNumber: "123456",
    tariff: {
      type: "active",
      details: {
        name_tariff: "Премиум",
        tariff_format: "fixed",
        price: 800,
        description: "Тариф 'Премиум' предлагает расширенные пакеты интернета, звонков и SMS, обеспечивая свободу общения и высокий комфорт. Пользователи получают больше минут и гигабайтов, чтобы оставаться на связи даже в самых активных днях. Это идеальный выбор для тех, кто ищет баланс между выгодой и широкими возможностями.",
        created_at: new Date(2024, 8, 13),
        edited_at: new Date(2024, 8, 13),
        price_minute: 1,
        price_internet: 20,
        price_message: 1,
        count_minute: 1000,
        count_internet: 50,
        count_message: 500,
      },
    },
    services: [
      {
        type: "internet",
        details: { name_tariff: "Интернет 10Гб", count_internet: 10 },
      },
      {
        type: "call",
        details: { name_tariff: "150 минут", count_minute: 150 },
      },
      {
        type: "message",
        details: { name_tariff: "10 СМС", count_message: 10 },
      },
      {
        type: "message",
        details: { name_tariff: "20 СМС", count_message: 20 },
      },
    ],
    balance: 150,
    financialOperations: [
      {
        operation_date: new Date("2024-02-15T22:00:00"),
        operation_quantity: 400,
        operation_type: "top_up_balance",
      },
      {
        operation_date: new Date("2024-01-10T21:15:00"),
        operation_quantity: 120,
        operation_type: "payment_tariff",
      },
      {
        operation_date: new Date("2023-12-01T20:30:00"),
        operation_quantity: 300,
        operation_type: "payment_service",
      },
      {
        operation_date: new Date("2023-11-20T19:45:00"),
        operation_quantity: 1500,
        operation_type: "top_up_balance",
      },
      {
        operation_date: new Date("2023-10-15T18:00:00"),
        operation_quantity: 800,
        operation_type: "top_up_balance",
      },
      {
        operation_date: new Date("2022-09-10T17:15:00"),
        operation_quantity: 90,
        operation_type: "payment_tariff",
      },
      {
        operation_date: new Date("2022-08-05T16:30:00"),
        operation_quantity: 50,
        operation_type: "payment_service",
      },
      {
        operation_date: new Date("2022-07-01T15:05:00"),
        operation_quantity: 1200,
        operation_type: "top_up_balance",
      },
      {
        operation_date: new Date("2021-06-10T14:10:00"),
        operation_quantity: 350,
        operation_type: "top_up_balance",
      },
      {
        operation_date: new Date("2021-05-05T13:20:00"),
        operation_quantity: 200,
        operation_type: "payment_tariff",
      },
      {
        operation_date: new Date("2021-04-01T12:45:00"),
        operation_quantity: 500,
        operation_type: "top_up_balance",
      },
      {
        operation_date: new Date("2020-03-25T11:00:00"),
        operation_quantity: 75,
        operation_type: "payment_service",
      },
      {
        operation_date: new Date("2020-02-20T10:30:00"),
        operation_quantity: 120,
        operation_type: "payment_tariff",
      },
      {
        operation_date: new Date("2020-01-15T09:15:00"),
        operation_quantity: 300,
        operation_type: "top_up_balance",
      },
    ],
  },
  {
    id: 2,
    lastName: "Петров",
    firstName: "Петр",
    middleName: "Петрович",
    phoneNumber: "+7(900)123-45-68",
    birthDate: "20.09.1990",
    passportSeries: "4521",
    passportNumber: "654321",
    tariff: {
      type: "active",
      details: {
        name_tariff: "Базовый",
        tariff_format: "fixed",
        price: 500,
        description: "Тариф 'Премиум' предлагает расширенные пакеты интернета, звонков и SMS, обеспечивая свободу общения и высокий комфорт. Пользователи получают больше минут и гигабайтов, чтобы оставаться на связи даже в самых активных днях. Это идеальный выбор для тех, кто ищет баланс между выгодой и широкими возможностями.",
        created_at: new Date(2024, 8, 13),
        edited_at: new Date(2024, 8, 13),
        price_minute: 1,
        price_internet: 20,
        price_message: 1,
        count_minute: 500,
        count_internet: 10,
        count_message: 100,
      },
    },
    services: [
      {
        type: "internet",
        details: { name_tariff: "Интернет 15Гб", count_internet: 15 },
      },
      {
        type: "call",
        details: { name_tariff: "300 минут", count_minute: 300 },
      },
      {
        type: "message",
        details: { name_tariff: "100 СМС", count_message: 100 },
      },
    ],
    balance: 0,
    financialOperations: [],
  },
  {
    id: 3,
    lastName: "Сидоров",
    firstName: "Сергей",
    middleName: "Сергеевич",
    phoneNumber: "+7(900)123-45-69",
    birthDate: "06.01.2001",
    passportSeries: "4532",
    passportNumber: "789123",
    tariff: {
      type: "archive",
      details: {
        name_tariff: "Стандарт",
        tariff_format: "fixed",
        price: 450,
        description: "Тариф 'Премиум' предлагает расширенные пакеты интернета, звонков и SMS, обеспечивая свободу общения и высокий комфорт. Пользователи получают больше минут и гигабайтов, чтобы оставаться на связи даже в самых активных днях. Это идеальный выбор для тех, кто ищет баланс между выгодой и широкими возможностями.",
        created_at: new Date(2024, 8, 13),
        edited_at: new Date(2024, 8, 13),
        price_minute: 1,
        price_internet: 20,
        price_message: 1,
        count_minute: 300,
        count_internet: 5,
        count_message: 50,
      },
    },
    services: [],
    balance: 325,
    financialOperations: [
      {
        operation_date: new Date("2024-03-25T11:00:00"),
        operation_quantity: 75,
        operation_type: "payment_tariff",
      },
      {
        operation_date: new Date("2024-02-25T11:00:00"),
        operation_quantity: 75,
        operation_type: "payment_tariff",
      },
      {
        operation_date: new Date("2024-02-15T22:00:00"),
        operation_quantity: 475,
        operation_type: "top_up_balance",
      },
    ],
  },
  {
    id: 4,
    lastName: "Кузнецов",
    firstName: "Константин",
    middleName: "Кузьмич",
    phoneNumber: "+7(900)123-45-70",
    birthDate: "15.03.1985",
    passportSeries: "4543",
    passportNumber: "321654",
    tariff: {
      type: "active",
      details: {
        name_tariff: "Комфорт",
        tariff_format: "fixed",
        price: 700,
        description: "Тариф 'Премиум' предлагает расширенные пакеты интернета, звонков и SMS, обеспечивая свободу общения и высокий комфорт. Пользователи получают больше минут и гигабайтов, чтобы оставаться на связи даже в самых активных днях. Это идеальный выбор для тех, кто ищет баланс между выгодой и широкими возможностями.",
        created_at: new Date(2024, 8, 13),
        edited_at: new Date(2024, 8, 13),
        price_minute: 1,
        price_internet: 20,
        price_message: 1,
        count_minute: 700,
        count_internet: 20,
        count_message: 200,
      },
    },
    services: [
      {
        type: "call",
        details: { name_tariff: "200 минут", count_minute: 200 },
      },
    ],
    balance: 500,
    financialOperations: [
      {
        operation_date: new Date("2024-03-25T11:00:00"),
        operation_quantity: 75,
        operation_type: "payment_service",
      },
      {
        operation_date: new Date("2023-02-15T22:00:00"),
        operation_quantity: 300,
        operation_type: "top_up_balance",
      },
      {
        operation_date: new Date("2022-02-15T22:00:00"),
        operation_quantity: 475,
        operation_type: "top_up_balance",
      },
    ],
  },
  {
    id: 5,
    lastName: "Смирнов",
    firstName: "Семен",
    middleName: "Семенович",
    phoneNumber: "+7(900)123-45-71",
    birthDate: "10.07.1978",
    passportSeries: "4554",
    passportNumber: "147258",
    tariff: {
      type: "archive",
      details: {
        name_tariff: "Эконом",
        tariff_format: "fixed",
        price: 300,
        description: "Тариф 'Премиум' предлагает расширенные пакеты интернета, звонков и SMS, обеспечивая свободу общения и высокий комфорт. Пользователи получают больше минут и гигабайтов, чтобы оставаться на связи даже в самых активных днях. Это идеальный выбор для тех, кто ищет баланс между выгодой и широкими возможностями.",
        created_at: new Date(2024, 8, 13),
        edited_at: new Date(2024, 8, 13),
        price_minute: 1,
        price_internet: 20,
        price_message: 1,
        count_minute: 200,
        count_internet: 2,
        count_message: 30,
      },
    },
    services: [],
    balance: 1000,
    financialOperations: [
      {
        operation_date: new Date("2022-11-25T22:00:00"),
        operation_quantity: 1000,
        operation_type: "top_up_balance",
      },
    ],
  },
  {
    id: 6,
    lastName: "Волков",
    firstName: "Владимир",
    middleName: "Владимирович",
    phoneNumber: "+7(900)123-45-72",
    birthDate: "22.04.1992",
    passportSeries: "4565",
    passportNumber: "963852",
    tariff: {
      type: "active",
      details: {
        name_tariff: "Универсальный",
        tariff_format: "fixed",
        price: 600,
        description: "Тариф 'Премиум' предлагает расширенные пакеты интернета, звонков и SMS, обеспечивая свободу общения и высокий комфорт. Пользователи получают больше минут и гигабайтов, чтобы оставаться на связи даже в самых активных днях. Это идеальный выбор для тех, кто ищет баланс между выгодой и широкими возможностями.",
        created_at: new Date(2024, 8, 13),
        edited_at: new Date(2024, 8, 13),
        price_minute: 1,
        price_internet: 20,
        price_message: 1,
        count_minute: 600,
        count_internet: 15,
        count_message: 120,
      },
    },
    services: [
      {
        type: "internet",
        details: { name_tariff: "Интернет 15Гб", count_internet: 15 },
      },
      {
        type: "call",
        details: { name_tariff: "300 минут", count_minute: 300 },
      },
    ],
    balance: 825,
    financialOperations: [
      {
        operation_date: new Date("2024-03-25T11:00:00"),
        operation_quantity: 75,
        operation_type: "payment_tariff",
      },
      {
        operation_date: new Date("2024-03-25T11:00:00"),
        operation_quantity: 100,
        operation_type: "payment_service",
      },
      {
        operation_date: new Date("2022-11-25T22:00:00"),
        operation_quantity: 1000,
        operation_type: "top_up_balance",
      },
    ],
  },
  {
    id: 7,
    lastName: "Федоров",
    firstName: "Федор",
    middleName: "Федорович",
    phoneNumber: "+7(900)123-45-73",
    birthDate: "30.12.1989",
    passportSeries: "4576",
    passportNumber: "741852",
    tariff: {
      type: "active",
      details: {
        name_tariff: "Оптимальный",
        tariff_format: "fixed",
        price: 500,
        description: "Тариф 'Премиум' предлагает расширенные пакеты интернета, звонков и SMS, обеспечивая свободу общения и высокий комфорт. Пользователи получают больше минут и гигабайтов, чтобы оставаться на связи даже в самых активных днях. Это идеальный выбор для тех, кто ищет баланс между выгодой и широкими возможностями.",
        created_at: new Date(2024, 8, 13),
        edited_at: new Date(2024, 8, 13),
        price_minute: 1,
        price_internet: 20,
        price_message: 1,
        count_minute: 400,
        count_internet: 10,
        count_message: 80,
      },
    },
    services: [],
    balance: 15,
    financialOperations: [
      {
        operation_date: new Date("2024-10-01T10:00:00"),
        operation_quantity: 50,
        operation_type: "top_up_balance",
      },
    ],
  },
  {
    id: 8,
    lastName: "Зайцев",
    firstName: "Захар",
    middleName: "Захарович",
    phoneNumber: "+7(900)123-45-74",
    birthDate: "05.06.1994",
    passportSeries: "4587",
    passportNumber: "852963",
    tariff: {
      type: "archive",
      details: {
        name_tariff: "Простой",
        tariff_format: "fixed",
        price: 150,
        description: "Тариф 'Премиум' предлагает расширенные пакеты интернета, звонков и SMS, обеспечивая свободу общения и высокий комфорт. Пользователи получают больше минут и гигабайтов, чтобы оставаться на связи даже в самых активных днях. Это идеальный выбор для тех, кто ищет баланс между выгодой и широкими возможностями.",
        created_at: new Date(2024, 8, 13),
        edited_at: new Date(2024, 8, 13),
        price_minute: 1,
        price_internet: 20,
        price_message: 1,
        count_minute: 100,
        count_internet: 1,
        count_message: 20,
      },
    },
    services: [
      {
        type: "message",
        details: { name_tariff: "100 СМС", count_message: 100 },
      },
    ],
    balance: 1000,
    financialOperations: [
      {
        operation_date: new Date("2024-10-01T10:00:00"),
        operation_quantity: 1000,
        operation_type: "top_up_balance",
      },
      {
        operation_date: new Date("2024-10-01T10:00:00"),
        operation_quantity: 500,
        operation_type: "payment_tariff",
      },
    ],
  },
  {
    id: 9,
    lastName: "Киселев",
    firstName: "Кирилл",
    middleName: "Кириллович",
    phoneNumber: "+7(900)123-45-75",
    birthDate: "19.08.1986",
    passportSeries: "4598",
    passportNumber: "369852",
    tariff: {
      type: "active",
      details: {
        name_tariff: "Максимальный",
        tariff_format: "fixed",
        price: 1800,
        description: "Тариф 'Премиум' предлагает расширенные пакеты интернета, звонков и SMS, обеспечивая свободу общения и высокий комфорт. Пользователи получают больше минут и гигабайтов, чтобы оставаться на связи даже в самых активных днях. Это идеальный выбор для тех, кто ищет баланс между выгодой и широкими возможностями.",
        created_at: new Date(2024, 8, 13),
        edited_at: new Date(2024, 8, 13),
        price_minute: 1,
        price_internet: 20,
        price_message: 1,
        count_minute: 1500,
        count_internet: 60,
        count_message: 600,
      },
    },
    services: [
      {
        type: "internet",
        details: { name_tariff: "Интернет 60Гб", count_internet: 60 },
      },
    ],
    balance: 1000,
    financialOperations: [
      {
        operation_date: new Date("2024-10-01T10:00:00"),
        operation_quantity: 80,
        operation_type: "top_up_balance",
      },
    ],
  },
  {
    id: 10,
    lastName: "Николаев",
    firstName: "Николай",
    middleName: "Николаевич",
    phoneNumber: "+7(900)123-45-76",
    birthDate: "01.02.1990",
    passportSeries: "4609",
    passportNumber: "159753",
    tariff: {
      type: "active",
      details: {
        name_tariff: "Стартовый",
        tariff_format: "fixed",
        price: 400,
        description: "Тариф 'Премиум' предлагает расширенные пакеты интернета, звонков и SMS, обеспечивая свободу общения и высокий комфорт. Пользователи получают больше минут и гигабайтов, чтобы оставаться на связи даже в самых активных днях. Это идеальный выбор для тех, кто ищет баланс между выгодой и широкими возможностями.",
        created_at: new Date(2024, 8, 13),
        edited_at: new Date(2024, 8, 13),
        price_minute: 1,
        price_internet: 20,
        price_message: 1,
        count_minute: 250,
        count_internet: 5,
        count_message: 50,
      },
    },
    services: [
      {
        type: "call",
        details: { name_tariff: "250 минут", count_minute: 250 },
      },
    ],
    balance: 50,
    financialOperations: [
      {
        operation_date: new Date("2024-10-01T10:00:00"),
        operation_quantity: 10,
        operation_type: "top_up_balance",
      },
    ],
  },
];

export interface BasicUserData {
  id: number;
  lastName: string;
  firstName: string;
  middleName: string;
}

// Массив с основными данными пользователей
export const basicUserData: BasicUserData[] = [
  { id: 1, lastName: "Иванов", firstName: "Иван", middleName: "Иванович" },
  { id: 2, lastName: "Петров", firstName: "Петр", middleName: "Петрович" },
  { id: 3, lastName: "Сидоров", firstName: "Сергей", middleName: "Сергеевич" },
  {
    id: 4,
    lastName: "Кузнецов",
    firstName: "Константин",
    middleName: "Кузьмич",
  },
  { id: 5, lastName: "Смирнов", firstName: "Семен", middleName: "Семенович" },
  {
    id: 6,
    lastName: "Волков",
    firstName: "Владимир",
    middleName: "Владимирович",
  },
  { id: 7, lastName: "Федоров", firstName: "Федор", middleName: "Федорович" },
  { id: 8, lastName: "Зайцев", firstName: "Захар", middleName: "Захарович" },
  { id: 9, lastName: "Киселев", firstName: "Кирилл", middleName: "Кириллович" },
  {
    id: 10,
    lastName: "Николаев",
    firstName: "Николай",
    middleName: "Николаевич",
  },
];

// Массив с тарифами
export const tariffs: Tariff[] = [
  {
      type: "active",
      details: {
        name_tariff: "Премиум",
        tariff_format: "fixed",
        price: 800,
        description: "Тариф 'Премиум' предлагает расширенные пакеты интернета, звонков и SMS, обеспечивая свободу общения и высокий комфорт. Пользователи получают больше минут и гигабайтов, чтобы оставаться на связи даже в самых активных днях. Это идеальный выбор для тех, кто ищет баланс между выгодой и широкими возможностями.",
        created_at: new Date(2024, 8, 13),
        edited_at: new Date(2024, 8, 13),
        price_minute: 1,
        price_internet: 20,
        price_message: 1,
        count_minute: 1000,
        count_internet: 50,
        count_message: 500,
      },
  },
  {
      type: "active",
      details: {
        name_tariff: "Базовый",
        tariff_format: "fixed",
        price: 500,
        description: "Тариф 'Премиум' предлагает расширенные пакеты интернета, звонков и SMS, обеспечивая свободу общения и высокий комфорт. Пользователи получают больше минут и гигабайтов, чтобы оставаться на связи даже в самых активных днях. Это идеальный выбор для тех, кто ищет баланс между выгодой и широкими возможностями.",
        created_at: new Date(2024, 8, 13),
        edited_at: new Date(2024, 8, 13),
        price_minute: 1,
        price_internet: 20,
        price_message: 1,
        count_minute: 500,
        count_internet: 10,
        count_message: 100,
      },
  },
  {
      type: "archive",
      details: {
        name_tariff: "Стандарт",
        tariff_format: "fixed",
        price: 450,
        description: "Тариф 'Премиум' предлагает расширенные пакеты интернета, звонков и SMS, обеспечивая свободу общения и высокий комфорт. Пользователи получают больше минут и гигабайтов, чтобы оставаться на связи даже в самых активных днях. Это идеальный выбор для тех, кто ищет баланс между выгодой и широкими возможностями.",
        created_at: new Date(2024, 8, 13),
        edited_at: new Date(2024, 8, 13),
        price_minute: 1,
        price_internet: 20,
        price_message: 1,
        count_minute: 300,
        count_internet: 5,
        count_message: 50,
      },
  },
  {
      type: "active",
      details: {
        name_tariff: "Комфорт",
        tariff_format: "fixed",
        price: 700,
        description: "Тариф 'Премиум' предлагает расширенные пакеты интернета, звонков и SMS, обеспечивая свободу общения и высокий комфорт. Пользователи получают больше минут и гигабайтов, чтобы оставаться на связи даже в самых активных днях. Это идеальный выбор для тех, кто ищет баланс между выгодой и широкими возможностями.",
        created_at: new Date(2024, 8, 13),
        edited_at: new Date(2024, 8, 13),
        price_minute: 1,
        price_internet: 20,
        price_message: 1,
        count_minute: 700,
        count_internet: 20,
        count_message: 200,
      },
  },
  {
      type: "archive",
      details: {
        name_tariff: "Эконом",
        tariff_format: "fixed",
        price: 300,
        description: "Тариф 'Премиум' предлагает расширенные пакеты интернета, звонков и SMS, обеспечивая свободу общения и высокий комфорт. Пользователи получают больше минут и гигабайтов, чтобы оставаться на связи даже в самых активных днях. Это идеальный выбор для тех, кто ищет баланс между выгодой и широкими возможностями.",
        created_at: new Date(2024, 8, 13),
        edited_at: new Date(2024, 8, 13),
        price_minute: 1,
        price_internet: 20,
        price_message: 1,
        count_minute: 200,
        count_internet: 2,
        count_message: 30,
      },
  },
  {
      type: "active",
      details: {
        name_tariff: "Универсальный",
        tariff_format: "fixed",
        price: 600,
        description: "Тариф 'Премиум' предлагает расширенные пакеты интернета, звонков и SMS, обеспечивая свободу общения и высокий комфорт. Пользователи получают больше минут и гигабайтов, чтобы оставаться на связи даже в самых активных днях. Это идеальный выбор для тех, кто ищет баланс между выгодой и широкими возможностями.",
        created_at: new Date(2024, 8, 13),
        edited_at: new Date(2024, 8, 13),
        price_minute: 1,
        price_internet: 20,
        price_message: 1,
        count_minute: 600,
        count_internet: 15,
        count_message: 120,
      },
  },
  {
      type: "active",
      details: {
        name_tariff: "Оптимальный",
        tariff_format: "fixed",
        price: 500,
        description: "Тариф 'Премиум' предлагает расширенные пакеты интернета, звонков и SMS, обеспечивая свободу общения и высокий комфорт. Пользователи получают больше минут и гигабайтов, чтобы оставаться на связи даже в самых активных днях. Это идеальный выбор для тех, кто ищет баланс между выгодой и широкими возможностями.",
        created_at: new Date(2024, 8, 13),
        edited_at: new Date(2024, 8, 13),
        price_minute: 1,
        price_internet: 20,
        price_message: 1,
        count_minute: 400,
        count_internet: 10,
        count_message: 80,
      },
  },
  {
      type: "archive",
      details: {
        name_tariff: "Простой",
        tariff_format: "fixed",
        price: 150,
        description: "Тариф 'Премиум' предлагает расширенные пакеты интернета, звонков и SMS, обеспечивая свободу общения и высокий комфорт. Пользователи получают больше минут и гигабайтов, чтобы оставаться на связи даже в самых активных днях. Это идеальный выбор для тех, кто ищет баланс между выгодой и широкими возможностями.",
        created_at: new Date(2024, 8, 13),
        edited_at: new Date(2024, 8, 13),
        price_minute: 1,
        price_internet: 20,
        price_message: 1,
        count_minute: 100,
        count_internet: 1,
        count_message: 20,
      },
  },
  {
      type: "active",
      details: {
        name_tariff: "Максимальный",
        tariff_format: "fixed",
        price: 1800,
        description: "Тариф 'Премиум' предлагает расширенные пакеты интернета, звонков и SMS, обеспечивая свободу общения и высокий комфорт. Пользователи получают больше минут и гигабайтов, чтобы оставаться на связи даже в самых активных днях. Это идеальный выбор для тех, кто ищет баланс между выгодой и широкими возможностями.",
        created_at: new Date(2024, 8, 13),
        edited_at: new Date(2024, 8, 13),
        price_minute: 1,
        price_internet: 20,
        price_message: 1,
        count_minute: 1500,
        count_internet: 60,
        count_message: 600,
      },
  },
  {
      type: "active",
      details: {
        name_tariff: "Стартовый",
        tariff_format: "fixed",
        price: 400,
        description: "Тариф 'Премиум' предлагает расширенные пакеты интернета, звонков и SMS, обеспечивая свободу общения и высокий комфорт. Пользователи получают больше минут и гигабайтов, чтобы оставаться на связи даже в самых активных днях. Это идеальный выбор для тех, кто ищет баланс между выгодой и широкими возможностями.",
        created_at: new Date(2024, 8, 13),
        edited_at: new Date(2024, 8, 13),
        price_minute: 1,
        price_internet: 20,
        price_message: 1,
        count_minute: 250,
        count_internet: 5,
        count_message: 50,
      },
  },
  {
    type: "active",
    details: {
      name_tariff: "Лео Месси",
      tariff_format: "custom",
      description: "Тариф 'Лео Месси' предлагает расширенные пакеты интернета, звонков и SMS, обеспечивая свободу общения и высокий комфорт. Пользователи получают больше минут и гигабайтов, чтобы оставаться на связи даже в самых активных днях. Это идеальный выбор для тех, кто ищет баланс между выгодой и широкими возможностями.",
      created_at: new Date(2024, 8, 13),
      edited_at: new Date(2024, 8, 13),
      price_minute: 1,
      price_internet: 20,
      price_message: 1,
      count_minute: [0, 100, 300, 500],
      count_internet: [5, 15, 25, 35, 50],
      count_message: [0, 100, 200, 300, 500],
    },
  },
  {
    type: "archive",
    details: {
      name_tariff: "Роналду",
      tariff_format: "custom",
      description: "Тариф 'Роналду' предлагает расширенные пакеты интернета, звонков и SMS, обеспечивая свободу общения и высокий комфорт. Пользователи получают больше минут и гигабайтов, чтобы оставаться на связи даже в самых активных днях. Это идеальный выбор для тех, кто ищет баланс между выгодой и широкими возможностями.",
      created_at: new Date(2024, 8, 13),
      edited_at: new Date(2024, 8, 13),
      price_minute: 1,
      price_internet: 20,
      price_message: 1,
      count_minute: [0, 100, 300, 500],
      count_internet: [5, 15, 25, 35, 50],
      count_message: [0, 100, 200, 300, 500],
    },
  },
];
// Массив с услугами
export const services: Service[] = [
  {
    type: "internet",
    details: { name_tariff: "Интернет 10Гб", count_internet: 10 },
  },
  {
    type: "call",
    details: { name_tariff: "150 минут", count_minute: 150 },
  },
  {
    type: "message",
    details: { name_tariff: "10 СМС", count_message: 10 },
  },
  {
    type: "message",
    details: { name_tariff: "20 СМС", count_message: 20 },
  },
  {
    type: "internet",
    details: { name_tariff: "Интернет 15Гб", count_internet: 15 },
  },
  {
    type: "call",
    details: { name_tariff: "300 минут", count_minute: 300 },
  },
  {
    type: "message",
    details: { name_tariff: "100 СМС", count_message: 100 },
  },
  {
    type: "call",
    details: { name_tariff: "200 минут", count_minute: 200 },
  },
  {
    type: "internet",
    details: { name_tariff: "Интернет 60Гб", count_internet: 60 },
  },
  {
    type: "call",
    details: { name_tariff: "250 минут", count_minute: 250 },
  },
];