// @ts-ignore
import { useState } from "react"
import { TableTag } from "./UI/TableTag"
import { AbonentSidebar } from "./AbonentSidebar"
import { IUsers } from "../app/services/types"
import {formatPhoneNumber} from "../utils/phoneUtils.ts";

export const UsersTable = ({ users }: {users: IUsers | undefined}) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const [userId, setUserId] = useState<number | null>(null)

    return (
        // @ts-ignore
        <>
            <table className="w-full text-s-black table-fixed">
                <thead className="bg-s-light-grey">
                    <tr>
                        <th className="font-medium py-2.5 pl-5 text-left w-[11%]">
                            Телефон
                        </th>
                        <th className="font-medium py-2.5 pl-5 text-left w-[14%]">
                            Фамилия
                        </th>
                        <th className="font-medium py-2.5 pl-5 text-left w-[14%]">
                            Имя
                        </th>
                        <th className="font-medium py-2.5 pl-5 text-left w-[14%]">
                            Отчество
                        </th>
                        <th className="font-medium py-2.5 pl-5 text-left w-[20%]">
                            Тариф
                        </th>
                        <th className="font-medium py-2.5 pl-5 text-left w-[27%]">
                            Услуги
                        </th>
                    </tr>
                </thead>
                {users && users?.content?.length > 0 && (
                    // @ts-ignore
                    <tbody>
                        {users?.content.map((user, key) => (
                            // @ts-ignore
                            <tr className={`border-b border-b-s-light-grey
                            hover:bg-s-light-grey cursor-pointer
                            ${userId === user.id && 'bg-s-light-grey'}`} 
                            key={key}
                            onClick={() => {
                                setUserId(user.id)
                                setIsSidebarOpen(true)
                            }}>
                                <td className="font-light py-[15px] pl-5 truncate">
                                    {formatPhoneNumber(user.phoneNumber)}
                                </td>
                                <td className="font-light py-[15px] pl-5 truncate">
                                    {user.user.surname}
                                </td>
                                <td className="font-light py-[15px] pl-5 truncate">
                                    {user.user.name}
                                </td>
                                <td className="font-light py-[15px] pl-5 truncate">
                                    {user.user.patronymic}
                                </td>
                                <td className="py-[15px] pl-5 flex">
                                    <TableTag type={user.phoneNumberTariff.tariff.status} text={user.phoneNumberTariff.tariff.name} />
                                </td>
                                <td className="py-[15px] pl-5">
                                    {user.phoneNumberMobileServices.length > 0 && (
                                        <ul className="flex gap-2.5">
                                            {user.phoneNumberMobileServices.slice(0, 3).map((service, index) => (
                                                <li key={index} className="truncate">
                                                    <TableTag text={service.mobileService.name} type={service.mobileService.type} />
                                                </li>
                                            ))}
                                            {user.phoneNumberMobileServices.length > 3 && (
                                                <li>
                                                    <TableTag type="more" />
                                                </li>
                                            )}
                                        </ul>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody> 
                )}
            </table>
            {users?.content?.length === 0 && (
                // @ts-ignore
                <div className="text-[38px] text-center font-medium text-s-light-grey mt-[100px]">
                    Абоненты не найдены
                </div>
            )}
            {isSidebarOpen && <AbonentSidebar userID={userId!}
            onClose={() => {
                setIsSidebarOpen(!isSidebarOpen)
                setUserId(null)
            }} />}
        </> 
    )
}