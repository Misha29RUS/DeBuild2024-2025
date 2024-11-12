import { TableTag } from "./UI/TableTag"

interface IUser {
    tel: string;
    surname: string;
    name: string;
    patronymic: string;
    tariff: {
        type: string;
        text: string;
    };
    services: ({
        type: string;
        text: number;
    } | {
        type: string;
        text?: undefined;
    })[];
}

export const UsersTable = ({ users }: {users: IUser[]}) => {
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
                        {users.map((user, index: number) => (
                            <tr className="border-b border-b-s-light-grey" 
                            key={index}>
                                <td className="font-extralight py-[15px] pl-5">
                                    {user.tel}
                                </td>
                                <td className="font-extralight py-[15px] pl-5">
                                    {user.surname}
                                </td>
                                <td className="font-extralight py-[15px] pl-5">
                                    {user.name}
                                </td>
                                <td className="font-extralight py-[15px] pl-5">
                                    {user.patronymic}
                                </td>
                                <td className="py-[15px] pl-5 flex">
                                    <TableTag type={user.tariff.type} text={user.tariff.text} />
                                </td>
                                <td className="py-[15px] pl-5">
                                    {user.services.length > 0 && (
                                        <ul className="flex gap-2.5">
                                            {user.services.map((service, index) => (
                                                <li key={index}>
                                                    <TableTag text={service.text} type={service.type} />
                                                </li>
                                            ))}
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
        </> 
    )
}