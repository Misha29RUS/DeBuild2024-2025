import { useEffect, useState } from "react";

import { FinanceItem } from "./UI/FinanceItem.tsx";
import { Button } from "./UI/Button.tsx";
import { SidebarCard } from "./UI/SidebarCard.tsx";

import { users, UserDetails } from "../mock/mock.ts";

import Close from "../img/abonent_sidebar_svg/close.svg?react";
import Edit from "../img/abonent_sidebar_svg/mode_edit.svg?react";
import Save from "../img/abonent_sidebar_svg/check.svg?react";
import Cancel from "../img/abonent_sidebar_svg/cancel.svg?react";
import Add from "../img/abonent_sidebar_svg/add.svg?react";

export const AbonentSidebar = ({
  onClose,
  userID,
}: {
  onClose: () => void;
  userID: number;
}) => {
  const [data, setData] = useState<UserDetails | null>(null);

  useEffect(() => {
    const getData = () => {
      const user = users.find((user) => user.id === userID);
      setData(user);
    };
    getData();
  }, [userID]);

  const [tab, setTab] = useState("userInfo");

  useEffect(() => {
    setTab("userInfo");
  }, [userID]);

  const renderTabContent = () => {
    switch (tab) {
      case "userInfo":
        return data ? <UserInfo data={data} /> : null;
      case "tariffInfo":
        return data ? <TariffInfo data={data} /> : null;
      case "balanceInfo":
        return data ? <BalanceInfo data={data} /> : null;
      default:
        return null;
    }
  };

  return (
    <div className="absolute shadow-[-5px_0_10px_0_rgba(0,0,0,0.10)] z-10 right-[0] top-[80px] w-[680px] h-[calc(100vh-80px)] bg-s-white">
      <div className="flex flex-col h-[calc(100vh-80px)] p-[30px]">
        <div className="border-b-[1px] border-s-light-grey flex justify-between pb-[20px]">
          <p className={`text-[26px] text-s-black font-light`}>
            {data?.phoneNumber}
          </p>
          <button title="close" onClick={onClose}>
            <Close />
          </button>
        </div>
        <div className="mt-5">
          <ul className="flex font-medium text-[18px] text-s-light-grey tabs-ul">
            {["userInfo", "tariffInfo", "balanceInfo"].map((id) => (
              <li key={id} className="relative">
                <button
                  className={`transition-colors pb-1 relative ${tab === id ? "text-s-red" : ""}`}
                  onClick={() => setTab(id)}
                >
                  {id === "userInfo" && "Об абоненте"}
                  {id === "tariffInfo" && "Тариф и услуги"}
                  {id === "balanceInfo" && "Баланс"}
                  <span
                    className={`absolute bottom-0 left-0 w-full h-[1px] bg-s-red transform transition-transform duration-300 ease-in-out ${tab === id ? "scale-x-100" : "scale-x-0"}`}
                  ></span>
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex-grow overflow-y-auto">{renderTabContent()}</div>
      </div>
    </div>
  );
};
const UserInfo = ({ data }: { data: UserDetails }) => (
  <div>
    <ul className="mt-5 font-normal text-[18px] user-info-ul text-s-black">
      <li>
        <p className="font-normal">Фамилия:</p>
        <p className="ml-[6px] font-extralight">{data.lastName}</p>
      </li>
      <li>
        <p className="font-normal">Имя:</p>
        <p className="ml-[6px] font-extralight">{data.firstName}</p>
      </li>
      <li>
        <p className="text-s-black font-normal">Отчество:</p>
        <p className="ml-[6px] font-extralight">{data.middleName}</p>
      </li>
      <li>
        <p className="text-s-black font-normal">Дата рождения:</p>
        <p className="ml-[6px] font-extralight">{data.birthDate}</p>
      </li>
      <li>
        <p className="text-s-black font-normal">Серия паспорта:</p>
        <p className="ml-[6px] font-extralight">{data.passportSeries}</p>
      </li>
      <li>
        <p className="text-s-black font-normal">Номер паспорта:</p>
        <p className="ml-[6px] font-extralight">{data.passportNumber}</p>
      </li>
    </ul>
  </div>
);

const TariffInfo = ({ data }: { data: UserDetails }) => {
  const [isEditingTariff, setIsEditingTariff] = useState(false);
  const [isEditingService, setIsEditingService] = useState(false);
  const [newServices, setNewServices] = useState([]);
  const [disabledServices, setDisabledServices] = useState(new Set());
  const [selectedTariff, setSelectedTariff] = useState(data.tariff);

  const MAX_SERVICES = 15;
  const totalServices = data.services.length + newServices.length;

  const handleDisableService = (service) => {
    setDisabledServices((prev) => {
      const newSet = new Set(prev);
      newSet.add(service);
      return newSet;
    });
    if (newServices.includes(service)) {
      setNewServices((prevServices) =>
        prevServices.filter((s) => s !== service),
      );
    }
  };

  const handleEnableService = (service) => {
    setDisabledServices((prev) => {
      const newSet = new Set(prev);
      newSet.delete(service);
      return newSet;
    });
  };

  const handleCancelChangesService = () => {
    setDisabledServices(new Set());
    setNewServices([]);
    setIsEditingService(false);
  };

  const handleSaveChangesService = () => {
    const remainingServices = data.services.filter(
      (service) => !disabledServices.has(service),
    );
    const updatedServices = [...newServices, ...remainingServices];
    data.services = updatedServices;
    setDisabledServices(new Set());
    setNewServices([]);
    setIsEditingService(false);
  };

  const addNewServiceCard = () => {
    if (totalServices < MAX_SERVICES) {
      const newService = { type: "more", name_tariff: "" };
      setNewServices((prevServices) => [newService, ...prevServices]);
      setDisabledServices((prev) => {
        const newSet = new Set(prev);
        newSet.add(newService);
        return newSet;
      });
    }
  };

  const updateNewService = (index, updatedService) => {
    setNewServices((prevServices) =>
      prevServices.map((service, i) =>
        i === index ? updatedService : service,
      ),
    );
  };

  const hasIncompleteService = newServices.some(
    (service) => service.type === "more",
  );

  const handleSaveTariff = () => {
    setIsEditingTariff(false);
  };

  const handleCancelTariff = () => {
    setSelectedTariff(data.tariff);
    setIsEditingTariff(false);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="mt-5">
        <div className="flex justify-between">
          <p className="text-s-black text-[26px] font-light">Тариф</p>
          {!isEditingTariff ? (
              <Button
                  text="Изменить"
                  type="grey"
                  iconLeft={<Edit />}
                  onClick={() => setIsEditingTariff(true)}
                  disabled={isEditingService}
              />
          ) : (
              <div className="flex">
                <Button
                    text="Сохранить"
                    type="red"
                    iconLeft={<Save />}
                    onClick={handleSaveTariff}
                    disabled={!selectedTariff.details.name_tariff}
                />
                <Button
                    text="Отменить"
                    type="grey"
                    iconLeft={<Cancel />}
                    onClick={handleCancelTariff}
                    styles="ml-[26px]"
                />
              </div>
          )}
        </div>
        <div className="mt-5">
          <SidebarCard
              type={selectedTariff.type}
              cardInfo={selectedTariff.details}
              isEdit={isEditingTariff}
              setNewService={(value) => {
                if (value === "") {
                  setSelectedTariff({
                    type: "active",
                    name_tariff: "",
                    count_minute: 0,
                    count_internet: 0,
                    count_message: 0,
                    details: {
                      name_tariff: "",
                      count_minute: 0,
                      count_internet: 0,
                      count_message: 0,
                    },
                  });
                } else {
                  setSelectedTariff(value);
                }
              }}
          />
        </div>
      </div>
      <div className="mt-5 flex flex-col h-full overflow-hidden">
        <div className="flex justify-between">
          <p className="text-s-black text-[26px] font-light">Услуги</p>
          {!isEditingService ? (
            <Button
              text="Изменить"
              type="grey"
              iconLeft={<Edit />}
              onClick={() => setIsEditingService(true)}
              disabled={isEditingTariff}
            />
          ) : (
            <div className="flex">
              <Button
                text="Сохранить"
                type="red"
                iconLeft={<Save />}
                onClick={handleSaveChangesService}
                disabled={hasIncompleteService}
              />
              <Button
                text="Отменить"
                type="grey"
                iconLeft={<Cancel />}
                onClick={handleCancelChangesService}
                styles="ml-[26px]"
              />
            </div>
          )}
        </div>
        {isEditingService && (
          <div className="flex items-center mt-5 mx-auto w-fit">
            <Button
              type="grey"
              onlyIcon={<Add />}
              onClick={addNewServiceCard}
              disabled={hasIncompleteService || totalServices >= MAX_SERVICES}
            />
          </div>
        )}
        <ul className="flex-grow overflow-y-auto user-service-info mt-5">
          {newServices.map((service, index) => (
            <li key={index}>
              <SidebarCard
                type={service.type}
                cardInfo={service}
                isEdit={true}
                setNewService={(updatedService) => {
                  const defaultService = {
                    type: "more",
                    name_tariff: "",
                    details: { name_tariff: "" },
                  };

                  updateNewService(index, updatedService || defaultService);
                }}
                onDisableService={() => handleDisableService(service)}
                onCancelService={() =>
                  setNewServices((prev) => prev.filter((s) => s !== service))
                }
              />
            </li>
          ))}
          {data.services.map((service, index) =>
            !disabledServices.has(service) ? (
              <li key={index}>
                <SidebarCard
                  type={service.type}
                  cardInfo={service.details}
                  isEdit={isEditingService}
                  onDisableService={() => handleDisableService(service)}
                  onCancelService={() => handleEnableService(service)}
                />
              </li>
            ) : null,
          )}
          {data.services.length > 0 || isEditingService ? (
            <></>
          ) : (
            <p className="text-s-light-grey text-[26px] font-light mx-auto w-fit">
              Услуги не подключены
            </p>
          )}
        </ul>
      </div>
    </div>
  );
};

const BalanceInfo = ({ data }: { data: UserDetails }) => (
  <div className="flex flex-col h-full">
    <div className="flex-grow overflow-x-auto">
      <div className="mt-5 relative">
        {data.financialOperations.length > 0 ? (
          data.financialOperations.map((operation, index) => (
            <FinanceItem key={index} operation={operation} />
          ))
        ) : (
          <p className="text-s-light-grey text-[26px] font-light mx-auto w-fit">
            Нет операций
          </p>
        )}
      </div>
    </div>
    <div className="pt-5">
      <p className="text-[26px] font-light">Баланс: {data.balance} ₽</p>
    </div>
  </div>
);
