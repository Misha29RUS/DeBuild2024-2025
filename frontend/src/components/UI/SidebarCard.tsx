import PowerOffSvg from "../../img/sidebar_card_svg/power_off.svg?react"
import { Selector } from "./Selector";

type CardInfo = {
    name_tariff: string;
    count_minute: number;
    count_internet: number;
    count_message: number; 
}

type SidebarCardProps = {
    type: string;
    isEdit: boolean;
    cardInfo: CardInfo;
}

export const SidebarCard = ({
    type,
    isEdit,
    cardInfo,
}: SidebarCardProps) => {
    // это моковые данные, я предполагаю, что при нажатии на кнопку изменить
    // именно в компоненте SidebarCard будет происходить вызов с бэка
    const selectList = [
        {name_tariff: "base"},
        {name_tariff: "mega"},
        {name_tariff: "super"}
    ]
    // вообще этот компонент будет переделываться 100%, так как
    // пока не пойму, какие будут запросы

    return (
        <div className={`p-5 rounded-[20px] text-[18px] text-white
        ${type === 'active' ? 'bg-s-red'
        : (type === 'archive' ? 'bg-black'
        : (type === 'internet' ? 'bg-s-blue'
        : (type === 'call' ? 'bg-s-green'
        : (type === 'message' ? 'bg-s-violet'
        : (type === 'more' && 'bg-s-dark-grey')))))}`}>
            <div className="flex mb-2.5">
                {isEdit && type === 'active' || type === 'archive' || type === 'more' ? (
                    <>
                        <Selector selectList={selectList} type={type}
                        value={cardInfo} labelKey={'name_tariff'}  />
                    </>
                ) : (
                    <>
                       <span className="text-[26px] mr-auto">
                            {cardInfo.name_tariff}
                        </span>
                        <span>
                            {type === 'active' ? 'Активный'
                            : (type === 'archive' ? 'Архивный'
                            : (type === 'internet' ? 'Интернет'
                            : (type === 'call' ? 'Телефон'
                            : (type === 'message' && 'Сообщения'))))}
                        </span> 
                    </>
                )}
                
            </div>
            {type !== 'more' && (
                <>
                    <div className={`${type === 'call' || type === 'message' ? 'hidden' : 'block'}`}>
                        Гигабайты: <span className="font-extralight ml-2.5">
                            {cardInfo?.count_internet}
                        </span>
                    </div>
                    <div className={`${type === 'internet' || type === 'message' ? 'hidden' : 'block'}`}>
                        Минуты: <span className="font-extralight ml-2.5">
                            {cardInfo?.count_minute}
                        </span>
                    </div>
                    <div className={`${type === 'call' || type === 'internet' ? 'hidden' : 'block'}`}>
                        СМС: <span className="font-extralight ml-2.5">
                            {cardInfo?.count_message}
                        </span>
                    </div>
                </>
            )}
            {isEdit && type !== 'active' && type !== 'archive' && (
                <div className="flex justify-end">
                    <div className="cursor-pointer flex">
                        {type !== 'more' ? (
                            <>
                                <PowerOffSvg fill="white" /> Отключить
                            </>
                        ) : (
                            <>
                                Отменить
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}