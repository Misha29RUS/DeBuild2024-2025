import WiFi from "../../img/sidebar_card_svg/wifi.svg?react";
import Phone from "../../img/sidebar_card_svg/phone.svg?react";
import FolderOpen from "../../img/sidebar_card_svg/folder_open.svg?react";
import FileDownloadDone from "../../img/sidebar_card_svg/file_download_done.svg?react";
import ChatBubbleOutline from "../../img/sidebar_card_svg/chat_bubble_outline.svg?react";

import { Selector } from "./Selector";
import {
  ITariff,
  IMobileService,
  IPhoneNumberTariff,
} from "../../app/services/types";
import {
  useFetchTariffsMutation,
  useFetchServicesMutation,
} from "../../app/services/users";
import { useEffect, useState } from "react";
import { SelectorChose } from "./SelectorChose.tsx";

type SidebarCardProps = {
  type: string;
  isEdit: boolean;
  curTariffInfo: {};
  cardInfo: ITariff | IMobileService;
  setNewService: (value: ITariff | IMobileService) => void;
  onDisableService?: () => void;
  onCancelService?: () => void;
  styles?: string;
  setSelectedSms?: () => void;
  setSelectedMinutes?: () => void;
  setSelectedGigabytes?: () => void;
  selectedSms?: () => number;
  selectedMinutes?: () => number;
  selectedGigabytes?: () => number;
};

export const SidebarCard = ({
  type,
  isEdit,
  curTariffInfo,
  cardInfo,
  setNewService,
  onDisableService,
  onCancelService,
  styles,
  setSelectedSms,
  setSelectedMinutes,
  setSelectedGigabytes,
  selectedSms,
  selectedMinutes,
  selectedGigabytes,
}: SidebarCardProps) => {
  const [fetchTariffs, { data: tariffsData }] = useFetchTariffsMutation();
  const [fetchServices, { data: servicesData }] = useFetchServicesMutation();
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (type === "ACTIVE" || type === "HIDDEN" || type === "DELETED") {
        fetchTariffs({ status: type, name: searchQuery });
      } else {
        fetchServices({ name: searchQuery });
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, type, fetchTariffs, fetchServices]);

  const cost =
    ((cardInfo as ITariff)?.tariffResourceDto?.costOneGigabyte ?? 0) *
      ((curTariffInfo as IPhoneNumberTariff)?.countGigabytesAtStartOfPeriod ??
        0) +
    ((cardInfo as ITariff)?.tariffResourceDto?.costOneMinute ?? 0) *
      ((curTariffInfo as IPhoneNumberTariff)?.countMinutesAtStartOfPeriod ??
        0) +
    ((cardInfo as ITariff)?.tariffResourceDto?.costOneSms ?? 0) *
      ((curTariffInfo as IPhoneNumberTariff)?.countSmsAtStartOfPeriod ?? 0);

  const [dynamicCost, setDynamicCost] = useState(cost);

  // useEffect(() => {
  //   const editableCost =
  //     ((cardInfo as ITariff)?.tariffResourceDto?.costOneGigabyte ?? 0) *
  //       (selectedGigabytes ?? 0) +
  //     ((cardInfo as ITariff)?.tariffResourceDto?.costOneMinute ?? 0) *
  //       (selectedMinutes ?? 0) +
  //     ((cardInfo as ITariff)?.tariffResourceDto?.costOneSms ?? 0) *
  //       (selectedSms ?? 0);
  //   setDynamicCost(editableCost);
  // }, [
  //   cardInfo,
  //   selectedGigabytes,
  //   selectedMinutes,
  //   selectedSms,
  //   curTariffInfo,
  // ]);
  return (
    <div
      className={`rounded-[20px] text-[18px] shadow-[0px_0px_8px_0px_rgba(0,0,0,0.50)] ${styles}`}
    >
      <div
        className={`flex p-5 rounded-t-[20px] ${
          type === "ACTIVE"
            ? "bg-s-red"
            : type === "HIDDEN" || type === "DELETED"
              ? "bg-s-black"
              : type === "GIGABYTES"
                ? "bg-s-blue"
                : type === "MINUTES"
                  ? "bg-s-green"
                  : type === "SMS"
                    ? "bg-s-violet"
                    : type === "more"
                      ? ""
                      : ""
        }`}
      >
        {isEdit &&
        (type === "ACTIVE" ||
          type === "HIDDEN" ||
          type === "DELETED" ||
          type === "more") ? (
          <Selector
            selectList={
              type === "ACTIVE" || type === "HIDDEN" || type === "DELETED"
                ? tariffsData?.content || []
                : servicesData?.content || []
            }
            type={type !== "more" ? type : ""}
            value={type !== "more" ? cardInfo : ""}
            labelKey={"name"}
            setTakeValue={(value) => {
              setNewService(value);
              // Очищаем значения всех трех SelectorChose
              if (setSelectedGigabytes) setSelectedGigabytes(null);
              if (setSelectedMinutes) setSelectedMinutes(null);
              if (setSelectedSms) setSelectedSms(null);
            }}
            placeholder={
              type === "ACTIVE" || type === "HIDDEN" || type === "DELETED"
                ? "Выберите тариф"
                : "Выберите услугу"
            }
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        ) : (
          <>
            <span className="text-[26px] mr-auto text-s-white">
              {cardInfo?.name}
            </span>
            <span>
              {type === "ACTIVE" ? (
                <FileDownloadDone fill="white" />
              ) : type === "HIDDEN" || type === "DELETED" ? (
                <FolderOpen fill="white" />
              ) : type === "GIGABYTES" ? (
                <WiFi fill="white" />
              ) : type === "MINUTES" ? (
                <Phone fill="white" />
              ) : type === "SMS" ? (
                <ChatBubbleOutline fill="white" />
              ) : null}
            </span>
          </>
        )}
      </div>
      {cardInfo?.type === "CUSTOMIZABLE" && isEdit && (
        <div className="p-[20px_20px_0px_20px] flex">
          <div>
            <p>Гигабайты:</p>
            <SelectorChose
              placeholder="0"
              selectList={
                (cardInfo as ITariff)?.tariffResourceDto?.stepsGigabytes || []
              }
              value={selectedGigabytes}
              setTakeValue={(value) => {
                setSelectedGigabytes(value); // Устанавливаем значение
                const editableCost =
                  ((cardInfo as ITariff)?.tariffResourceDto?.costOneGigabyte ??
                    0) *
                    (value ?? 0) + // Используем новое значение
                  ((cardInfo as ITariff)?.tariffResourceDto?.costOneMinute ??
                    0) *
                    (selectedMinutes ?? 0) +
                  ((cardInfo as ITariff)?.tariffResourceDto?.costOneSms ?? 0) *
                    (selectedSms ?? 0);
                setDynamicCost(editableCost); // Обновляем стоимость
              }}
            />
          </div>
          <div className="pl-[20px]">
            <p>Минуты:</p>
            <SelectorChose
              selectList={
                (cardInfo as ITariff)?.tariffResourceDto?.stepsMinutes || []
              }
              value={selectedMinutes}
              setTakeValue={(value) => {
                setSelectedMinutes(value); // Устанавливаем значение
                const editableCost =
                  ((cardInfo as ITariff)?.tariffResourceDto?.costOneGigabyte ??
                    0) *
                    (value ?? 0) + // Используем новое значение
                  ((cardInfo as ITariff)?.tariffResourceDto?.costOneMinute ??
                    0) *
                    (selectedMinutes ?? 0) +
                  ((cardInfo as ITariff)?.tariffResourceDto?.costOneSms ?? 0) *
                    (selectedSms ?? 0);
                setDynamicCost(editableCost); // Обновляем стоимость
              }}
              placeholder="0"
            />
          </div>
          <div className="pl-[20px]">
            <p>СМС:</p>
            <SelectorChose
              selectList={
                (cardInfo as ITariff)?.tariffResourceDto?.stepsSms || []
              }
              value={selectedSms}
              setTakeValue={(value) => {
                setSelectedSms(value); // Устанавливаем значение
                const editableCost =
                  ((cardInfo as ITariff)?.tariffResourceDto?.costOneGigabyte ??
                    0) *
                    (value ?? 0) + // Используем новое значение
                  ((cardInfo as ITariff)?.tariffResourceDto?.costOneMinute ??
                    0) *
                    (selectedMinutes ?? 0) +
                  ((cardInfo as ITariff)?.tariffResourceDto?.costOneSms ?? 0) *
                    (selectedSms ?? 0);
                setDynamicCost(editableCost); // Обновляем стоимость
              }}
              placeholder="0"
            />
          </div>
        </div>
      )}
      {type !== "more" && (
        <div className="text-s-black p-5 rounded-b-[20px]">
          <div
            className={`flex ${type === "MINUTES" || type === "SMS" || (cardInfo?.type === "CUSTOMIZABLE" && isEdit) ? "hidden" : "block"}`}
          >
            Гигабайты:
            <span
              className={`font-light ml-[4px] ${cardInfo?.type === "CUSTOMIZABLE" ? "hidden" : "block"}`}
            >
              {(cardInfo as ITariff)?.tariffResourceDto?.countGigabytes ??
                (cardInfo as IMobileService)?.countResources}
            </span>
            <span
              className={`font-light ml-[4px] ${cardInfo?.type === "FIXED" ? "hidden" : "block"}`}
            >
              {
                (curTariffInfo as IPhoneNumberTariff)
                  ?.countGigabytesAtStartOfPeriod
              }
            </span>
          </div>
          <div
            className={`flex ${type === "GIGABYTES" || type === "SMS" || (cardInfo?.type === "CUSTOMIZABLE" && isEdit) ? "hidden" : "block"}`}
          >
            Минуты:{" "}
            <span
              className={`font-light ml-[4px] ${cardInfo?.type === "CUSTOMIZABLE" ? "hidden" : "block"}`}
            >
              {(cardInfo as ITariff)?.tariffResourceDto?.countMinutes ??
                (cardInfo as IMobileService)?.countResources}
            </span>
            <span
              className={`font-light ml-[4px] ${cardInfo?.type === "FIXED" ? "hidden" : "block"}`}
            >
              {
                (curTariffInfo as IPhoneNumberTariff)
                  ?.countMinutesAtStartOfPeriod
              }
            </span>
          </div>
          <div
            className={`flex ${type === "MINUTES" || type === "GIGABYTES" || (cardInfo?.type === "CUSTOMIZABLE" && isEdit) ? "hidden" : "block"}`}
          >
            СМС:{" "}
            <span
              className={`font-light ml-[4px] ${cardInfo?.type === "CUSTOMIZABLE" ? "hidden" : "block"}`}
            >
              {(cardInfo as ITariff)?.tariffResourceDto?.countSms ??
                (cardInfo as IMobileService)?.countResources}
            </span>
            <span
              className={`font-light ml-[4px] ${cardInfo?.type === "FIXED" ? "hidden" : "block"}`}
            >
              {(curTariffInfo as IPhoneNumberTariff)?.countSmsAtStartOfPeriod}
            </span>
          </div>
          <div className={`flex justify-between`}>
            <span>
              <div className="flex">
                Тип:{" "}
                <div className="ml-[4px]">
                  <span className={`font-light`}>
                    {cardInfo?.type === "FIXED"
                      ? "Фиксированный"
                      : cardInfo?.type === "CUSTOMIZABLE"
                        ? "Настраиваемый"
                        : ""}
                  </span>
                  <span
                    className={`${type === "SMS" || type === "GIGABYTES" || type === "MINUTES" ? "" : "hidden"} font-light`}
                  >
                    {cardInfo?.oneTimeService ? "Регулярная" : "Разовая"}
                  </span>
                </div>
              </div>
            </span>
            <span
              className={`${cardInfo?.type === "CUSTOMIZABLE" ? "hidden" : "block"}`}
            >
              {cardInfo?.cost} ₽
            </span>
            <span
              className={`${cardInfo?.type === "FIXED" || isEdit || type === "SMS" || type === "GIGABYTES" || type === "MINUTES" ? "hidden" : "block"}`}
            >
              {dynamicCost} ₽
            </span>
            <span
              className={`${cardInfo?.type === "CUSTOMIZABLE" && isEdit ? "block" : "hidden"}`}
            >
              {((cardInfo as ITariff)?.tariffResourceDto?.costOneGigabyte ??
                0) *
                (selectedGigabytes ?? 0) +
                ((cardInfo as ITariff)?.tariffResourceDto?.costOneMinute ?? 0) *
                  (selectedMinutes ?? 0) +
                ((cardInfo as ITariff)?.tariffResourceDto?.costOneSms ?? 0) *
                  (selectedSms ?? 0)}{" "}
              ₽
            </span>
          </div>
        </div>
      )}

      {isEdit &&
        type !== "ACTIVE" &&
        type !== "HIDDEN" &&
        type !== "DELETED" && (
          <div className="font-medium text-[18px] p-[0px_20px_20px_20px]">
            <div className=" flex border-t-[1px] border-s-light-grey flex-grow">
              {type !== "more" ? (
                <p
                  className="mx-auto w-fit pt-5 cursor-pointer"
                  onClick={() => {
                    if (onDisableService) onDisableService();
                    if (type === "more" && onCancelService) onCancelService();
                  }}
                >
                  Отключить
                </p>
              ) : (
                <p
                  onClick={onCancelService}
                  className="mx-auto w-fit pt-5 cursor-pointer"
                >
                  Отменить
                </p>
              )}
            </div>
          </div>
        )}
    </div>
  );
};
