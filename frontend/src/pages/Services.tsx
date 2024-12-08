import { useState } from "react"
import { Button } from "../components/UI/Button"
import { Counter } from "../components/UI/Counter"
import FilterSvg from "../img/filter_alt.svg?react"
import { services, typesServices, ServiceFormat } from "../mock/mock"
import { Input } from "../components/UI/Input"
import { Tab } from "../components/UI/Tab"
import AddSvg from "../img/abonent_sidebar_svg/add.svg?react"
import { ServiceCard } from "../components/UI/ServiceCard"
import { SelectorMock } from "../components/UI/SelectorMock"

export const Services = () => {
    const [isFiltersOpen, setIsFiltersIsOpen] = useState(false)
    const [typeService, setTypeService] = useState('internet')

    // Услуги отфильтрованы по интернету, сообщениям и минутам
    const internetService = services.filter(services => services.type === "internet");
    const messageService = services.filter(services => services.type === "message");
    const callService = services.filter(services => services.type === "call");

    // Поля фильтрации
    const [formatService, setFormatService] = useState<ServiceFormat  | string | null>(null);
    const [nameService, setNameService] = useState('');
    
    // Примененные фильтры
    const [appliedFilters, setAppliedFilters] = useState<{ formatService: ServiceFormat | string | null; nameService: string }>({
        formatService: null,
        nameService: ''
    });
    const nonFalseValuesCount = Object.values(appliedFilters).filter(value => {
        return Boolean(value); // Считает только "истинные" значения
    }).length;

    // Применение фильтров
    const applyFilters = () => {
        setAppliedFilters({
        formatService,
        nameService
        });
    };

    // Сброс фильтров
    const resetFilters = () => {
        setFormatService(null)
        setNameService("")
        setAppliedFilters({
        formatService: null,
        nameService: ''
        });
    };

    // Фильтрация тарифов на основе примененных фильтров
    const internetFilteredServices = internetService.filter((service) => {
        const { formatService, nameService } = appliedFilters;

        const typeMatch = 
        !formatService || // Если `formatService` пустое, принимаем все
        (typeof formatService !== 'string' && service.details.service_format === formatService.format); // Проверка на совпадение
        
        const nameMatch = service.details.name_tariff.toLowerCase().includes(nameService.toLowerCase());
        
        return typeMatch && nameMatch;
    });
    const messageFilteredServices = messageService.filter((service) => {
        const { formatService, nameService } = appliedFilters;

        const typeMatch = 
        !formatService || // Если `formatService` пустое, принимаем все
        (typeof formatService !== 'string' && service.details.service_format === formatService.format); // Проверка на совпадение
        
        const nameMatch = service.details.name_tariff.toLowerCase().includes(nameService.toLowerCase());
        
        return typeMatch && nameMatch;
    });
    const callFilteredServices = callService.filter((service) => {
        const { formatService, nameService } = appliedFilters;

        const typeMatch = 
        !formatService || // Если `formatService` пустое, принимаем все
        (typeof formatService !== 'string' && service.details.service_format === formatService.format); // Проверка на совпадение
        
        const nameMatch = service.details.name_tariff.toLowerCase().includes(nameService.toLowerCase());
        
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
                    desired_entries={typeService === 'internet'
                        ? internetFilteredServices.length
                        : (typeService === 'message' ? messageFilteredServices.length 
                        : callFilteredServices.length)
                    } 
                    all_entries={services.length} />
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
                        <Input value={nameService}
                        setTakeValue={setNameService}
                        placeholder="Введите название" />
                    </div>
                    <div className="w-[335px]">
                        <SelectorMock selectList={typesServices}
                        labelKey="formatName" value={formatService}
                        setTakeValue={setFormatService}
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
                    <Tab text="Гигабайты" select={typeService === 'internet'}
                    onClick={() => setTypeService('internet')}
                    styles="text-[26px] font-medium mr-5" />
                    <Tab text="Минуты" select={typeService === 'call'}
                    onClick={() => setTypeService('call')}
                    styles="text-[26px] font-medium mr-5" />
                    <Tab text="СМС" select={typeService === 'message'}
                    onClick={() => setTypeService('message')}
                    styles="text-[26px] font-medium" />
                </div>
                <Button text="Новый тариф" type="red" iconLeft={<AddSvg />} />
            </div>
            <div className="grid grid-cols-3 gap-12">
                {typeService === 'internet' ? (
                    internetFilteredServices.map((service) => (
                        <ServiceCard cardInfo={service} type={service.type} />
                    ))
                ) : (typeService === 'call' ? (
                    callFilteredServices.map((service) => (
                        <ServiceCard cardInfo={service} type={service.type} />
                    ))
                ) : (
                    messageFilteredServices.map((service) => (
                        <ServiceCard cardInfo={service} type={service.type} />
                    )
                )))}
            </div>
        </div>
    )
}