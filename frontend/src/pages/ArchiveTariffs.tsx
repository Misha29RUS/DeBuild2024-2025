import { 
    useGetUsersQuery, useGetCountUsersQuery,
    useGetServicesQuery, useGetTariffsQuery 
} from "../app/services/users";
import { Counter } from "../components/UI/Counter";
import { Button } from "../components/UI/Button";
import { Input } from "../components/UI/Input";
import { MultiSelector } from "../components/UI/MultiSelector";
import FilterSvg from "../img/filter_alt.svg?react"
import { useEffect, useRef, useState } from "react";
import { formatPhoneNumber } from "../utils/phoneUtils";
import { UsersTable } from "../components/UsersTable";
import { IMobileService, ITariff } from "../app/services/types";
import { skipToken } from "@reduxjs/toolkit/query";

type UserFilters = {
  name?: string;
  surname?: string;
  patronymic?: string;
  phoneNumber?: string;
  mobileServicesIds?: number[];
  tariffsIds?: number[];
  page: number;
  size: number;
};

export const ArchiveTariffs = () => {
  const [isFiltersOpen, setIsFiltersIsOpen] = useState(false)

  // Поля фильтрации
  const [selectTariffs, setSelectTariffs] = useState<ITariff[]>([]);
  const [selectServices, setSelectServices] = useState<IMobileService[]>([]);
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [patronymic, setPatronymic] = useState('');
    
  // Запрашиваем все тарифы и услуги для фильтров
  let { data: servicesData } = useGetServicesQuery('')
  servicesData = servicesData?.filter(service => service.status !== "DELETED") 
  let { data: tariffsData } = useGetTariffsQuery('')
  tariffsData = tariffsData?.filter(tariff => tariff.status !== "DELETED")

  // Примененные фильтры
  const [appliedFilters, setAppliedFilters] = useState({
    selectTariffs: [] as number[],
    selectServices: [] as number[],
    phone: '',
    name: '',
    surname: '',
    patronymic: '',
  });

  // Состояния для управления запросом
  const [shouldFetchUsers, setShouldFetchUsers] = useState(false);
  const [page, setPage] = useState(0)
  const usersPageRef = useRef(null);

  // Вызов пользователей
  const filterEmptyFields = <T extends Record<string, unknown>>(filters: T): Partial<T> => {
    return Object.fromEntries(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      Object.entries(filters).filter(([key, value]) => {
        if (Array.isArray(value)) {
          return value.length > 0; // Убираем пустые массивы
        }
        return value !== '' && value !== undefined; // Убираем пустые строки и undefined
      })
    ) as Partial<T>;
  };
  const filteredUsers: UserFilters = {
    ...filterEmptyFields({
      name: appliedFilters.name,
      surname: appliedFilters.surname,
      patronymic: appliedFilters.patronymic,
      phoneNumber: appliedFilters.phone,
      mobileServicesIds: appliedFilters.selectServices,
      tariffsIds: appliedFilters.selectTariffs,
    }),
    page: page,
    size: 10
  };
  const { data: usersData, isFetching } = useGetUsersQuery(shouldFetchUsers ? filteredUsers : skipToken);
  useEffect(() => {
    const onScroll = () => {
      if (!usersPageRef.current) return;
  
      const element = usersPageRef.current;
      const scrolledToBottom =
        element.scrollHeight - element.scrollTop === element.clientHeight;
  
      if (scrolledToBottom && !isFetching && !(usersData?.last)) {
        setPage(page + 1);
      }
    };

    const element = usersPageRef.current;
    element?.addEventListener("scroll", onScroll);
  
    return () => {
      element?.removeEventListener("scroll", onScroll);
    };
  }, [page, isFetching]);

  // Запрашиваем количество всех пользователей и соответствующих фильтрам
  const { data: countUsersData } = useGetCountUsersQuery(shouldFetchUsers ? filteredUsers : {name: ''});

  // Подсчёт количества примененных фильтров
  const nonFalseValuesCount = Object.values(appliedFilters).filter(value => {
    if (Array.isArray(value)) {
      return value.length > 0; // Пустые массивы игнорируются
    }
    return Boolean(value); // Считает только "истинные" значения
  }).length;
  
  // Применение фильтров
  const applyFilters = () => {
    setAppliedFilters({
      selectTariffs: selectTariffs.map((tariff) => tariff.id),
      selectServices: selectServices.map((service) => service.id),
      phone,
      name,
      surname,
      patronymic,
    });
    setPage(0)
  };

  // Проверка на наличие непустых фильтров
  const hasNonEmptyFilter = Object.values(appliedFilters).some(value => {
    if (Array.isArray(value)) {
      return value.length > 0; // Массив не пустой
    }
    return Boolean(value); // Значение не пустое
  });

  // Устанавливаем флаг на выполнение запроса только если фильтры не пустые
  useEffect(() => {
    if (hasNonEmptyFilter) {
      setShouldFetchUsers(true); // Запрашиваем пользователей
    } else {
      setShouldFetchUsers(false); // Если фильтры пустые, не запрашиваем
    }
  }, [appliedFilters]); // Следим за изменениями в appliedFilters

  // Сброс фильтров
  const resetFilters = () => {
    setSelectTariffs([]); 
    setSelectServices([]); 
    setPhone(''); 
    setName(''); 
    setSurname(''); 
    setPatronymic(''); 
    setAppliedFilters({
      selectTariffs: [],
      selectServices: [],
      phone: '',
      name: '',
      surname: '',
      patronymic: '',
    });
    setShouldFetchUsers(false); // Не запрашиваем пользователей, если фильтры пустые
    setPage(0)
  };

  // Обработчик изменения номера телефона с форматированием
  const handlePhoneChange = (newValue: string) => {
    const formattedValue = formatPhoneNumber(newValue);
    setPhone(formattedValue);
  };
  
  return (
    <div ref={usersPageRef}
    className="grow px-[90px] py-10 overflow-y-auto">
      <div className="flex items-center mb-2.5">
        <div className="flex items-center mr-auto">
          <h2 className="text-[34px] text-s-black mr-3">
            Таблица абонентов
          </h2>
          <Counter desired_entries={countUsersData?.countAllAbonents ?? 0} 
          all_entries={countUsersData?.countAbonentsAfterFilters ?? 0} />
        </div>
        <Button type="red" text={nonFalseValuesCount} 
        iconRight={<FilterSvg className="w-[22px] h-[22px]" />}
        onClick={() => setIsFiltersIsOpen(!isFiltersOpen)} />
      </div>
      <div className={`mb-[30px] transition-all duration-300 ease-out transform ${
        isFiltersOpen
        ? 'opacity-100 max-h-screen translate-y-0' 
        : 'opacity-0 max-h-0 overflow-hidden translate-y-4'}`}>
        <div className="flex gap-[30px] mb-2.5">
          <Input setTakeValue={handlePhoneChange} value={phone} 
          placeholder="Введите номер" />
          <MultiSelector placeholder="Выберите тарифы"
          value={selectTariffs} setTakeValue={setSelectTariffs}
          selectList={tariffsData ?? []} labelKey='name' />
          <MultiSelector placeholder="Выберите услуги"
          value={selectServices} setTakeValue={setSelectServices}
          selectList={servicesData ?? []} labelKey='name' />
        </div>
        <div className="flex items-center gap-[30px] mb-2.5">
          <Input setTakeValue={setSurname} value={surname} 
          placeholder="Введите фамилию" />
          <Input setTakeValue={setName} value={name} 
          placeholder="Введите имя" />
          <Input setTakeValue={setPatronymic} value={patronymic} 
          placeholder="Введите отчество" />
        </div>
        <div className="flex items-center">
          <Button type="red" text="Применить" onClick={applyFilters} styles="mr-[30px]" />
          <Button type="grey" text="Очистить" onClick={resetFilters} />
        </div>
      </div>
      {nonFalseValuesCount > 0 ? (
        <UsersTable users={usersData} />
      ): (
        <div className="text-[38px] text-center font-medium text-s-light-grey mt-[70px]">
          Используйте фильтры для поиска
        </div>
      )}
    </div>
  );
};