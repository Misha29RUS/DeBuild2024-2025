
import { Tariff } from "../../mock/mock";
  
type TariffCardProps = {
    type: string;
    cardInfo: Tariff;
    onClick: () => void;
    styles?: string;
};

export const TariffCard = ({
    type,
    cardInfo,
    onClick,
    styles
}: TariffCardProps) => {
    return (
        <div className={`p-5 rounded-[20px] text-[18px] text-s-white w-full
        ${type === "active" ? "bg-s-red"
        : (type === "archive" && "bg-s-black")} ${styles}`}>
            <div className="pb-5 mb-5 border-b border-b-s-white
            flex">
                <h3 className="font-light text-[26px] mr-auto truncate">
                    {cardInfo.details.name_tariff}
                </h3>
                <div className="text-[18px]">
                    {cardInfo.type === 'active' ? 'Активный'
                    : (cardInfo.type === 'archive' && 'Архивный')}
                </div>
            </div>
            <div>
                <div className="mb-2.5">
                    Гигабайты:{" "}
                    <span className="font-extralight ml-[4px]">
                        {cardInfo.details.tariff_format === 'custom' ? cardInfo.details.count_internet.map((interval: number, index: number) => (
                            <>{cardInfo.details.count_internet.length === index + 1 
                                ? `${interval} ` : `${interval}, `} 
                            </>
                        ))
                        : (cardInfo.details.tariff_format === 'fixed' && cardInfo.details.count_internet)}
                    </span>
                </div>
                <div className="mb-2.5">
                    Минуты:{" "}
                    <span className="font-extralight ml-[4px]">
                        {cardInfo.details.tariff_format === 'custom' ? cardInfo.details.count_minute.map((interval: number, index: number) => (
                            <>{cardInfo.details.count_minute.length === index + 1 
                                ? `${interval} ` : `${interval}, `} 
                            </>
                        ))
                        : (cardInfo.details.tariff_format === 'fixed' && cardInfo.details.count_minute)}
                    </span>
                </div>
                <div className="mb-2.5">
                    СМС:{" "}
                    <span className="font-extralight ml-[4px]">
                        {cardInfo.details.tariff_format === 'custom' ? cardInfo.details.count_message.map((interval: number, index: number) => (
                            <>{cardInfo.details.count_message.length === index + 1 
                                ? `${interval} ` : `${interval}, `} 
                            </>
                        ))
                        : (cardInfo.details.tariff_format === 'fixed' && cardInfo.details.count_message)}
                    </span>
                </div>
                <div className="flex">
                    <div className="mr-auto">
                        Тип:{" "}
                        <span className="font-extralight ml-[4px]">
                            {cardInfo.details.tariff_format === 'custom' ? 'Настраиваемый'
                            : (cardInfo.details.tariff_format === 'fixed' && 'Фиксированный')}
                        </span>
                    </div>
                    {cardInfo.details.tariff_format === 'fixed' && (
                       <div>
                            {cardInfo.details.price?.toLocaleString('ru-RU')} ₽
                        </div> 
                    )}
                </div>
            </div>
        </div>
    )
}