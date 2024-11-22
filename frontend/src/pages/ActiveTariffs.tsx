import { useState } from "react"
import { Button } from "../components/UI/Button"
import { Counter } from "../components/UI/Counter"
import FilterSvg from "../img/filter_alt.svg?react"
import { tariffs, typesTariff, TariffFormat } from "../mock/mock"
import { Input } from "../components/UI/Input"
import { Selector } from "../components/UI/Selector"
import { Tab } from "../components/UI/Tab"
import { TariffCard } from "../components/UI/TariffCard"
import AddSvg from "../img/abonent_sidebar_svg/add.svg?react"

export const ActiveTariffs = () => {
    const [isFiltersOpen, setIsFiltersIsOpen] = useState(false)
    const [typeTariff, setTypeTariff] = useState('active')

    // Тарифы отфильтрованы по активным и архивным
    const activeTariffs = tariffs.filter(tariff => tariff.type === "active");
    const archiveTariffs = tariffs.filter(tariff => tariff.type === "archive");

    // Поля фильтрации
    const [formatTariff, setFormatTariff] = useState<TariffFormat  | string | null>(null);
    const [nameTariff, setNameTariff] = useState('');
    
    // Примененные фильтры
    const [appliedFilters, setAppliedFilters] = useState<{ formatTariff: TariffFormat | string | null; nameTariff: string }>({
        formatTariff: null,
        nameTariff: ''
    });
    const nonFalseValuesCount = Object.values(appliedFilters).filter(value => {
        return Boolean(value); // Считает только "истинные" значения
    }).length;

    // Применение фильтров
    const applyFilters = () => {
        setAppliedFilters({
        formatTariff,
        nameTariff
        });
    };

    // Сброс фильтров
    const resetFilters = () => {
        setFormatTariff(null)
        setNameTariff("")
        setAppliedFilters({
        formatTariff: null,
        nameTariff: ''
        });
    };

    // Фильтрация тарифов на основе примененных фильтров
    const activeFilteredTariffs = activeTariffs.filter((tariff) => {
        const { formatTariff, nameTariff } = appliedFilters;

        const typeMatch = 
        !formatTariff || // Если `formatTariff` пустое, принимаем все
        (typeof formatTariff !== 'string' && tariff.details.tariff_format === formatTariff.format); // Проверка на совпадение
        
        const nameMatch = tariff.details.name_tariff.toLowerCase().includes(nameTariff.toLowerCase());
        
        return typeMatch && nameMatch;
    });
    const archiveFilteredTariffs = archiveTariffs.filter((tariff) => {
        const { formatTariff, nameTariff } = appliedFilters;

        const typeMatch = 
        !formatTariff || // Если `formatTariff` пустое, принимаем все
        (typeof formatTariff !== 'string' && tariff.details.tariff_format === formatTariff.format);
        
        const nameMatch = tariff.details.name_tariff.toLowerCase().includes(nameTariff.toLowerCase());
        
        return typeMatch && nameMatch;
    });

    return (
        <div className="grow px-[90px] py-10 overflow-y-auto">
            <div className="flex items-center mb-2.5">
                <div className="flex items-center mr-auto">
                    <h2 className="text-[34px] text-s-black mr-3">
                        Тарифы
                    </h2>
                    <Counter 
                    desired_entries={typeTariff === 'active'
                        ? activeFilteredTariffs.length
                        : archiveFilteredTariffs.length
                    } 
                    all_entries={tariffs.length} />
                </div>
                <Button type="red" text={nonFalseValuesCount} 
                iconRight={<FilterSvg className="w-[22px] h-[22px]" />}
                onClick={() => setIsFiltersIsOpen(!isFiltersOpen)} />
            </div>
            <div className={`mb-5 transition-all duration-300 ease-out transform ${
            isFiltersOpen
            ? 'opacity-100 max-h-screen translate-y-0' 
            : 'opacity-0 max-h-0 overflow-hidden translate-y-4'}`}>
                <div className="flex gap-5 mb-2.5">
                    <div className="w-[435px]">
                        <Input value={nameTariff}
                        setTakeValue={setNameTariff}
                        placeholder="Введите название" />
                    </div>
                    <div className="w-[335px]">
                        <Selector selectList={typesTariff}
                        labelKey="formatName" value={formatTariff}
                        setTakeValue={setFormatTariff}
                        placeholder="Выберите тип" />
                    </div>
                </div>
                <div className="flex items-center">
                    <Button type="red" text="Применить" styles="mr-[30px]"
                    onClick={applyFilters} />
                    <Button type="grey" text="Очистить"
                    onClick={resetFilters}  />
                </div>
            </div>
            <div className="mb-10 flex items-center">
                <div className="mr-auto">
                    <Tab text="Активные" select={typeTariff === 'active'}
                    onClick={() => setTypeTariff('active')}
                    styles="text-[26px] font-medium mr-5" />
                    <Tab text="Архивные" select={typeTariff === 'archive'}
                    onClick={() => setTypeTariff('archive')}
                    styles="text-[26px] font-medium" />
                </div>
                <Button text="Новый тариф" type="red" iconLeft={<AddSvg />} />
            </div>
            <div className="grid grid-cols-3 gap-12">
                {typeTariff === 'active' ? (
                    activeFilteredTariffs.map((tariff) => (
                        <TariffCard cardInfo={tariff} type={tariff.type} />
                    ))
                ) : (
                    archiveFilteredTariffs.map((tariff) => (
                        <TariffCard cardInfo={tariff} type={tariff.type} />
                    ))
                )}
            </div>
        </div>
    )
}
