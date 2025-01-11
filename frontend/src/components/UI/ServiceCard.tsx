import { IMobileService } from '../../app/services/types';
  
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
    styles
}: ServiceCardProps) => {
    return (
        <div onClick={onClick}
        className={`p-5 rounded-[20px] text-[18px] text-s-white w-full hover:cursor-pointer
        ${type === "GIGABYTES" ? "bg-s-blue"
        : (type === "MINUTES" ? "bg-s-green" : "bg-s-violet")} ${styles}`}>
            <div className="pb-5 mb-5 border-b border-b-s-white
            flex">
                <h3 className="font-light text-[26px] truncate">
                    {cardInfo.name}
                </h3>
            </div>
            <div>
                <div className="mb-2.5">
                    {cardInfo.type === 'GIGABYTES' ? (
                        <>
                            Гигабайты:{" "}
                            <span className="font-extralight ml-[4px]">
                                {cardInfo.countResources}
                            </span>
                        </>
                    ) : (cardInfo.type === 'MINUTES' ? (
                        <>
                            Минуты:{" "}
                            <span className="font-extralight ml-[4px]">
                                {cardInfo.countResources}
                            </span>
                        </>
                    ) : (
                        <>
                            СМС:{" "}
                            <span className="font-extralight ml-[4px]">
                                {cardInfo.countResources}
                            </span>
                        </>
                    ))}
                    
                </div>
                <div className="flex">
                    <div className="mr-auto">
                        Тип:{" "}
                        <span className="font-extralight ml-[4px]">
                            {cardInfo.oneTimeService ? 'Разовый' : 'Регулярный'}
                        </span>
                    </div>
                    <div>
                        {cardInfo.cost?.toLocaleString('ru-RU')} ₽
                    </div> 
                </div>
            </div>
        </div>
    )
}