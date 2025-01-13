import { useEffect, useState } from "react";

import { FinanceItem } from "./UI/FinanceItem.tsx";
import { Button } from "./UI/Button.tsx";
import { SidebarCard } from "./UI/SidebarCard.tsx";

import {
  useGetUserInfoQuery,
  useGetBalanceInfoQuery,
  useGetTariffInfoQuery,
  useGetServicesInfoQuery,
  useActivateServiceMutation,
  useDeactivateServiceMutation,
  useChangeTariffMutation,
} from "../app/services/users.ts";
import {
  IUserInfo,
  IBalanceOperation,
  IUserTariffInfo,
  ITariff,
  IUserServicesInfo,
  IMobileService,
} from "../app/services/types.ts";


import Close from "../img/abonent_sidebar_svg/close.svg?react";

import Edit from "../img/abonent_sidebar_svg/mode_edit.svg?react";

import Save from "../img/abonent_sidebar_svg/check.svg?react";

import Cancel from "../img/abonent_sidebar_svg/cancel.svg?react";

import Add from "../img/abonent_sidebar_svg/add.svg?react";
import { formatPhoneNumber } from "../utils/phoneUtils.ts";

export const AbonentSidebar = ({
  onClose,
  userID,
}: {
  onClose: () => void;
  userID: number;
}) => {
  const { data: userInfo } = useGetUserInfoQuery(userID);
  const { data: tariffInfo } = useGetTariffInfoQuery(userID);
  const { data: servicesInfo } = useGetServicesInfoQuery(userID);
  const { data: balanceInfo } = useGetBalanceInfoQuery(userID);
  const [tab, setTab] = useState("userInfo");
  const [key, setKey] = useState(0);
  useEffect(() => {
    setTab("userInfo");
  }, [userID]);

  const renderTabContent = () => {
    switch (tab) {
      case "userInfo":
        return userInfo ? <UserInfo data={userInfo} /> : null;
      case "tariffInfo":
        return tariffInfo ? (
          <TariffInfo
            data={tariffInfo}
            services={servicesInfo!}
            setKey={setKey}
          />
        ) : null;
      case "balanceInfo":
        return balanceInfo ? <BalanceInfo data={balanceInfo} /> : null;
      default:
        return null;
    }
  };

  return (
    <div className="absolute shadow-[-5px_0_10px_0_rgba(0,0,0,0.10)] z-10 right-[0] top-[80px] w-[680px] h-[calc(100vh-80px)] bg-s-white">
      <div className="flex flex-col h-[calc(100vh-80px)] p-[0px_0px_30px_0px]">
        <div className="p-[30px_30px_0px_30px]">
          <div className="flex justify-between border-b-[1px] border-s-light-grey pb-[20px]">
            <p className={`text-[26px] text-s-black font-light`}>
              {userInfo?.phoneNumber !== undefined &&
                formatPhoneNumber(userInfo?.phoneNumber)}
            </p>
            <button title="close" onClick={onClose}>
              <Close />
            </button>
          </div>
        </div>
        <div className="mt-5 p-[0px_30px_0px_30px]">
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
        <div className="flex-grow overflow-y-auto" key={key}>
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

const UserInfo = ({ data }: { data: IUserInfo }) => (
  <div>
    <ul className="mt-5 font-normal text-[18px] user-info-ul text-s-black p-[0px_30px_0px_30px]">
      <li>
        <p className="font-normal w-[35%]">Фамилия:</p>
        <p className="ml-[6px] font-light w-[65%]">{data.user.surname}</p>
      </li>
      <li>
        <p className="font-normal w-[35%]">Имя:</p>
        <p className="ml-[6px] font-light w-[65%]">{data.user.name}</p>
      </li>
      <li>
        <p className="text-s-black font-normal w-[35%]">Отчество:</p>
        <p className="ml-[6px] font-light w-[65%]">{data.user.patronymic}</p>
      </li>
      <li>
        <p className="text-s-black font-normal w-[35%]">Дата рождения:</p>
        <p className="ml-[6px] font-light w-[65%]">
          {`${data.user.userPassport.dateOfBirth.split("-")[2]}.${
            data.user.userPassport.dateOfBirth.split("-")[1]
          }.${data.user.userPassport.dateOfBirth.split("-")[0]}`}
        </p>
      </li>
      <li>
        <p className="text-s-black font-normal w-[35%]">Серия паспорта:</p>
        <p className="ml-[6px] font-light w-[65%]">
          {data.user.userPassport.passportSeries}
        </p>
      </li>
      <li>
        <p className="text-s-black font-normal w-[35%]">Номер паспорта:</p>
        <p className="ml-[6px] font-light w-[65%]">
          {data.user.userPassport.passportNumber}
        </p>
      </li>
    </ul>
  </div>
);

const TariffInfo = ({
  data,
  services,
  setKey,
}: {
  data: IUserTariffInfo;
  services: IUserServicesInfo;
  setKey: any;
}) => {
  const [isEditingTariff, setIsEditingTariff] = useState(false);
  const [isEditingService, setIsEditingService] = useState(false);
  const [newServices, setNewServices] = useState<IMobileService[]>([]);
  const [disabledServices, setDisabledServices] = useState(new Set());
  const [selectedTariff, setSelectedTariff] = useState(
    data.phoneNumberTariff.tariff,
  );
  const [curTariffInfo, setCurTariffInfo] = useState(data.phoneNumberTariff);

  const [activateService] = useActivateServiceMutation();
  const [deactivateService] = useDeactivateServiceMutation();
  const [changeTariff] = useChangeTariffMutation();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [selectedGigabytes, setSelectedGigabytes] = useState<number | null>(
    null,
  );
  const [selectedMinutes, setSelectedMinutes] = useState<number | null>(null);
  const [selectedSms, setSelectedSms] = useState<number | null>(null);

  const MAX_SERVICES = 15;
  const totalServices =
    services?.phoneNumberMobileServices?.length + newServices.length;

  const handleDisableService = (service: IMobileService) => {
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

  const handleEnableService = (service: IMobileService) => {
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

  const handleSaveChangesService = async () => {
    const remainingServices = services.phoneNumberMobileServices?.filter(
      (service) => disabledServices.has(service),
    );

    const filteredRemainingServices = remainingServices.filter(
      (remainingService) =>
        !newServices.some(
          (newService) => newService.id === remainingService.mobileService.id,
        ),
    );

    const filteredNewServices = newServices.filter(
      (newService) =>
        !remainingServices.some(
          (remainingService) =>
            newService.id === remainingService.mobileService.id,
        ) &&
        !services.phoneNumberMobileServices.some(
          (existingService) =>
            newService.id === existingService.mobileService.id,
        ),
    );

    try {
      await Promise.all(
        filteredNewServices.map((service) =>
          activateService({ phoneNumberId: data.id, serviceId: service.id })
            .unwrap()
            .catch((error) => {
              console.error(
                `Ошибка при активации услуги ${service.id}:`,
                error,
              );
              setErrorMessage(`Ошибка при активации услуги "${service.name}"`);
              setTimeout(() => setErrorMessage(null), 5000);
            }),
        ),
      );

      await Promise.all(
        filteredRemainingServices.map((service) =>
          deactivateService({
            phoneNumberId: data.id,
            serviceId: service.mobileService.id,
          })
            .unwrap()
            .catch((error) => {
              console.error(
                `Ошибка при деактивации услуги ${service.mobileService.id}:`,
                error,
              );
              setErrorMessage(
                `Ошибка при деактивации услуги "${service.mobileService.name}"`,
              );
              setTimeout(() => setErrorMessage(null), 5000);
            }),
        ),
      );

      setDisabledServices(new Set());
      setNewServices([]);
      setIsEditingService(false);
    } catch (error) {
      console.error("Ошибка при обработке изменений:", error);
      setErrorMessage("Произошла общая ошибка при сохранении изменений.");
      setTimeout(() => setErrorMessage(null), 5000);
    }
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


  const updateNewService = (index: number, updatedService) => {

    setNewServices((prevServices) =>

      prevServices.map((service, i) =>
        i === index ? updatedService : service,
      ),
    );
  };

  const hasIncompleteService = newServices.some(

    (service) => service.type === "more",
  );
  const handleSaveTariff = async () => {
    try {
      await changeTariff({
        phoneNumberId: data.id,
        tariffId: selectedTariff.id,
        minutesStep: selectedMinutes,
        smsStep: selectedSms,
        gigabyteStep: selectedGigabytes,
      }).unwrap();
      console.log(`Тариф "${selectedTariff.name}" успешно сохранен`);
      setTimeout(() => {
        setKey((prev) => prev + 1);
      }, 500); // Задержка в 2000 мс (2 секунды)
    } catch (error) {
      setSelectedTariff(data.phoneNumberTariff.tariff);
      setCurTariffInfo(data.phoneNumberTariff);
      console.error(`Ошибка при смене тарифа "${selectedTariff.name}":`, error);
      setErrorMessage(`Ошибка при смене тарифа "${selectedTariff.name}"`);
      setTimeout(() => setErrorMessage(null), 5000);
    } finally {
      setIsEditingTariff(false);

    }
  };

  const handleCancelTariff = () => {
    setSelectedTariff(data.phoneNumberTariff.tariff);
    setCurTariffInfo(data.phoneNumberTariff);
    setIsEditingTariff(false);
  };



  return (

    <div className="flex flex-col h-full relative">
      {errorMessage && (
        <div className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-red-500 text-white p-3 rounded shadow">
          {errorMessage}
        </div>
      )}
      <div className="mt-5 p-[0px_30px_0px_30px]">
        <div className="flex justify-between items-center">
          <p className="text-s-black text-[26px] font-light">Тариф</p>
          {!isEditingTariff ? (
            <Button
              text="Изменить"
              type="grey"
              iconLeft={<Edit />}
              onClick={() => {
                setIsEditingTariff(true);
              }}
              disabled={isEditingService}
            />
          ) : (
            <div className="flex">
              <Button
                text="Сохранить"
                type="red"
                iconLeft={<Save />}
                onClick={handleSaveTariff}
                disabled={
                  !selectedTariff?.name ||
                  (selectedTariff.type === "CUSTOMIZABLE" &&
                    selectedSms === null) ||
                  (selectedTariff.type === "CUSTOMIZABLE" &&
                    selectedMinutes === null) ||
                  (selectedTariff.type === "CUSTOMIZABLE" &&
                    selectedGigabytes === null)
                }
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
            type={selectedTariff?.status}
            cardInfo={selectedTariff}
            curTariffInfo={curTariffInfo}
            isEdit={isEditingTariff}
            setNewService={(value) => {
              setSelectedTariff(value as ITariff);
            }}
            setSelectedSms={setSelectedSms}
            setSelectedMinutes={setSelectedMinutes}
            setSelectedGigabytes={setSelectedGigabytes}
            selectedSms={selectedSms}
            selectedMinutes={selectedMinutes}
            selectedGigabytes={selectedGigabytes}
          />
        </div>
      </div>
      <div className="mt-5 flex flex-col h-full overflow-hidden">
        <div className="flex justify-between items-center p-[0px_30px_0px_30px]">
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
        <ul className="flex-grow overflow-y-auto user-service-info mt-[10px] p-[10px_24px_10px_30px] scrollbar-gutter-stable">
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
                    price: 0,
                    service_format: "",
                    details: { name_tariff: "", price: 0, service_format: "" },
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
          {services.phoneNumberMobileServices?.map((service, index) =>
            !disabledServices.has(service) ? (
                // @ts-ignore
              <li key={index}>
                <SidebarCard
                  type={service.type}
                  cardInfo={service.mobileService}
                  isEdit={isEditingService}
                    // @ts-ignore
                  onDisableService={() => handleDisableService(service)}
                    // @ts-ignore
                  onCancelService={() => handleEnableService(service)}
                />
              </li>
            ) : null,
          )}
          {services.phoneNumberMobileServices?.length > 0 ||
          isEditingService ? (
            <></>
          ) : (
              // @ts-ignore
            <p className="text-s-light-grey text-[26px] font-light mx-auto w-fit">
              Услуги не подключены
            </p>
          )}
        </ul>
      </div>
    </div>
  );
};

const BalanceInfo = ({ data }: { data: IBalanceOperation }) => (
  <div className="flex flex-col h-full">
    <div className="flex-grow overflow-x-auto">
      <div className="mt-5 relative p-[0px_30px_0px_30px]">
        {data.historyOfTransaction.length > 0 ? (
          data.historyOfTransaction.map((operation, index) => (
            <FinanceItem key={index} operation={operation} />
          ))
        ) : (
            // @ts-ignore
          <p className="text-s-light-grey text-[26px] font-light mx-auto w-fit">
            Нет операций
          </p>
        )}
      </div>
    </div>
    <div className="pt-5 p-[0px_30px_0px_30px]">
      <p className="text-[26px] font-light">Баланс: {data.balance} ₽</p>
    </div>
  </div>
);
