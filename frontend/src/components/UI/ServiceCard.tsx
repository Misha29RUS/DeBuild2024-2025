import { IMobileService } from "../../app/services/types";
import WiFi from "../../img/sidebar_card_svg/wifi.svg?react";
import Phone from "../../img/sidebar_card_svg/phone.svg?react";
import ChatBubbleOutline from "../../img/sidebar_card_svg/chat_bubble_outline.svg?react";

type ServiceCardProps = {
    type: string;
    cardInfo: IMobileService;
    onClick: () => void;
    styles?: string;
};

export const ServiceCard = ({
                                type,
                                cardInfo,
                                onClick,
                                styles,
                            }: ServiceCardProps) => {
    return (
        <div
            onClick={onClick}
            className={`rounded-[20px] text-[18px] shadow-[0px_0px_8px_0px_rgba(0,0,0,0.50)] hover:cursor-pointer ${styles}`}
        >
            {/* Header Section */}
            <div
                className={`flex p-5 rounded-t-[20px] ${
                    type === "GIGABYTES"
                        ? "bg-s-blue"
                        : type === "MINUTES"
                            ? "bg-s-green"
                            : "bg-s-violet"
                }`}
            >
        <span className="text-[26px] mr-auto text-s-white truncate">
          {cardInfo.name}
        </span>
                <span>
          {type === "GIGABYTES" ? (
              <WiFi fill="white" />
          ) : type === "MINUTES" ? (
              <Phone fill="white" />
          ) : (
              <ChatBubbleOutline fill="white" />
          )}
        </span>
            </div>

            {/* Details Section */}
            <div className={`text-s-black p-5 rounded-b-[20px]`}>
                {/* Resource Count */}
                <div className={`${type === "MINUTES" || type === "SMS" ? "hidden" : "block"}`}>
                    Гигабайты:{" "}
                    <span className="font-light ml-[4px]">
            {type === "GIGABYTES" ? cardInfo.countResources : "-"}
          </span>
                </div>
                <div className={`${type === "GIGABYTES" || type === "SMS" ? "hidden" : "block"}`}>
                    Минуты:{" "}
                    <span className="font-light ml-[4px]">
            {type === "MINUTES" ? cardInfo.countResources : "-"}
          </span>
                </div>
                <div className={`${type === "GIGABYTES" || type === "MINUTES" ? "hidden" : "block"}`}>
                    СМС:{" "}
                    <span className="font-light ml-[4px]">
            {type === "SMS" ? cardInfo.countResources : "-"}
          </span>
                </div>

                {/* Additional Info */}
                <div className={`flex justify-between mt-2`}>
          <span>
            Тип:{" "}
              <span className="font-light ml-[4px]">
              {cardInfo.oneTimeService ? "Разовая" : "Регулярная"}
            </span>
          </span>
                    <span>{cardInfo.cost?.toLocaleString("ru-RU")} ₽</span>
                </div>
            </div>
        </div>
    );
};
