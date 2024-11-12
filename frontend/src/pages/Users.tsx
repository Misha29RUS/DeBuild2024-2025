import { Counter } from "../components/UI/Counter";
import { Button } from "../components/UI/Button";
import { Input } from "../components/UI/Input";
import { MultiSelector } from "../components/UI/MultiSelector";
import {users, tariffs, services} from "../data/mock_data"
import FilterSvg from "../img/filter_alt.svg?react"
import { useState } from "react";
import { formatPhoneNumber } from "../utils/phoneUtils";
import { deepEqual } from "../utils/deepEqual";
import { UsersTable } from "../components/UsersTable";

interface ITariffs {
  type: string;
  text: string;
}
interface IServices {
  name: string;
  type: string;
}

export const Users = () => {
  const [isFiltersOpen, setIsFiltersIsOpen] = useState(false)

  // Поля фильтрации
  const [selectTariffs, setSelectTariffs] = useState<ITariffs[]>([]);
  const [selectServices, setSelectServices] = useState<IServices[]>([]);
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [patronymic, setPatronymic] = useState('');

  // Примененные фильтры
  const [appliedFilters, setAppliedFilters] = useState({
    selectTariffs: [] as ITariffs[],
    selectServices: [] as IServices[],
    phone: '',
    name: '',
    surname: '',
    patronymic: '',
  });
  const nonFalseValuesCount = Object.values(appliedFilters).filter(value => {
    if (Array.isArray(value)) {
      return value.length > 0; // Пустые массивы игнорируются
    }
    return Boolean(value); // Считает только "истинные" значения
  }).length;

  // Применение фильтров
  const applyFilters = () => {
    setAppliedFilters({
      selectTariffs,
      selectServices,
      phone,
      name,
      surname,
      patronymic,
    });
  };

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
  };

  // Фильтрация пользователей на основе примененных фильтров
  const filteredUsers = users.filter((user) => {
    const { selectTariffs, selectServices, phone, name, surname, patronymic } = appliedFilters;

    const nameMatch = user.name.toLowerCase().includes(name.toLowerCase());
    const surnameMatch = user.surname.toLowerCase().includes(surname.toLowerCase());
    const patronymicMatch = user.patronymic.toLowerCase().includes(patronymic.toLowerCase());
    const phoneMatch = user.tel.toLowerCase().includes(phone.toLowerCase());
    const tariffMatch = selectTariffs.length === 0 || selectTariffs.some((tariff) => deepEqual(tariff, user.tariff));
    const servicesMatch =
      selectServices.length === 0 ||
      user.services.some((userService) =>
        selectServices.some((selectedService: { type: string }) => selectedService.type === userService.type)
      );

    return nameMatch && surnameMatch && patronymicMatch && phoneMatch && tariffMatch && servicesMatch;
  });

  // Обработчик изменения номера телефона с форматированием
  const handlePhoneChange = (newValue: string) => {
    const formattedValue = formatPhoneNumber(newValue);
    setPhone(formattedValue);
  };

  return (
    <div className="grow px-[90px] py-10 overflow-y-auto">

      <div className="flex items-center mb-2.5">
        <div className="flex items-center mr-auto">
          <h2 className="text-[34px] text-s-black mr-3">
            Таблица абонентов
          </h2>
          <Counter desired_entries={filteredUsers.length} all_entries={users.length} />
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
          selectList={tariffs} labelKey='text' />
          <MultiSelector placeholder="Выберите услуги"
          value={selectServices} setTakeValue={setSelectServices}
          selectList={services} labelKey='name' />
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
        <UsersTable users={filteredUsers} />
      ): (
        <div className="text-[38px] text-center font-medium text-s-light-grey mt-[70px]">
          Используйте фильтры для поиска
        </div>
      )}
    </div>
  );
};
