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
        active: <ActiveTariffSvg className="fill-s-white" />,
        archive: <ArchiveTariffSvg className="fill-s-white" />,
        internet: <InternetSvg className="fill-s-blue" />,
        call: <CallSvg className="fill-s-green" />,
        message: <MessageSvg className="fill-s-violet" />,
        more: <MoreSvg className="fill-s-dark-grey" />
    };
    const Icon = iconMap[type] || null;

    return (
        <div
        className={`py-[5px] text-[18px] px-1.5 rounded-[20px] flex items-center whitespace-nowrap
        ${type === 'active' ? "text-s-white bg-s-red"
        : (type === 'archive' ? "text-s-white bg-s-black"
        : (type === 'internet' ? "text-s-blue border border-s-blue"
        : (type === 'call' ? "text-s-green border border-s-green"
        : (type === 'message' ? "text-s-violet border border-s-violet"
        : (type === 'more' && "border border-s-dark-grey")))))} ${styles}`}>
            {Icon && <span className={`${type !== 'more' && 'mr-1.5'}`}>{Icon}</span>}
            <span>{text}</span>
        </div>
    )
}