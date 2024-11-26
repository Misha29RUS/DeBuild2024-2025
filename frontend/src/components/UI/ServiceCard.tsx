import { Service } from "../../mock/mock";
  
type ServicefCardProps = {
    type: string;
    cardInfo: Service;
    onClick: () => void;
    styles?: string;
};

export const ServiceCard = ({
    type,
    cardInfo,
    onClick,
    styles
}: ServicefCardProps) => {
    return (
        <div className={`p-5 rounded-[20px] text-[18px] text-s-white w-full
        ${type === "internet" ? "bg-s-blue"
        : (type === "call" ? "bg-s-green" : "bg-s-violet")} ${styles}`}>
            <div className="pb-5 mb-5 border-b border-b-s-white
            flex">
                <h3 className="font-light text-[26px] truncate">
                    {cardInfo.details.name_tariff}
                </h3>
            </div>
            <div>
                <div className="mb-2.5">
                    {cardInfo.type === 'internet' ? (
                        <>
                            Гигабайты:{" "}
                            <span className="font-extralight ml-[4px]">
                                {cardInfo.details.count_internet}
                            </span>
                        </>
                    ) : (cardInfo.type === 'call' ? (
                        <>
                            Минуты:{" "}
                            <span className="font-extralight ml-[4px]">
                                {cardInfo.details.count_minute}
                            </span>
                        </>
                    ) : (
                        <>
                            СМС:{" "}
                            <span className="font-extralight ml-[4px]">
                                {cardInfo.details.count_message}
                            </span>
                        </>
                    ))}
                    
                </div>
                <div className="flex">
                    <div className="mr-auto">
                        Тип:{" "}
                        <span className="font-extralight ml-[4px]">
                            {cardInfo.details.service_format === 'onetime' ? 'Разовый'
                            : (cardInfo.details.service_format === 'regular' && 'Регулярный')}
                        </span>
                    </div>
                    <div>
                        {cardInfo.details.price?.toLocaleString('ru-RU')} ₽
                    </div> 
                </div>
            </div>
        </div>
    )
}