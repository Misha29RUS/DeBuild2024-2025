import { ITariff } from "../../app/services/types.ts";

type TariffCardProps = {
    type: string;
    cardInfo: ITariff;
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
        <div onClick={onClick}
        className={`p-5 rounded-[20px] text-[18px] text-s-white w-full hover:cursor-pointer
        ${type === "ACTIVE" ? "bg-s-red"
        : (type === "HIDDEN" && "bg-s-black")} ${styles}`}>
            <div className="pb-5 mb-5 border-b border-b-s-white
            flex">
                <h3 className="font-light text-[26px] mr-auto truncate">
                    {cardInfo.name}
                </h3>
                <div className="text-[18px]">
                    {cardInfo.status === 'ACTIVE' ? 'Активный'
                    : (cardInfo.status === 'HIDDEN' && 'Архивный')}
                </div>
            </div>
            <div>
                <div className="mb-2.5">
                    Гигабайты:{" "}
                    <span className="font-extralight ml-[4px]">
                        {cardInfo.type === 'CUSTOMIZABLE' ? cardInfo.tariffResourceDto.stepsGigabytes?.map((interval: number, index: number) => (
                            <>{cardInfo.tariffResourceDto.stepsGigabytes?.length === index + 1
                                ? `${interval} ` : `${interval}, `} 
                            </>
                        ))
                        : (cardInfo.type === 'FIXED' && cardInfo.tariffResourceDto.countGigabytes)}
                    </span>
                </div>
                <div className="mb-2.5">
                    Минуты:{" "}
                    <span className="font-extralight ml-[4px]">
                        {cardInfo.type === 'CUSTOMIZABLE' ? cardInfo.tariffResourceDto.stepsMinutes?.map((interval: number, index: number) => (
                            <>{cardInfo.tariffResourceDto.stepsMinutes?.length === index + 1
                                ? `${interval} ` : `${interval}, `} 
                            </>
                        ))
                        : (cardInfo.type === 'FIXED' && cardInfo.tariffResourceDto.countMinutes)}
                    </span>
                </div>
                <div className="mb-2.5">
                    СМС:{" "}
                    <span className="font-extralight ml-[4px]">
                        {cardInfo.type === 'CUSTOMIZABLE' ? cardInfo.tariffResourceDto.stepsSms?.map((interval: number, index: number) => (
                            <>{cardInfo.tariffResourceDto.stepsSms?.length === index + 1
                                ? `${interval} ` : `${interval}, `} 
                            </>
                        ))
                        : (cardInfo.type === 'FIXED' && cardInfo.tariffResourceDto.countSms)}
                    </span>
                </div>
                <div className="flex">
                    <div className="mr-auto">
                        Тип:{" "}
                        <span className="font-extralight ml-[4px]">
                            {cardInfo.type === 'CUSTOMIZABLE' ? 'Настраиваемый'
                            : (cardInfo.type === 'FIXED' && 'Фиксированный')}
                        </span>
                    </div>
                    {cardInfo.type === 'FIXED' && (
                       <div>
                            {cardInfo.cost.toLocaleString('ru-RU')} ₽
                        </div> 
                    )}
                </div>
            </div>
        </div>
    )
}