import ActiveTariffSvg from "../../img/tag_table_svg/file_download_done.svg?react"
import ArchiveTariffSvg from "../../img/tag_table_svg/folder_open.svg?react"
import InternetSvg from "../../img/tag_table_svg/wifi.svg?react"
import CallSvg from "../../img/tag_table_svg/local_phone.svg?react"
import MessageSvg from "../../img/tag_table_svg/chat_bubble_outline.svg?react"
import MoreSvg from "../../img/tag_table_svg/more_horiz.svg?react"

type TableTagProps = {
    type: string;
    text?: string | number;
    styles?: string;
}

export const TableTag = ({type, text, styles}: TableTagProps) => {
    const iconMap: { [key: string]: JSX.Element } = {
        ACTIVE: <ActiveTariffSvg className="fill-s-white" />,
        HIDDEN: <ArchiveTariffSvg className="fill-s-white" />,
        GIGABYTES: <InternetSvg className="fill-s-blue" />,
        MINUTES: <CallSvg className="fill-s-green" />,
        SMS: <MessageSvg className="fill-s-violet" />,
        more: <MoreSvg className="fill-s-dark-grey" />
    };
    const Icon = iconMap[type] || null;

    return (
        <div
        className={`py-[5px] text-[18px] px-1.5 rounded-[20px] 
        flex items-center whitespace-nowrap truncate
        ${type === 'ACTIVE' ? "text-s-white bg-s-red"
        : (type === 'HIDDEN' ? "text-s-white bg-s-black"
        : (type === 'GIGABYTES' ? "text-s-blue border border-s-blue"
        : (type === 'MINUTES' ? "text-s-green border border-s-green"
        : (type === 'SMS' ? "text-s-violet border border-s-violet"
        : (type === 'more' && "border border-s-dark-grey")))))} ${styles}`}>
            {Icon && <span className={`${type !== 'more' && 'mr-1.5'}`}>{Icon}</span>}
            <span className="truncate">{text}</span>
        </div>
    )
}