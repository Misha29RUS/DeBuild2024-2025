// @ts-ignore
import { useLocation, useNavigate } from "react-router-dom"
import LogoSvg from "../img/header_svg/logo_header.svg?react"
// @ts-ignore
import UsersSvg from "../img/header_svg/person_outline.svg?react"
// @ts-ignore
import TariffsSvg from "../img/header_svg/menu.svg?react"
// @ts-ignore
import ServicesSvg from "../img/header_svg/list_alt.svg?react"
// @ts-ignore
import ProfileSvg from "../img/header_svg/account_circle.svg?react"
// @ts-ignore
import ExitSvg from "../img/header_svg/exit_to_app.svg?react"
import { NavButton } from "./UI/NavButton"
import { Button } from "./UI/Button"

export const Header = () => {
    const location = useLocation()
    const lastPartURL = location.pathname === '/' ? 'root' : location.pathname.split('/').filter(Boolean).pop();
    const initials_user_name = localStorage.getItem("initials_user_name");
    const navigate = useNavigate();

    const handleLogout = () => {
        document.cookie = `accessToken=; path=/; max-age=0; secure; samesite=strict`;
        document.cookie = `refreshToken=; path=/; max-age=0; secure; samesite=strict`;

        // Перенаправляем на страницу входа
        navigate('/login');
    };
    return (
        // @ts-ignore
        <header className="px-[90px] py-[19px] bg-s-black flex items-center h-[80px]">
            <LogoSvg className="mr-auto" />
            <div className="flex items-center">
                <NavButton styles="mr-5" text="Абоненты"
                iconLeft={<UsersSvg />} to="/"
                isActive={lastPartURL === 'root'} />
                <div className="relative">
                    <NavButton styles="mr-5" text="Тарифы"
                    to="/active_tariffs"
                    iconLeft={<TariffsSvg />}
                    isActive={lastPartURL === 'active_tariffs' || lastPartURL === 'archive_tariffs'} />
                </div>
                <NavButton styles="mr-5" text="Услуги"
                iconLeft={<ServicesSvg />} to="/services"
                isActive={lastPartURL === 'services'} />
                <Button styles="mr-5" text={`${initials_user_name}`} type="red"
                iconLeft={<ProfileSvg />} />
                <Button type="grey" onlyIcon={<ExitSvg />} onClick={handleLogout}/>
            </div>
        </header>
    )
}