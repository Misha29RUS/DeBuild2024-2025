export interface IUsers {
    content: IContent[];
    pageable: IPageable;
    last: boolean;
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
    sort: ISort;
    first: boolean;
    numberOfElements: number;
    empty: boolean;
}

export interface IPageable {
    pageNumber: number;
    pageSize: number;
    sort: ISort;
    offset: number;
    paged: boolean;
    unpaged: boolean;
}

export interface ISort {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
}

export interface IContent {
    id: number;
    phoneNumber: string;
    balance: number;
    user: IUser;
    phoneNumberTariff: IPhoneNumberTariff;
    phoneNumberMobileServices: IPhoneNumberMobileService[];
}

export interface IPhoneNumberMobileService {
    mobileService: IMobileService;
    dateOfStartPeriod: string;
    dateOfEndPeriod: string;
    type: string;
    remainingResources: number;
}

export interface IMobileService {
    id: number;
    oneTimeService: boolean;
    status: string;
    type: string;
    name: string;
    description: string;
    cost: number;
    countResources: number;
}

export interface IPhoneNumberTariff {
    id: number;
    tariff: ITariff;
    isActive: boolean;
    dateOfStartPeriod: string;
    dateOfEndPeriod: string;
    remainingMinutes: number;
    remainingSms: number;
    remainingGigabytes: number;
    countMinutesAtStartOfPeriod: number;
    countSmsAtStartOfPeriod: number;
    countGigabytesAtStartOfPeriod: number;
}

export interface ITariff {
    id: number;
    type: string;
    status: string;
    name: string;
    description: string;
    cost: number;
    tariffResourceDto: ITariffResourceDto;
}

export interface ITariffResourceDto {
    id: number;
    countMinutes?: number;
    costOneMinute: number;
    stepsMinutes?: number[];
    countSms?: number;
    costOneSms: number;
    stepsSms?: number[];
    countGigabytes?: number;
    costOneGigabyte: number;
    stepsGigabytes?: number[];
}

export interface IUser {
    id: number;
    name: string;
    surname: string;
    patronymic: string;
}

export interface ICountUsersInterface {
    countAbonentsAfterFilters: number;
    countAllAbonents: number;
}

export interface IUserInfo {
    id: number
    phoneNumber: string
    user: IUserData
}

export interface IUserData {
    id: number
    name: string
    surname: string
    patronymic: string
    userPassport: IUserPassport
}

export interface IUserPassport {
    id: number
    passportSeries: string
    passportNumber: string
    dateOfBirth: string
    issuedByWhom: string
    departmentCode: string
    dateOfIssue: string
}

export interface IBalanceOperation {
    id: number
    phoneNumber: string
    balance: number
    historyOfTransaction: IHistoryOfTransaction[]
}

export interface IHistoryOfTransaction {
    id: number
    nameOfTransaction: string
    amountOfTransaction: number
    dateOfTransaction: string
    typeOfTransaction: string
}

export interface IUserTariffInfo {
    id: number
    phoneNumber: string
    balance: number
    phoneNumberTariff: IPhoneNumberTariff
}

export interface IUserServicesInfo {
    id: number
    phoneNumber: string
    balance: number
    phoneNumberMobileServices: IPhoneNumberMobileService[]
}

export interface ITariffs {
    content: ITariff[];
    pageable: IPageable;
    last: boolean;
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
    sort: ISort;
    first: boolean;
    numberOfElements: number;
    empty: boolean;
}

export interface IServices {
    content: IMobileService[];
    pageable: IPageable;
    last: boolean;
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
    sort: ISort;
    first: boolean;
    numberOfElements: number;
    empty: boolean;
}

export interface IActivateService {
    id: IdInterface
    dateOfStartPeriod: string
    dateOfEndPeriod: string
    type: string
    remainingResources: number
}

export interface IdInterface {
    phoneNumberId: number
    serviceId: number
}

export interface IChangeTariff {
    id: number
    isActive: boolean
    dateOfStartPeriod: string
    dateOfEndPeriod: string
    remainingMinutes: number
    remainingSms: number
    remainingGigabytes: number
    countMinutesAtStartOfPeriod: number
    countSmsAtStartOfPeriod: number
    countGigabytesAtStartOfPeriod: number
}