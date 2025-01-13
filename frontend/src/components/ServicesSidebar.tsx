// @ts-ignore
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
import Delete from "../img/abonent_sidebar_svg/delete.svg?react";
import {
  useDeleteServiceMutation,
  useGetServiceInfoQuery,
  useUpdateServiceMutation,
} from "../app/services/services.ts";
import { Button } from "./UI/Button.tsx";
import { Input } from "./UI/Input.tsx";
import { Textarea } from "./UI/Textarea.tsx";
import axios from "axios";

export const ServicesSidebar = ({
  onClose,
  serviceID,
}: {
  onClose: () => void;
  serviceID: number;
}) => {
  const { data: serviceInfo } = useGetServiceInfoQuery(serviceID);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  // Состояние для хранения значений полей
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [cost, setCost] = useState(0);
  useEffect(() => {
    if (serviceInfo) {
      setName(serviceInfo.name || "");
      setDescription(serviceInfo.description || "");
      setCost(serviceInfo.cost || 0);
    }
  }, [serviceInfo, isEdit]);

  // Обработчики для изменения значений в полях
  const handleNameChange = (newName: string) => {
    setName(newName.slice(0, 20)); // Ограничиваем 20 символами
  };
  const handleDescriptionChange = (newDescription: string) => {
    setDescription(newDescription.slice(0, 100)); // Ограничиваем 100 символами
  };
  const handleCostChange = (newCost: string) => {
    // Разрешаем только цифры и одну точку
    let formattedValue = newCost.replace(/[^0-9.]/g, "");

    // Разрешаем только одну точку
    if (formattedValue.indexOf(".") !== formattedValue.lastIndexOf(".")) {
      formattedValue = formattedValue.substring(
        0,
        formattedValue.lastIndexOf("."),
      );
    }

    // Если точка есть в строке и после неё нет чисел, оставляем точку
    if (formattedValue.includes(".") && !formattedValue.split(".")[1]) {
      return setCost(formattedValue); // возвращаем строку с точкой
    }

    // Ограничиваем двумя знаками после точки
    if (formattedValue.includes(".")) {
      const [integer, decimal] = formattedValue.split(".");
      formattedValue = `${integer}.${decimal.substring(0, 2)}`;
    }

    // Ограничиваем значением не более 9999
    if (parseFloat(formattedValue) > 9999) {
      formattedValue = "9999";
    }

    // Устанавливаем новое значение стоимости
    setCost(formattedValue ? parseFloat(formattedValue) : 0);
  };

  const [updateService] = useUpdateServiceMutation();
  // Обработчик для сохранения данных
  const handleSave = async () => {
    try {
      const updatedData = {
        id: serviceID,
        oneTimeService: serviceInfo?.oneTimeService,
        status: "ACTIVE",
        type: serviceInfo?.type,
        name,
        description,
        cost: Number(cost),
        countResources: serviceInfo?.countResources,
      };

      await updateService(updatedData).unwrap(); // Асинхронно вызываем updateService
      console.log(`Услуга "${name}" успешно обновлена`);

      onClose(); // Закрыть sidebar после успешного сохранения
    } catch (error) {
      console.error(`Ошибка при обновлении услуги "${name}":`, error);
      alert(`Ошибка при обновлении услуги "${name}". Попробуйте еще раз.`);
    }
  };

  const [deleteService] = useDeleteServiceMutation();
  // Обработчик для удаления данных
  const handleDelete = async () => {
    try {
      const deletedData = {
        id: serviceID,
      };

      await deleteService(deletedData).unwrap();
      console.log(`Услуга "${name}" успешно удалена`);

      onClose(); // Закрыть sidebar после успешного удаления
    } catch (error) {
      console.error(`Ошибка при удалении услуги "${name}":`, error);
      alert(`Ошибка при удалении услуги "${name}". Попробуйте еще раз.`);
    }
  };

    const [isAdmin, setIsAdmin] = useState<boolean | null>(false)
    useEffect(() => {
        const fetchEmployeeData = async () => {
            const accessToken = document.cookie
                .split("; ")
                .find((row) => row.startsWith("accessToken="))
                ?.split("=")[1];

            if (!accessToken) {
                console.error("Access token not found");
                return;
            }

            try {
                const resp = await axios.post(
                    `/api/profile/employee`,
                    {},
                    {
                        withCredentials: true,
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${accessToken}`,
                        },
                    }
                );

                if (resp.data.role === "ROLE_ADMIN") {
                    setIsAdmin(true)
                }
            }finally {

            }
        };

        fetchEmployeeData();
    }, []);

  return (        // @ts-ignore
    <div className="absolute shadow-[-5px_0_10px_0_rgba(0,0,0,0.10)] z-10 right-[0] top-[80px] w-[680px] h-[calc(100vh-80px)] bg-s-white">
      <div className="flex flex-col h-[calc(100vh-80px)] p-[30px]">
        <div className="border-b-[1px] border-s-light-grey flex justify-between pb-[20px]">
          <p className={`text-[26px] text-s-black font-light`}>
            {isEdit ? "Редактирование услуги" : serviceInfo?.name}
          </p>
          <button title="close" onClick={onClose}>
            <Close />
          </button>
        </div>
        <div className="flex-grow overflow-y-auto">
          {isAdmin && (
            <div className="flex gap-[26px] mt-5">
              {isEdit ? (
                <>
                  <Button
                    type="red"
                    onClick={handleSave}
                    iconLeft={<Save />}
                    text="Сохранить"
                    disabled={
                      !name ||
                      !description ||
                      !cost ||
                      (String(cost).includes(".") &&
                        !String(cost).split(".")[1]) ||
                      (name === serviceInfo?.name &&
                        description === serviceInfo?.description &&
                        cost === serviceInfo?.cost)
                    }
                  />
                  <Button
                    type="grey"
                    onClick={() => setIsEdit(false)}
                    iconLeft={<Cancel />}
                    text="Отменить"
                  />
                </>
              ) : (
                <>
                  <Button
                    onClick={handleDelete}
                    type="red"
                    iconLeft={<Delete />}
                    text="Удалить"
                  />
                  <Button
                    type="grey"
                    onClick={() => setIsEdit(true)}
                    iconLeft={<Edit />}
                    text="Изменить"
                  />
                </>
              )}
            </div>
          )}
          <div className="mt-5">
            {isEdit ? (
              <>
                <div className="mb-3">
                  <span className="text-[18px] mb-1">Название:</span>
                  <Input
                    placeholder="Введите название"
                    value={name}
                    setTakeValue={handleNameChange}
                  />
                </div>
                <div className="mb-3">
                  <span className="text-[18px] mb-1">Описание:</span>
                  <Textarea
                    placeholder="Введите описание"
                    value={description}
                    setTakeValue={handleDescriptionChange}
                  />
                </div>
                <div>
                  <span className="text-[18px] mb-1">Цена услуги:</span>
                  <Input
                    value={String(cost)}
                    setTakeValue={handleCostChange}
                    placeholder="Введите цену услуги"
                  />
                </div>
              </>
            ) : (
              <ul className="font-normal text-[18px] user-info-ul text-s-black">
                <li>
                  <p className="font-normal w-[35%]">Тип:</p>
                  <p className="font-light w-[65%]">
                    {serviceInfo?.oneTimeService ? "Разовая" : "Регулярная"}
                  </p>
                </li>
                <li>
                  <p className="font-normal w-[35%]">Описание:</p>
                  <p className="font-light w-[65%]">
                    {serviceInfo?.description}
                  </p>
                </li>
                <li>
                  <p className="text-s-black font-normal w-[35%]">Ресурс:</p>
                  <p className="font-light w-[65%]">
                    {serviceInfo?.type === "GIGABYTES"
                      ? "Гигабайты"
                      : serviceInfo?.type === "MINUTES"
                        ? "Минуты"
                        : "СМС"}
                  </p>
                </li>
                <li>
                  <p className="text-s-black w-[35%] font-normal">
                    Количество:
                  </p>
                  <p className="font-light w-[65%]">
                    {serviceInfo?.countResources}
                  </p>
                </li>
              </ul>
            )}
          </div>
        </div>
        {!isEdit && (
          <div className="pt-5 border-t-[1px] border-s-light-grey">
            <p className="text-[26px] font-light">
              Цена услуги: {serviceInfo?.cost} ₽
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
