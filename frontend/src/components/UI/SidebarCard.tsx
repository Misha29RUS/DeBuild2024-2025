import PowerOffSvg from "../../img/sidebar_card_svg/power_off.svg?react";
import { Selector } from "./Selector";
import { ITariff, IMobileService } from "../../app/services/types";
import { useFetchTariffsMutation, useFetchServicesMutation } from "../../app/services/users";
import { useEffect, useState } from "react";

type SidebarCardProps = {
  type: string;
  isEdit: boolean;
  cardInfo: ITariff | IMobileService;
  setNewService: (value: ITariff | IMobileService) => void;
  onDisableService?: () => void;
  onCancelService?: () => void;
  styles?: string;
};

export const SidebarCard = ({
  type,
  isEdit,
  cardInfo,
  setNewService,
  onDisableService,
  onCancelService,
  styles
}: SidebarCardProps) => {
  const [fetchTariffs, { data: tariffsData }] = useFetchTariffsMutation();
  const [fetchServices, { data: servicesData }] = useFetchServicesMutation();
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (type === "HIDDEN" || type === "ACTIVE") {
        fetchTariffs({ status: type, name: searchQuery });
      } else {
        fetchServices({ name: searchQuery });
      }
    }, 500); 

    return () => clearTimeout(timeoutId);
  }, [searchQuery, type, fetchTariffs, fetchServices]);

  return (
    <div
      className={`p-5 rounded-[20px] text-[18px] text-s-white
        ${
          type === "ACTIVE"
            ? "bg-s-red"
            : type === "HIDDEN"
              ? "bg-s-black"
              : type === "GIGABYTES"
                ? "bg-s-blue"
                : type === "MINUTES"
                  ? "bg-s-green"
                  : type === "SMS"
                    ? "bg-s-violet"
                    : type === "more" && "bg-s-dark-grey"
      } ${styles}`}
    >
      <div className="flex mb-2.5">
        {isEdit &&
        (type === "ACTIVE" || type === "HIDDEN" || type === "more") ? (
          <>
            <Selector
              selectList={
                type === "ACTIVE" || type === "HIDDEN"
                  ? tariffsData?.content || [] 
                  : servicesData?.content || []
              }
              type={type}
              value={type !== "more" ? cardInfo : ""}
              labelKey={"name"}
              setTakeValue={(value) => {
                setNewService(value)
              }}
              placeholder={
                type === "ACTIVE" || type === "HIDDEN"
                  ? "Выберите тариф"
                  : "Выберите услугу"
              }
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          </>
        ) : (
          <>
            <span className="text-[26px] mr-auto">{cardInfo?.name}</span>
            <span>
              {type === "ACTIVE"
                ? "Активный"
                : type === "HIDDEN"
                  ? "Архивный"
                  : type === "GIGABYTES"
                    ? "Интернет"
                    : type === "MINUTES"
                      ? "Телефон"
                      : type === "SMS" && "Сообщения"}
            </span>
          </>
        )}
      </div>
      {type !== "more" && (
        <>
          <div className={`${type === "MINUTES" || type === "SMS" ? "hidden" : "block"}`}>
            Гигабайты:{" "}
            <span className="font-extralight ml-[4px]">
              {cardInfo?.type === 'CUSTOMIZABLE' ? (cardInfo as ITariff)?.tariffResourceDto?.stepsGigabytes?.map((interval: number, index: number) => (
                <>{(cardInfo as ITariff)?.tariffResourceDto?.stepsGigabytes?.length === index + 1 
                  ? `${interval} ` : `${interval}, `} 
                </>
              ))
              : (cardInfo?.type === 'FIXED' ? (cardInfo as ITariff)?.tariffResourceDto?.countGigabytes : (cardInfo as IMobileService)?.countResources)
              }
            </span>
          </div>
          <div className={`${type === "GIGABYTES" || type === "SMS" ? "hidden" : "block"}`}>
            Минуты:{" "}
            <span className="font-extralight ml-[4px]">
              {cardInfo?.type === 'CUSTOMIZABLE' ? (cardInfo as ITariff)?.tariffResourceDto?.stepsMinutes?.map((interval: number, index: number) => (
                <>{(cardInfo as ITariff)?.tariffResourceDto?.stepsMinutes?.length === index + 1 
                  ? `${interval} ` : `${interval}, `} 
                </>
              ))
              : (cardInfo?.type === 'FIXED' ? (cardInfo as ITariff)?.tariffResourceDto?.countMinutes : (cardInfo as IMobileService)?.countResources)
              }
            </span>
          </div>
          <div className={`${type === "MINUTES" || type === "GIGABYTES" ? "hidden" : "block"}`}>
            СМС:{" "}
            <span className="font-extralight ml-[4px]">
              {cardInfo?.type === 'CUSTOMIZABLE' ? (cardInfo as ITariff)?.tariffResourceDto?.stepsSms?.map((interval: number, index: number) => (
                <>{(cardInfo as ITariff)?.tariffResourceDto?.stepsSms?.length === index + 1 
                  ? `${interval} ` : `${interval}, `} 
                </>
              ))
              : (cardInfo?.type === 'FIXED' ? (cardInfo as ITariff)?.tariffResourceDto?.countSms : (cardInfo as IMobileService)?.countResources)
              }
            </span>
          </div>
        </>
      )}
      {isEdit && type !== "ACTIVE" && type !== "HIDDEN" && (
        <div className="flex justify-end">
          <div className="cursor-pointer flex">
            {type !== "more" ? (
              <div
                onClick={() => {
                  if(onDisableService) onDisableService();
                  if (type === "more") {
                    if(onCancelService) onCancelService();
                  }
                }}
                className="flex"
              >
                <PowerOffSvg fill="white" />
                <p className="leading-[1.22] pl-[4px]">Отключить</p>
              </div>
            ) : (
              <div onClick={onCancelService}>Отменить</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
