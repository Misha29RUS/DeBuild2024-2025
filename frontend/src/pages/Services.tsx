// @ts-ignore
import { useEffect, useState } from "react";
import { Button } from "../components/UI/Button";// @ts-ignore
import { Counter } from "../components/UI/Counter";// @ts-ignore
import FilterSvg from "../img/filter_alt.svg?react";
import { Input } from "../components/UI/Input";
import { Tab } from "../components/UI/Tab";// @ts-ignore
import AddSvg from "../img/abonent_sidebar_svg/add.svg?react";
import { ServiceCard } from "../components/UI/ServiceCard";
import { SelectorMock } from "../components/UI/SelectorMock";
import { useGetServicesQuery } from "../app/services/services";
import { ServicesSidebar } from "../components/ServicesSidebar.tsx";
import { NewServiceSidebar } from "../components/NewServiceSidebar.tsx";
import axios from "axios";

const typesServices = [
  {
    format: true,
    formatName: "Разовая",
  },
  {
    format: false,
    formatName: "Регулярная",
  },
];
type typesServices = {
  format: boolean;
  formatName: string;
};

type appliedFiltersType = {
  nameService: string;
  oneTimeService?: typesServices;
};

export const Services = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarNewService, setIsSidebarNewService] = useState(false);
  const [serviceId, setServiceId] = useState<number | null>(null);

  const [isFiltersOpen, setIsFiltersIsOpen] = useState(false);
  const [typeService, setTypeService] = useState<
    "MINUTES" | "GIGABYTES" | "SMS"
  >("GIGABYTES");
  const [oneTimeService, setOneTimeService] = useState<
    typesServices | undefined
  >();
  const [nameService, setNameService] = useState("");
  const [appliedFilters, setAppliedFilters] = useState<appliedFiltersType>({
    oneTimeService: undefined,
    nameService: "",
  });

  const { data: servicesData } = useGetServicesQuery({
    type: typeService,
    oneTimeService: appliedFilters.oneTimeService?.format,
    name: appliedFilters.nameService,
  });

  // Примененные фильтры
  const nonFalseValuesCount = Object.values(appliedFilters).filter((value) => {
    return Boolean(value); // Считает только "истинные" значения
  }).length;

  // Применение фильтров
  const applyFilters = () => {
    setAppliedFilters({
      oneTimeService: oneTimeService,
      nameService: nameService,
    });
  };

  // Сброс фильтров
  const resetFilters = () => {
    setOneTimeService(undefined);
    setNameService("");
    setAppliedFilters({
      oneTimeService: undefined,
      nameService: "",
    });
  };

  const [isAdmin, setIsAdmin] = useState<boolean | null>(false);
  useEffect(() => {
    const fetchEmployeeData = async () => {
      const accessToken = document.cookie
        .split("; ")
        .find((row) => row.startsWith("accessToken="))
        ?.split("=")[1];

      if (!accessToken) {
        console.error("Access token not found");
        return;
      }

      try {
        const resp = await axios.post(
          `/api/profile/employee`,
          {},
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );

        if (resp.data.role === "ROLE_ADMIN") {
          setIsAdmin(true);
        }
      } finally {
      }
    };

    fetchEmployeeData();
  }, []);

  return (// @ts-ignore
    <div className="grow px-[90px] py-10 overflow-y-auto">
      <div className="flex items-center mb-2.5">
        <div className="flex items-center mr-auto">
          <h2 className="text-[34px] text-s-black mr-3">Услуги</h2>
          {/*<Counter */}
          {/*desired_entries={typeService === 'internet'*/}
          {/*    ? internetFilteredServices.length*/}
          {/*    : (typeService === 'message' ? messageFilteredServices.length */}
          {/*    : callFilteredServices.length)*/}
          {/*} */}
          {/*all_entries={services.length} />*/}
        </div>
        <Button
          type="red"
          text={nonFalseValuesCount}
          iconRight={<FilterSvg className="w-[22px] h-[22px]" />}
          onClick={() => setIsFiltersIsOpen(!isFiltersOpen)}
        />
      </div>
      <div
        className={`mb-5 transition-all duration-300 ease-out transform ${
          isFiltersOpen
            ? "opacity-100 max-h-screen translate-y-0"
            : "opacity-0 max-h-0 overflow-hidden translate-y-4"
        }`}
      >
        <div className="flex gap-5 mb-2.5">
          <div className="w-[435px]">
            <Input
              value={nameService}
              setTakeValue={setNameService}
              placeholder="Введите название"
            />
          </div>
          <div className="w-[335px]">
            <SelectorMock
              selectList={typesServices}
              labelKey="formatName"
              value={oneTimeService}
              setTakeValue={setOneTimeService}
              placeholder="Выберите тип"
            />
          </div>
        </div>
        <div className="flex items-center">
          <Button
            type="red"
            text="Применить"
            styles="mr-[30px]"
            onClick={applyFilters}
          />
          <Button type="grey" text="Очистить" onClick={resetFilters} />
        </div>
      </div>
      <div className="mb-10 flex items-center">
        <div className="mr-auto">
          <Tab
            text="Гигабайты"
            select={typeService === "GIGABYTES"}
            onClick={() => setTypeService("GIGABYTES")}
            styles="text-[26px] font-medium mr-5"
          />
          <Tab
            text="Минуты"
            select={typeService === "MINUTES"}
            onClick={() => setTypeService("MINUTES")}
            styles="text-[26px] font-medium mr-5"
          />
          <Tab
            text="СМС"
            select={typeService === "SMS"}
            onClick={() => setTypeService("SMS")}
            styles="text-[26px] font-medium"
          />
        </div>
        {isAdmin && (
          <Button
            onClick={() => setIsSidebarNewService(true)}
            text="Новая услуга"
            type="red"
            iconLeft={<AddSvg />}
          />
        )}
      </div>
      <div className="grid grid-cols-3 gap-12">
        {// @ts-ignore
            servicesData?.content.map((service, index) => (
          <ServiceCard
            key={index}
            onClick={() => {
              setServiceId(service.id);
              setIsSidebarOpen(isSidebarNewService === true ? false : true);
            }}
            cardInfo={service}
            type={service.type}
          />
        ))}
      </div>
      {isSidebarOpen && (
        <ServicesSidebar
          serviceID={serviceId!}
          onClose={() => {
            setIsSidebarOpen(!isSidebarOpen);
            setServiceId(null);
          }}
        />
      )}
      {isSidebarNewService && (
        <NewServiceSidebar
          onClose={() => {
            setIsSidebarNewService(!isSidebarNewService);
          }}
        />
      )}
    </div>
  );
};
