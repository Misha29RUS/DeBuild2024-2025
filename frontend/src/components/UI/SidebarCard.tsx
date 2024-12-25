// import PowerOffSvg from "../../img/sidebar_card_svg/power_off.svg?react";
import WiFi from "../../img/sidebar_card_svg/wifi.svg?react";
import Phone from "../../img/sidebar_card_svg/phone.svg?react";
import FolderOpen from "../../img/sidebar_card_svg/folder_open.svg?react";
import FileDownloadDone from "../../img/sidebar_card_svg/file_download_done.svg?react";
import ChatBubbleOutline from "../../img/sidebar_card_svg/chat_bubble_outline.svg?react";

import { Selector } from "./Selector";

type CardInfo = {
  name_tariff?: string;
  count_minute?: number;
  count_internet?: number;
  count_message?: number;
  price?: number;
  tariff_format?: string;
  service_format?: string;
};

type SidebarCardProps = {
  type: string;
  isEdit: boolean;
  cardInfo: CardInfo;
  setNewService?: (value: any) => void;
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
  styles,
}: SidebarCardProps) => {
  // это моковые данные, я предполагаю, что при нажатии на кнопку изменить
  // именно в компоненте SidebarCard будет происходить вызов с бэка
  const selectListTariff = [
    {
      type: "active",
      name_tariff: "Мировой",
      count_minute: 900,
      count_internet: 200,
      count_message: 100,
      price: 1000,
      tariff_format: "fixed",
      details: {
        name_tariff: "Мировой",
        count_minute: 900,
        count_internet: 200,
        count_message: 100,
        price: 1000,
        tariff_format: "fixed",
      },
    },
    {
      type: "active",
      name_tariff: "Привет, интернет",
      count_minute: 200,
      count_internet: 500,
      count_message: 10,
      price: 1500,
      tariff_format: "fixed",
      details: {
        name_tariff: "Привет, интернет",
        count_minute: 200,
        count_internet: 500,
        count_message: 10,
        price: 1500,
        tariff_format: "fixed",
      },
    },
    {
      type: "active",
      name_tariff: "Мой разговор 2024",
      count_minute: 300,
      count_internet: 20,
      count_message: 100,
      price: 700,
      tariff_format: "fixed",
      details: {
        name_tariff: "Мой разговор 2024",
        count_minute: 300,
        count_internet: 20,
        count_message: 100,
        price: 700,
        tariff_format: "fixed",
      },
    },
    {
      type: "active",
      name_tariff: "Мой разговор 2022",
      count_minute: 250,
      count_internet: 15,
      count_message: 150,
      price: 150,
      tariff_format: "fixed",
      details: {
        name_tariff: "Мой разговор 2022",
        count_minute: 250,
        count_internet: 15,
        count_message: 150,
        price: 150,
        tariff_format: "fixed",
      },
    },
    {
      type: "active",
      name_tariff: "Минимум",
      count_minute: 100,
      count_internet: 5,
      count_message: 15,
      price: 650,
      tariff_format: "fixed",
      details: {
        name_tariff: "Минимум",
        count_minute: 100,
        count_internet: 5,
        count_message: 15,
        price: 650,
        tariff_format: "fixed",
      },
    },
    {
      type: "active",
      name_tariff: "Для бабуле",
      count_minute: 350,
      count_internet: 3,
      count_message: 350,
      price: 300,
      tariff_format: "fixed",
      details: {
        name_tariff: "Для бабуле",
        count_minute: 350,
        count_internet: 3,
        count_message: 350,
        price: 300,
        tariff_format: "fixed",
      },
    },
  ];

  const selectListService = [
    {
      type: "call",
      name_tariff: "250 минут",
      count_minute: 250,
      price: 30,
      service_format: "regular",
      details: {
        name_tariff: "250 минут",
        count_minute: 250,
        price: 30,
        service_format: "regular",
      },
    },
    {
      type: "call",
      name_tariff: "500 минут",
      count_minute: 500,
      price: 150,
      service_format: "onetime",
      details: {
        name_tariff: "500 минут",
        count_minute: 500,
        price: 150,
        service_format: "onetime",
      },
    },
    {
      type: "internet",
      name_tariff: "1 ГБ",
      count_internet: 1,
      price: 30,
      service_format: "onetime",
      details: {
        name_tariff: "1 ГБ",
        count_internet: 1,
        price: 30,
        service_format: "onetime",
      },
    },
    {
      type: "internet",
      name_tariff: "5 ГБ",
      count_internet: 5,
      price: 60,
      service_format: "regular",
      details: {
        name_tariff: "5 ГБ",
        count_internet: 5,
        price: 60,
        service_format: "regular",
      },
    },
    {
      type: "message",
      name_tariff: "50 SMS",
      count_message: 50,
      price: 160,
      service_format: "regular",
      details: {
        name_tariff: "50 SMS",
        count_message: 50,
        price: 160,
        service_format: "regular",
      },
    },
    {
      type: "message",
      name_tariff: "100 SMS",
      count_message: 100,
      price: 260,
      service_format: "onetime",
      details: {
        name_tariff: "100 SMS",
        count_message: 100,
        price: 260,
        service_format: "onetime",
      },
    },
  ];
  // вообще этот компонент будет переделываться 100%, так как
  // пока не пойму, какие будут запросы
  return (
    <div
      className={`rounded-[20px] text-[18px] shadow-[0px_0px_8px_0px_rgba(0,0,0,0.50)]
         ${styles}`}
    >
      <div
        className={`flex p-5 rounded-t-[20px] ${
          type === "active"
            ? "bg-s-red"
            : type === "archive"
              ? "bg-s-black"
              : type === "internet"
                ? "bg-s-blue"
                : type === "call"
                  ? "bg-s-green"
                  : type === "message"
                    ? "bg-s-violet"
                    : type === "more" && ""
        }`}
      >
        {isEdit &&
        (type === "active" || type === "archive" || type === "more") ? (
          <>
            <Selector
              selectList={
                type === "active" || type === "archive"
                  ? selectListTariff
                  : selectListService
              }
              type={type !== "more" ? type : null}
              value={type !== "more" ? cardInfo : ""}
              labelKey={"name_tariff"}
              setTakeValue={(value) => setNewService(value)}
              placeholder={
                type === "active" || type === "archive"
                  ? "Выберите тариф"
                  : "Выберите услугу"
              }
            />
          </>
        ) : (
          <>
            <span className="text-[26px] mr-auto text-s-white">
              {cardInfo.name_tariff}
            </span>
            <span>
              {type === "active" ? (
                <FileDownloadDone fill="white" />
              ) : type === "archive" ? (
                <FolderOpen fill="white" />
              ) : type === "internet" ? (
                <WiFi fill="white" />
              ) : type === "call" ? (
                <Phone fill="white" />
              ) : (
                type === "message" && <ChatBubbleOutline fill="white" />
              )}
            </span>
          </>
        )}
      </div>
      {type !== "more" && (
        <div className={`text-s-black p-5 rounded-b-[20px]`}>
          <div
            className={`${type === "call" || type === "message" ? "hidden" : "block"}`}
          >
            Гигабайты:{" "}
            <span className="font-extralight ml-[4px]">
              {cardInfo?.count_internet}
            </span>
          </div>
          <div
            className={`${type === "internet" || type === "message" ? "hidden" : "block"}`}
          >
            Минуты:{" "}
            <span className="font-extralight ml-[4px]">
              {cardInfo?.count_minute}
            </span>
          </div>
          <div
            className={`${type === "call" || type === "internet" ? "hidden" : "block"}`}
          >
            СМС:{" "}
            <span className="font-extralight ml-[4px]">
              {cardInfo?.count_message}
            </span>
          </div>
          <div className={`flex justify-between`}>
            <span>
              <div>
                Тип:{" "}
                <span
                  className={`${type === "active" || type === "archive" ? "" : "hidden"} font-extralight ml-[4px]`}
                >
                  {type === "active" || "archive"
                    ? cardInfo?.tariff_format === "fixed"
                      ? "Фиксированный"
                      : cardInfo?.tariff_format === "custom"
                        ? "Настраиваемый"
                        : ""
                    : null}
                </span>
                <span
                  className={`${type === "call" || type === "internet" || type === "message" ? "" : "hidden"} font-extralight ml-[4px]`}
                >
                  {type === "call" || "internet" || "message"
                    ? cardInfo?.service_format === "regular"
                      ? "Регулярная"
                      : cardInfo?.service_format === "onetime"
                        ? "Разовая"
                        : ""
                    : null}
                </span>
              </div>
            </span>
            <span className="">{cardInfo?.price} ₽</span>
          </div>
        </div>
      )}
      {isEdit && type !== "active" && type !== "archive" && (
        <div className="font-medium text-[18px] p-[0px_20px_20px_20px]">
          <div className="cursor-pointer flex border-t-[1px] border-s-light-grey flex-grow">
            {type !== "more" ? (
              <p
                className="mx-auto w-fit pt-5"
                onClick={() => {
                  onDisableService();
                  if (type === "more") {
                    onCancelService();
                  }
                }}
              >
                Отключить
              </p>
            ) : (
              <p onClick={onCancelService} className="mx-auto w-fit pt-5">
                Отменить
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
