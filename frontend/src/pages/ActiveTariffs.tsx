// @ts-ignore
import { useState } from "react"
import { Button } from "../components/UI/Button"// @ts-ignore
import { Counter } from "../components/UI/Counter"// @ts-ignore
import FilterSvg from "../img/filter_alt.svg?react"
import { Input } from "../components/UI/Input"
import { Tab } from "../components/UI/Tab"
import { TariffCard } from "../components/UI/TariffCard"// @ts-ignore
import AddSvg from "../img/abonent_sidebar_svg/add.svg?react"
import { SelectorMock } from "../components/UI/SelectorMock"
import { useGetTariffsQuery } from "../app/services/tariffs"
import {TariffsSidebar} from "../components/TariffsSidebar.tsx";
import {NewTariffSidebar} from "../components/NewTariffSidebar.tsx";

const typesTariff = [
    {
        type: 'CUSTOMIZABLE',
        typeName: 'Настраиваемый'
    },
    {
        type: 'FIXED',
        typeName: 'Фиксированный'
    },
]

type typesTariff = {
    type: string;
    typeName: string
}

type appliedFiltersType = {
    name: string
    type?: typesTariff
}

export const ActiveTariffs = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const [isSidebarNewTariff, setIsSidebarNewTariff] = useState(false)
    const [tariffId, setTariffId] = useState<number | null>(null)

    const [statusTariff, setStatusTariff] = useState<'ACTIVE' | 'HIDDEN'>('ACTIVE')
    const [nameTariff, setNameTariff] = useState<string>('')
    const [typeTariff, setTypeTariff] = useState<'FIXED' | 'CUSTOMIZABLE'>()
    const [appliedFilters, setAppliedFilters] = useState<appliedFiltersType>({
        name: "",
        type: undefined,
    })

    const { data: tariffsData } = useGetTariffsQuery({
        status: statusTariff,
        name: appliedFilters.name,
        type: appliedFilters.type?.type,
    });

    const [isFiltersOpen, setIsFiltersIsOpen] = useState(false)

    const nonFalseValuesCount = Object.values(appliedFilters).filter(value => {
        return Boolean(value); // Считает только "истинные" значения
    }).length;

    // Применение фильтров
    const applyFilters = () => {
        setAppliedFilters({
            type: typeTariff,
            name: nameTariff
        });
    };

    // Сброс фильтров
    const resetFilters = () => {
        setTypeTariff(undefined)
        setNameTariff("")
        setAppliedFilters({
            type: undefined,
            name: ''
        });
    };

    return (// @ts-ignore
        <div className="grow px-[90px] py-10 overflow-y-auto">
            <div className="flex items-center mb-2.5">
                <div className="flex items-center mr-auto">
                    <h2 className="text-[34px] text-s-black mr-3">
                        Тарифы
                    </h2>
                    {/*<Counter */}
                    {/*desired_entries={typeTariff === 'active'*/}
                    {/*    ? activeFilteredTariffs.length*/}
                    {/*    : archiveFilteredTariffs.length*/}
                    {/*} */}
                    {/*all_entries={tariffs.length} />*/}
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
                        <SelectorMock selectList={typesTariff}
                        labelKey="typeName" value={typeTariff}
                        setTakeValue={setTypeTariff}
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
                    <Tab text="Активные" select={statusTariff === 'ACTIVE'}
                    onClick={() => setStatusTariff('ACTIVE')}
                    styles="text-[26px] font-medium mr-5" />
                    <Tab text="Архивные" select={statusTariff === 'HIDDEN'}
                    onClick={() => setStatusTariff('HIDDEN')}
                    styles="text-[26px] font-medium" />
                </div>
                <Button onClick={() => setIsSidebarNewTariff(true)}
                    text="Новый тариф" type="red" iconLeft={<AddSvg />} />
            </div>
            <div className="grid grid-cols-3 gap-12">
                {tariffsData?.content.map((tariff, index) => (
                    <TariffCard// @ts-ignore
                        key={index}
                        onClick={() => {
                            setTariffId(tariff.id)
                            setIsSidebarOpen(isSidebarNewTariff === true ? false : true)
                        }}
                        cardInfo={tariff}
                        type={tariff.status}
                    />
                ))}
            </div>
            {isSidebarOpen && <TariffsSidebar tariffID={tariffId!}
               onClose={() => {
                   setIsSidebarOpen(!isSidebarOpen)
                   setTariffId(null)
               }}
               isAdmin={true}
            />
            }
            {isSidebarNewTariff && <NewTariffSidebar
                onClose={() => {
                    setIsSidebarNewTariff(!isSidebarNewTariff)
                }}
            />
            }
        </div>
    )
}
