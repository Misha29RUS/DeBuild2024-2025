// @ts-ignore
import { useEffect, useState } from "react";
// @ts-ignore
import Close from "../img/abonent_sidebar_svg/close.svg?react";
// @ts-ignore
import Edit from "../img/abonent_sidebar_svg/mode_edit.svg?react";
// @ts-ignore
import Save from "../img/abonent_sidebar_svg/check.svg?react";
// @ts-ignore
import Cancel from "../img/abonent_sidebar_svg/cancel.svg?react";
// @ts-ignore
import Delete from  "../img/abonent_sidebar_svg/delete.svg?react";
// @ts-ignore
import Archive from "../img/tag_table_svg/folder_open.svg?react"
import {useDeleteTariffMutation, useGetTariffInfoQuery, useUpdateTariffMutation} from "../app/services/tariffs.ts";
import {TariffBar} from "./UI/TariffBar.tsx";
import {Input} from "./UI/Input.tsx";
import {Textarea} from "./UI/Textarea.tsx";
import {Button} from "./UI/Button.tsx";

export const TariffsSidebar = ({
                                    onClose,
                                    tariffID,
                                    isAdmin
                                }: {
    onClose: () => void;
    tariffID: number;
    isAdmin: boolean;
}) => {
    const {data: tariffInfo} = useGetTariffInfoQuery(tariffID)
    const [isEdit, setIsEdit] = useState<boolean>(false);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [countGigabytes, setCountGigabytes] = useState<string | number>("");
    const [costGigabyte, setCostGigabyte] = useState<string | number>("")
    const [countMinutes, setCountMinutes] = useState<string | number>("");
    const [costMinute, setCostMinute] = useState<string | number>("")
    const [countSms, setCountSms] = useState<string | number>("");
    const [costSms, setCostSms] = useState<string | number>("")
    const [cost, setCost] = useState<string | number>("")
    useEffect(() => {
        if (tariffInfo) {
            setName(tariffInfo.name || "");
            setDescription(tariffInfo.description || "");
            setCountGigabytes(tariffInfo.tariffResourceDto.countGigabytes === null ? 0 : tariffInfo.tariffResourceDto.countGigabytes);
            setCostGigabyte(tariffInfo.tariffResourceDto.costOneGigabyte || 0);
            setCountMinutes(tariffInfo.tariffResourceDto.countMinutes === null ? 0 : tariffInfo.tariffResourceDto.countMinutes);
            setCostMinute(tariffInfo.tariffResourceDto.costOneMinute || 0);
            setCountSms(tariffInfo.tariffResourceDto.countSms === null ? 0 : tariffInfo.tariffResourceDto.countSms);
            setCostSms(tariffInfo.tariffResourceDto.costOneSms || 0);
            setCost(tariffInfo.cost || 0);
        }
    }, [tariffInfo, isEdit]);

    // Обработчики для изменения значений в полях
    const handleNameChange = (newName: string) => {
        setName(newName.slice(0, 20)); // Ограничиваем 20 символами
    };
    const handleDescriptionChange = (newDescription: string) => {
        setDescription(newDescription.slice(0, 100)); // Ограничиваем 100 символами
    };
    const handleCostChange = (
        newCost: string,
        // @ts-ignore
        setCost: React.Dispatch<React.SetStateAction<string | number>>
    ) => {
        // Разрешаем только цифры и одну точку
        let formattedValue = newCost.replace(/[^0-9.]/g, '');

        // Разрешаем только одну точку
        if (formattedValue.indexOf('.') !== formattedValue.lastIndexOf('.')) {
            formattedValue = formattedValue.substring(0, formattedValue.lastIndexOf('.'));
        }

        // Если значение пустое, устанавливаем пустую строку
        if (formattedValue === '') {
            setCost(''); // Устанавливаем пустую строку вместо 0
            return;
        }

        // Ограничиваем двумя знаками после точки
        if (formattedValue.includes('.')) {
            const [integer, decimal] = formattedValue.split('.');
            formattedValue = `${integer}.${decimal.substring(0, 2)}`;
        }

        // Ограничиваем значением не более 9999
        if (parseFloat(formattedValue) > 9999) {
            formattedValue = '9999';
        }

        setCost(formattedValue);
    };
    const handleCountResourcesChange = (
        newCount: string,
        // @ts-ignore
        setCountResources: React.Dispatch<React.SetStateAction<string | number>>
    ) => {
        // Разрешаем только цифры
        let formattedValue = newCount.replace(/[^0-9]/g, '');

        // Если значение пустое, устанавливаем пустую строку
        if (formattedValue === '') {
            setCountResources(''); // Оставляем поле пустым
            return;
        }

        // Преобразуем в число для проверки диапазона
        const numericValue = parseInt(formattedValue, 10);

        // Ограничиваем диапазоном от 1 до 999
        if (numericValue < 1) {
            formattedValue = '1';
        } else if (numericValue > 999) {
            formattedValue = '999';
        }

        setCountResources(formattedValue);
    };

    const isButtonDisabled = (isCustomizable: boolean): boolean => {
        if (isCustomizable) {
            // Логика для кастомизируемого тарифа
            const hasEmptyFields =
                !name ||
                !description ||
                !costGigabyte ||
                !costMinute ||
                !costSms ||
                (String(costGigabyte).includes('.') && !String(costGigabyte).split('.')[1]) ||
                (String(costMinute).includes('.') && !String(costMinute).split('.')[1]) ||
                (String(costSms).includes('.') && !String(costSms).split('.')[1]);

            const nonChangesUnion =
                name === tariffInfo?.name &&
                description === tariffInfo?.description &&
                costGigabyte == tariffInfo?.tariffResourceDto?.costOneGigabyte &&
                costMinute == tariffInfo?.tariffResourceDto?.costOneMinute &&
                costSms == tariffInfo?.tariffResourceDto?.costOneSms;

            return hasEmptyFields || nonChangesUnion;
        } else {
            // Логика для некастомизируемого тарифа
            const hasEmptyFields =
                !name ||
                !description ||
                !costGigabyte ||
                !costMinute ||
                !costSms ||
                (String(costGigabyte).includes('.') && !String(costGigabyte).split('.')[1]) ||
                (String(costMinute).includes('.') && !String(costMinute).split('.')[1]) ||
                (String(costSms).includes('.') && !String(costSms).split('.')[1]);

            const hasEmptyCost =
                !cost || !countGigabytes || !countMinutes || !countSms;

            const nonChangesUnion =
                name === tariffInfo?.name &&
                description === tariffInfo?.description &&
                costGigabyte == tariffInfo?.tariffResourceDto?.costOneGigabyte &&
                costMinute == tariffInfo?.tariffResourceDto?.costOneMinute &&
                costSms == tariffInfo?.tariffResourceDto?.costOneSms;

            const nonChangeFixed =
                countGigabytes == tariffInfo?.tariffResourceDto?.countGigabytes &&
                countMinutes == tariffInfo?.tariffResourceDto?.countMinutes &&
                countSms == tariffInfo?.tariffResourceDto?.countSms &&
                cost == tariffInfo?.cost;

            return hasEmptyFields || hasEmptyCost || (nonChangesUnion && nonChangeFixed);
        }
    };

    const [updateTariff] = useUpdateTariffMutation();
    // Обработчик для сохранения данных
    const handleSave = async () => {
        try {
            const updatedData = {
                id: tariffID,
                type: tariffInfo?.type,
                status: tariffInfo?.status,
                name,
                description,
                cost: Number(cost),
                tariffResourceDto: {
                    id: tariffID,
                    countMinutes,
                    costOneMinute: costMinute,
                    stepsMinutes: tariffInfo?.tariffResourceDto.stepsMinutes,
                    countSms,
                    costOneSms: costMinute,
                    stepsSms: tariffInfo?.tariffResourceDto.stepsSms,
                    countGigabytes,
                    costOneGigabyte: costMinute,
                    stepsGigabytes: tariffInfo?.tariffResourceDto.stepsGigabytes,
                },
            };

            await updateTariff(updatedData).unwrap(); // Асинхронно вызываем updateService
            console.log(`Тариф "${name}" успешно обновлен`);

            onClose(); // Закрыть sidebar после успешного сохранения
        } catch (error) {
            console.error(`Ошибка при обновлении тарифа "${name}":`, error);
            alert(`Ошибка при обновлении тарифа "${name}". Попробуйте еще раз.`);
        }
    };

    // Обработчик для сохранения данных
    const handleArchivate = async () => {
        try {
            const updatedData = {
                id: tariffID,
                type: tariffInfo?.type,
                status: "HIDDEN",
                name: tariffInfo?.name,
                description: tariffInfo?.description,
                cost: tariffInfo?.cost,
                tariffResourceDto: {
                    id: tariffID,
                    countMinutes: tariffInfo?.tariffResourceDto.countMinutes,
                    costOneMinute: tariffInfo?.tariffResourceDto.costOneMinute,
                    stepsMinutes: tariffInfo?.tariffResourceDto.stepsMinutes,
                    countSms: tariffInfo?.tariffResourceDto.countSms,
                    costOneSms: tariffInfo?.tariffResourceDto.costOneSms,
                    stepsSms: tariffInfo?.tariffResourceDto.stepsSms,
                    countGigabytes: tariffInfo?.tariffResourceDto.countGigabytes,
                    costOneGigabyte: tariffInfo?.tariffResourceDto.costOneGigabyte,
                    stepsGigabytes: tariffInfo?.tariffResourceDto.stepsGigabytes,
                },
            };

            await updateTariff(updatedData).unwrap(); // Асинхронно вызываем updateService
            console.log(`Тариф "${name}" успешно архивирован`);

            onClose(); // Закрыть sidebar после успешного сохранения
        } catch (error) {
            console.error(`Ошибка при архивировании тарифа "${name}":`, error);
            alert(`Ошибка при архивировании тарифа "${name}". Попробуйте еще раз.`);
        }
    };

    const [deleteTariff] = useDeleteTariffMutation();
    // Обработчик для удаления данных
    const handleDelete = async () => {
        try {
            const deletedData = {
                id: tariffID,
            };

            await deleteTariff(deletedData).unwrap();
            console.log(`Тариф "${name}" успешно удален`);

            onClose(); // Закрыть sidebar после успешного удаления
        } catch (error) {
            console.error(`Ошибка при удалении тарифа "${name}":`, error);
            alert(`Ошибка при удалении тарифа "${name}". Попробуйте еще раз.`);
        }
    };

    return (
        // @ts-ignore
        <div className="absolute shadow-[-5px_0_10px_0_rgba(0,0,0,0.10)] z-10 right-[0] top-[80px] w-[680px] h-[calc(100vh-80px)] bg-s-white">
            <div className="flex flex-col h-[calc(100vh-80px)] p-[30px]">
                <div className="border-b-[1px] border-s-light-grey flex justify-between pb-[20px]">
                    <p className={`text-[26px] text-s-black font-light`}>
                        {isEdit ? "Редактирование тарифа" : tariffInfo?.name}
                    </p>
                    <button title="close" onClick={onClose}>
                        <Close />
                    </button>
                </div>
                <div className="flex-grow overflow-y-auto overflow-x-hidden">
                    {isAdmin && (
                        <div className="flex gap-[26px] mt-5">
                            {isEdit ? (
                                <>
                                    <Button type='red'  iconLeft={<Save />} text="Сохранить"
                                    onClick={handleSave}
                                    disabled={isButtonDisabled(tariffInfo?.type === "CUSTOMIZABLE")}/>

                                    <Button type='grey' onClick={() => setIsEdit(false)}
                                            iconLeft={<Cancel />} text="Отменить"
                                    />
                                </>
                            ) : (
                                <>
                                    <Button onClick={handleDelete}
                                        type='red' iconLeft={<Delete />} text="Удалить"/>
                                    {tariffInfo?.status === "ACTIVE" && (
                                        <Button onClick={handleArchivate}
                                            type='red' iconLeft={<Archive />} text="Архивировать"/>
                                    )}
                                    <Button type='grey' onClick={() => setIsEdit(true)}
                                            iconLeft={<Edit />} text="Изменить"
                                    />
                                </>
                            )}
                        </div>
                    )}
                    {isEdit ? (
                        <div className="mt-5">
                            <div className="mb-3">
                                <span className="text-[18px] mb-1">
                                    Название:
                                </span>
                                <Input placeholder="Введите название" value={name}
                                       setTakeValue={handleNameChange}/>
                            </div>
                            <div className="mb-3">
                                <span className="text-[18px] mb-1">
                                    Описание:
                                </span>
                                <Textarea placeholder="Введите описание" value={description}
                                          setTakeValue={handleDescriptionChange}/>
                            </div>
                            {tariffInfo?.type === "FIXED" ? (
                                <>
                                    <div className="mb-3 flex gap-5">
                                        <div className="w-1/2">
                                            <span className="text-[18px] mb-1">
                                                Гигабайты:
                                            </span>
                                            <Input
                                                placeholder="Введите количество"
                                                value={String(countGigabytes)}
                                                setTakeValue={(newValue) => handleCountResourcesChange(newValue, setCountGigabytes)}
                                            />
                                        </div>
                                        <div className="w-1/2">
                                            <span className="text-[18px] mb-1">
                                                Цена за гигабайт:
                                            </span>
                                            <Input
                                                placeholder="Введите цену"
                                                value={String(costGigabyte)}
                                                setTakeValue={(newValue) => handleCostChange(newValue, setCostGigabyte)}
                                            />
                                        </div>
                                    </div>
                                    <div className="mb-3 flex gap-5">
                                        <div className="w-1/2">
                                            <span className="text-[18px] mb-1">
                                                Минуты:
                                            </span>
                                            <Input
                                                placeholder="Введите количество"
                                                value={String(countMinutes)}
                                                setTakeValue={(newValue) => handleCountResourcesChange(newValue, setCountMinutes)}
                                            />
                                        </div>
                                        <div className="w-1/2">
                                            <span className="text-[18px] mb-1">
                                                Цена за минуту:
                                            </span>
                                            <Input
                                                placeholder="Введите цену"
                                                value={String(costMinute)}
                                                setTakeValue={(newValue) => handleCostChange(newValue, setCostMinute)}
                                            />
                                        </div>
                                    </div>
                                    <div className="mb-3 flex gap-5">
                                        <div className="w-1/2">
                                            <span className="text-[18px] mb-1">
                                                СМС:
                                            </span>
                                            <Input
                                                placeholder="Введите количество"
                                                value={String(countSms)}
                                                setTakeValue={(newValue) => handleCountResourcesChange(newValue, setCountSms)}
                                            />
                                        </div>
                                        <div className="w-1/2">
                                            <span className="text-[18px] mb-1">
                                                Цена за СМС:
                                            </span>
                                            <Input
                                                placeholder="Введите цену"
                                                value={String(costSms)}
                                                setTakeValue={(newValue) => handleCostChange(newValue, setCostSms)}
                                            />
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <span className="text-[18px] mb-1">
                                            Цена тарифа:
                                        </span>
                                        <Input
                                            placeholder="Введите цену тарифа"
                                            value={String(cost)}
                                            setTakeValue={(newValue) => handleCostChange(newValue, setCost)}
                                        />
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="mb-3">
                                            <span className="text-[18px] mb-1">
                                                Цена за гигабайт:
                                            </span>
                                        <Input
                                            placeholder="Введите цену"
                                            value={String(costGigabyte)}
                                            setTakeValue={(newValue) => handleCostChange(newValue, setCostGigabyte)}
                                        />
                                    </div>
                                    <div className="mb-3">
                                            <span className="text-[18px] mb-1">
                                                Цена за минуту:
                                            </span>
                                        <Input
                                            placeholder="Введите цену"
                                            value={String(costMinute)}
                                            setTakeValue={(newValue) => handleCostChange(newValue, setCostMinute)}
                                        />
                                    </div>
                                    <div className="mb-3">
                                            <span className="text-[18px] mb-1">
                                                Цена за СМС:
                                            </span>
                                        <Input
                                            placeholder="Введите цену"
                                            value={String(costSms)}
                                            setTakeValue={(newValue) => handleCostChange(newValue, setCostSms)}
                                        />
                                    </div>
                                </>
                            )}
                        </div>
                    ) : (
                        <>
                            <div className="mt-5 pb-5 border-b-[1px] border-s-light-grey">
                                <ul className="font-normal text-[18px] user-info-ul text-s-black">
                                    <li>
                                        <p className="font-normal">Статус:</p>
                                        <p className="ml-[6px] font-extralight">
                                            {tariffInfo?.status === 'ACTIVE' ? 'Активный' : 'Архивный'}
                                        </p>
                                    </li>
                                    <li>
                                        <p className="font-normal">Тип:</p>
                                        <p className="ml-[6px] font-extralight">
                                            {tariffInfo?.type === 'FIXED' ? 'Фиксированный' : 'Настраиваемый'}
                                        </p>
                                    </li>
                                    <li>
                                        <p className="text-s-black font-normal">Описание:</p>
                                        <p className="ml-[6px] font-extralight">
                                            {tariffInfo?.description}
                                        </p>
                                    </li>
                                    {tariffInfo?.type === 'CUSTOMIZABLE' && (
                                        <>
                                            <li>
                                                <p className="font-normal">Цена за гигабайт:</p>
                                                <p className="ml-[6px] font-extralight">
                                                    {tariffInfo?.tariffResourceDto.costOneGigabyte}
                                                </p>
                                            </li>
                                            <li>
                                                <p className="font-normal">Цена за минуту:</p>
                                                <p className="ml-[6px] font-extralight">
                                                    {tariffInfo?.tariffResourceDto.costOneMinute}
                                                </p>
                                            </li>
                                            <li>
                                                <p className="text-s-black font-normal">Цена за СМС:</p>
                                                <p className="ml-[6px] font-extralight">
                                                    {tariffInfo?.tariffResourceDto.costOneSms}
                                                </p>
                                            </li>
                                        </>
                                    )}
                                </ul>
                            </div>
                            {tariffInfo?.type === 'FIXED' ? (
                                <div className="grid grid-cols-3 mt-5 gap-2">
                                    <div className="col-start-2 text-[18px]">
                                        Количество:
                                    </div>
                                    <div className="text-[18px]">
                                        Цена единицы:
                                    </div>
                                    <div className="text-[18px]">
                                        Гигабайты:
                                    </div>
                                    <div className="font-extralight text-[18px]">
                                        {tariffInfo?.tariffResourceDto.countGigabytes}
                                    </div>
                                    <div className="font-extralight text-[18px]">
                                        {tariffInfo?.tariffResourceDto.costOneGigabyte}
                                    </div>
                                    <div className="text-[18px]">
                                        Минуты:
                                    </div>
                                    <div className="font-extralight text-[18px]">
                                        {tariffInfo?.tariffResourceDto.countMinutes}
                                    </div>
                                    <div className="font-extralight text-[18px]">
                                        {tariffInfo?.tariffResourceDto.costOneMinute}
                                    </div>
                                    <div className="text-[18px]">
                                        СМС:
                                    </div>
                                    <div className="font-extralight text-[18px]">
                                        {tariffInfo?.tariffResourceDto.countSms}
                                    </div>
                                    <div className="font-extralight text-[18px]">
                                        {tariffInfo?.tariffResourceDto.costOneSms}
                                    </div>
                                </div>
                            ) : (
                                <div className="mt-5">
                                    <div className="mb-2">
                                        <div className="text-[18px] mb-5">
                                            Гигабайты:
                                        </div>
                                        <div className="px-4">
                                            <TariffBar
                                                values={tariffInfo?.tariffResourceDto?.stepsGigabytes}
                                                min={tariffInfo?.tariffResourceDto?.stepsGigabytes[0]}
                                                max={tariffInfo?.tariffResourceDto?.stepsGigabytes[tariffInfo?.tariffResourceDto?.stepsGigabytes?.length - 1]}
                                            />
                                        </div>
                                    </div>
                                    <div className="mb-2">
                                        <div className="text-[18px] mb-5">
                                            Минуты:
                                        </div>
                                        <div className="px-4">
                                            <TariffBar
                                                values={tariffInfo?.tariffResourceDto?.stepsMinutes}
                                                min={tariffInfo?.tariffResourceDto?.stepsMinutes[0]}
                                                max={tariffInfo?.tariffResourceDto?.stepsMinutes[tariffInfo?.tariffResourceDto?.stepsMinutes?.length - 1]}
                                            />
                                        </div>
                                    </div>
                                    <div className="mb-2">
                                        <div className="text-[18px] mb-5">
                                            СМС:
                                        </div>
                                        <div className="px-4">
                                            <TariffBar
                                                values={tariffInfo?.tariffResourceDto?.stepsSms}
                                                min={tariffInfo?.tariffResourceDto?.stepsSms[0]}
                                                max={tariffInfo?.tariffResourceDto?.stepsSms[tariffInfo?.tariffResourceDto?.stepsSms?.length - 1]}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
                {tariffInfo?.type === 'FIXED' && (
                    <div className="pt-5 border-t-[1px] border-s-light-grey">
                        <p className="text-[26px] font-light">Цена тарифа: {tariffInfo?.cost} ₽</p>
                    </div>
                )}
            </div>
        </div>
    );
};