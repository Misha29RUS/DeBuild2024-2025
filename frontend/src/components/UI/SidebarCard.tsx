import PowerOffSvg from "../../img/sidebar_card_svg/power_off.svg?react";
import { Selector } from "./Selector";

type CardInfo = {
  name_tariff?: string;
  count_minute?: number;
  count_internet?: number;
  count_message?: number;
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
  styles
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
      details: {
        name_tariff: "Мировой",
        count_minute: 900,
        count_internet: 200,
        count_message: 100,
      },
    },
    {
      type: "active",
      name_tariff: "Привет, интернет",
      count_minute: 200,
      count_internet: 500,
      count_message: 10,
      details: {
        name_tariff: "Привет, интернет",
        count_minute: 200,
        count_internet: 500,
        count_message: 10,
      },
    },
    {
      type: "active",
      name_tariff: "Мой разговор 2024",
      count_minute: 300,
      count_internet: 20,
      count_message: 100,
      details: {
        name_tariff: "Мой разговор 2024",
        count_minute: 300,
        count_internet: 20,
        count_message: 100,
      },
    },
    {
      type: "active",
      name_tariff: "Мой разговор 2022",
      count_minute: 250,
      count_internet: 15,
      count_message: 150,
      details: {
        name_tariff: "Мой разговор 2022",
        count_minute: 250,
        count_internet: 15,
        count_message: 150,
      },
    },
    {
      type: "active",
      name_tariff: "Минимум",
      count_minute: 100,
      count_internet: 5,
      count_message: 15,
      details: {
        name_tariff: "Минимум",
        count_minute: 100,
        count_internet: 5,
        count_message: 15,
      },
    },
    {
      type: "active",
      name_tariff: "Для бабуле",
      count_minute: 350,
      count_internet: 3,
      count_message: 350,
      details: {
        name_tariff: "Для бабуле",
        count_minute: 350,
        count_internet: 3,
        count_message: 350,
      },
    },
  ];

  const selectListService = [
    {
      type: "call",
      name_tariff: "250 минут",
      count_minute: 250,
      details: { name_tariff: "250 минут", count_minute: 250 },
    },
    {
      type: "call",
      name_tariff: "500 минут",
      count_minute: 500,
      details: { name_tariff: "500 минут", count_minute: 500 },
    },
    {
      type: "internet",
      name_tariff: "1 ГБ",
      count_internet: 1,
      details: { name_tariff: "1 ГБ", count_internet: 1 },
    },
    {
      type: "internet",
      name_tariff: "5 ГБ",
      count_internet: 5,
      details: { name_tariff: "5 ГБ", count_internet: 5 },
    },
    {
      type: "message",
      name_tariff: "50 SMS",
      count_message: 50,
      details: { name_tariff: "50 SMS", count_message: 50 },
    },
    {
      type: "message",
      name_tariff: "100 SMS",
      count_message: 100,
      details: { name_tariff: "100 SMS", count_message: 100 },
    },
  ];
  // вообще этот компонент будет переделываться 100%, так как
  // пока не пойму, какие будут запросы

  return (
    <div
      className={`p-5 rounded-[20px] text-[18px] text-s-white
        ${
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
                    : type === "more" && "bg-s-dark-grey"
      } ${styles}`}
    >
      <div className="flex mb-2.5">
        {isEdit &&
        (type === "active" || type === "archive" || type === "more") ? (
          <>
            <Selector
              selectList={
                type === "active" || type === "archive"
                  ? selectListTariff
                  : selectListService
              }
              type={type}
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
            <span className="text-[26px] mr-auto">{cardInfo.name_tariff}</span>
            <span>
              {type === "active"
                ? "Активный"
                : type === "archive"
                  ? "Архивный"
                  : type === "internet"
                    ? "Интернет"
                    : type === "call"
                      ? "Телефон"
                      : type === "message" && "Сообщения"}
            </span>
          </>
        )}
      </div>
      {type !== "more" && (
        <>
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
        </>
      )}
      {isEdit && type !== "active" && type !== "archive" && (
        <div className="flex justify-end">
          <div className="cursor-pointer flex">
            {type !== "more" ? (
              <div
                onClick={() => {
                  onDisableService();
                  if (type === "more") {
                    onCancelService();
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
