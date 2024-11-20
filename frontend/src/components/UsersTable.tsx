import { useState } from "react"
import { TableTag } from "./UI/TableTag"
import { AbonentSidebar } from "./AbonentSidebar"
import { UserDetails } from "../mock/mock"

export const UsersTable = ({ users }: {users: UserDetails[]}) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const [userId, setUserId] = useState<number | null>(null)

    return (
        <>
            <table className="w-full text-s-black">
                <thead className="bg-s-light-grey">
                    <tr>
                        <th className="font-medium py-2.5 pl-5 text-left">
                            Телефон
                        </th>
                        <th className="font-medium py-2.5 pl-5 text-left">
                            Фамилия
                        </th>
                        <th className="font-medium py-2.5 pl-5 text-left">
                            Имя
                        </th>
                        <th className="font-medium py-2.5 pl-5 text-left">
                            Отчество
                        </th>
                        <th className="font-medium py-2.5 pl-5 text-left">
                            Тариф
                        </th>
                        <th className="font-medium py-2.5 pl-5 text-left">
                            Услуги
                        </th>
                    </tr>
                </thead>
                {users.length > 0 && (
                    <tbody>
                        {users.map((user) => (
                            <tr className={`border-b border-b-s-light-grey
                            hover:bg-s-light-grey cursor-pointer
                            ${userId === user.id && 'bg-s-light-grey'}`} 
                            key={user.id}
                            onClick={() => {
                                setUserId(user.id)
                                setIsSidebarOpen(true)
                            }}>
                                <td className="font-extralight py-[15px] pl-5">
                                    {user.phoneNumber}
                                </td>
                                <td className="font-extralight py-[15px] pl-5">
                                    {user.lastName}
                                </td>
                                <td className="font-extralight py-[15px] pl-5">
                                    {user.firstName}
                                </td>
                                <td className="font-extralight py-[15px] pl-5">
                                    {user.middleName}
                                </td>
                                <td className="py-[15px] pl-5 flex">
                                    <TableTag type={user.tariff.type} text={user.tariff.details.name_tariff} />
                                </td>
                                <td className="py-[15px] pl-5">
                                    {user.services.length > 0 && (
                                        <ul className="flex gap-2.5">
                                            {user.services.slice(0, 3).map((service, index) => (
                                                <li key={index}>
                                                    <TableTag text={service.details.name_tariff} type={service.type} />
                                                </li>
                                            ))}
                                            {user.services.length > 3 && (
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
            {users.length === 0 && (
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