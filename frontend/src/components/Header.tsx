import { useLocation } from "react-router-dom"
import LogoSvg from "../img/header_svg/logo_header.svg?react"
import UsersSvg from "../img/header_svg/person_outline.svg?react"
import TariffsSvg from "../img/header_svg/menu.svg?react"
import ActiveSvg from "../img/header_svg/file_download_done.svg?react"
import ArchiveSvg from "../img/header_svg/folder_open.svg?react"
import ServicesSvg from "../img/header_svg/list_alt.svg?react"
import ProfileSvg from "../img/header_svg/account_circle.svg?react"
import ExitSvg from "../img/header_svg/exit_to_app.svg?react"
import { NavButton } from "./UI/NavButton"
import { Button } from "./UI/Button"
import { useState, useRef, useEffect } from "react"

export const Header = () => {
    const [isTariffsDropdownOpen, setIsTariffsDropdownOpen] = useState(false)
    const location = useLocation()
    const lastPartURL = location.pathname === '/' ? 'root' : location.pathname.split('/').filter(Boolean).pop();

    // Закрытие dropdown при клике вне его
    const dropdownRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !(dropdownRef.current).contains(event.target as Node)) {
                setIsTariffsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <header className="px-[90px] py-[19px] bg-s-black flex items-center h-[80px]">
            <LogoSvg className="mr-auto" />
            <div className="flex items-center">
                <NavButton styles="mr-5" text="Абоненты"
                iconLeft={<UsersSvg />} to="/" 
                isActive={lastPartURL === 'root'} />
                <div className="relative" ref={dropdownRef}>
                    <NavButton styles="mr-5" text="Тарифы"
                    onClick={() => setIsTariffsDropdownOpen(!isTariffsDropdownOpen)} 
                    iconLeft={<TariffsSvg />} 
                    isActive={lastPartURL === 'active_tariffs' || lastPartURL === 'archive_tariffs'} />
                    {isTariffsDropdownOpen && (
                        <div className="absolute px-5 rounded-b-[10px]
                        bg-s-black -left-5 top-14">
                            <NavButton styles="mb-[26px]" text="Активные"
                            onClick={() => setIsTariffsDropdownOpen(false)}
                            iconLeft={<ActiveSvg />} to="active_tariffs" />
                            <NavButton styles="mb-[26px]" text="Архивные"
                            onClick={() => setIsTariffsDropdownOpen(false)}
                            iconLeft={<ArchiveSvg />} to="/archive_tariffs" />
                        </div>
                    )}
                </div>
                <NavButton styles="mr-5" text="Услуги" 
                iconLeft={<ServicesSvg />} to="/services"
                isActive={lastPartURL === 'services'} />
                <Button styles="mr-5" text="Иванов И. И." type="red"
                iconLeft={<ProfileSvg />} />
                <Button type="grey" onlyIcon={<ExitSvg />} />
            </div>
        </header>
    )
}