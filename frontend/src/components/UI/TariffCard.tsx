import { ITariff } from "../../app/services/types.ts";
import FolderOpen from "../../img/sidebar_card_svg/folder_open.svg?react";
import FileDownloadDone from "../../img/sidebar_card_svg/file_download_done.svg?react";

type TariffCardProps = {
    type: string;
    cardInfo: ITariff;
    onClick: () => void;
    styles?: string;
};

export const TariffCard = ({ type, cardInfo, onClick, styles }: TariffCardProps) => {
    const getTypeColor = () => {
        if (type === "ACTIVE") return "bg-s-red";
        if (type === "HIDDEN") return "bg-s-black";
        return "bg-s-gray";
    };

    const renderIcon = () => {
        if (type === "ACTIVE") return <FileDownloadDone fill="white" />;
        if (type === "HIDDEN") return <FolderOpen fill="white" />;
        return null;
    };

    return (
        <div
            onClick={onClick}
            className={`rounded-[20px] shadow-[0px_0px_8px_0px_rgba(0,0,0,0.50)] ${styles}`}
        >
            <div className={`flex p-5 rounded-t-[20px] ${getTypeColor()}`}>
                <span className="text-[26px] mr-auto text-s-white truncate">{cardInfo.name}</span>
                {renderIcon()}
            </div>
            <div className="text-s-black p-5 rounded-b-[20px]">
                <div className="mb-2.5">
                    Гигабайты:{" "}
                    <span className="font-light ml-[4px]">
            {cardInfo.type === "CUSTOMIZABLE"
                ? cardInfo.tariffResourceDto.stepsGigabytes?.join(", ")
                : cardInfo.tariffResourceDto.countGigabytes}
          </span>
                </div>
                <div className="mb-2.5">
                    Минуты:{" "}
                    <span className="font-light ml-[4px]">
            {cardInfo.type === "CUSTOMIZABLE"
                ? cardInfo.tariffResourceDto.stepsMinutes?.join(", ")
                : cardInfo.tariffResourceDto.countMinutes}
          </span>
                </div>
                <div className="mb-2.5">
                    СМС:{" "}
                    <span className="font-light ml-[4px]">
            {cardInfo.type === "CUSTOMIZABLE"
                ? cardInfo.tariffResourceDto.stepsSms?.join(", ")
                : cardInfo.tariffResourceDto.countSms}
          </span>
                </div>
                <div className="flex justify-between">
                    <div>
                        Тип:{" "}
                        <span className="font-light ml-[4px]">
              {cardInfo.type === "CUSTOMIZABLE" ? "Настраиваемый" : "Фиксированный"}
            </span>
                    </div>
                    {cardInfo.type === "FIXED" && (
                        <div>{cardInfo.cost.toLocaleString("ru-RU")} ₽</div>
                    )}
                </div>
            </div>
        </div>
    );
};
