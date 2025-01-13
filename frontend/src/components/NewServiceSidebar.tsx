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
// @ts-ignore
import { useGetServiceInfoQuery } from "../app/services/services.ts";
import { Button } from "./UI/Button.tsx";
import { Input } from "./UI/Input.tsx";
import { Textarea } from "./UI/Textarea.tsx";
import { useCreateServiceMutation } from "../app/services/services.ts";
import { SelectorMock } from "./UI/SelectorMock.tsx";

const typesServices = [
  {
    format: true,
    formatName: "Разовая",
  },
  {
    format: false,
    formatName: "Регулярная",
  },
];
const typesResources = [
  {
    resource: "GIGABYTES",
    resourceName: "Гигабайты",
  },
  {
    resource: "MINUTES",
    resourceName: "Минуты",
  },
  {
    resource: "SMS",
    resourceName: "СМС",
  },
];
type typeResources = {
  resource: string;
  resourceName: string;
};
type typesServices = {
  format: boolean;
  formatName: string;
};

export const NewServiceSidebar = ({ onClose }: { onClose: () => void }) => {
  // Состояние для хранения значений полей
  const [oneTimeService, setOneTimeService] = useState<
    typesServices | undefined
  >();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState<typeResources | undefined>();
  const [countResources, setCountResources] = useState<string | number>("");
  const [cost, setCost] = useState<string | number>("");

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

    // Если значение пустое, устанавливаем пустую строку
    if (formattedValue === "") {
      setCost(""); // Устанавливаем пустую строку вместо 0
      return;
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

    setCost(formattedValue);
  };
  const handleCountResourcesChange = (newCount: string) => {
    // Разрешаем только цифры
    let formattedValue = newCount.replace(/[^0-9]/g, "");

    // Если значение пустое, устанавливаем пустую строку
    if (formattedValue === "") {
      setCountResources(""); // Оставляем поле пустым
      return;
    }

    // Преобразуем в число для проверки диапазона
    const numericValue = parseInt(formattedValue, 10);

    // Ограничиваем диапазоном от 1 до 999
    if (numericValue < 1) {
      formattedValue = "1";
    } else if (numericValue > 999) {
      formattedValue = "999";
    }

    setCountResources(formattedValue);
  };

  const [createService] = useCreateServiceMutation();
  // Обработчик для сохранения данных
  const handleSave = async () => {
    try {
      const updatedData: any = {
        oneTimeService: oneTimeService!.format,
        status: "ACTIVE",
        type: type!.resource,
        name,
        description,
        cost: Number(cost),
        countResources: Number(countResources),
      };

      await createService(updatedData).unwrap(); // Асинхронно вызываем updateService
      console.log(`Услуга "${name}" успешно создана`);

      onClose(); // Закрыть sidebar после успешного сохранения
    } catch (error) {
      console.error(`Ошибка при создании услуги "${name}":`, error);
      alert(`Ошибка при создании услуги "${name}". Попробуйте еще раз.`);
    }
  };

  return (
    // @ts-ignore
    <div className="absolute shadow-[-5px_0_10px_0_rgba(0,0,0,0.10)] z-10 right-[0] top-[80px] w-[680px] h-[calc(100vh-80px)] bg-s-white">
      <div className="flex flex-col h-[calc(100vh-80px)] p-[30px]">
        <div className="border-b-[1px] border-s-light-grey flex justify-between pb-[20px]">
          <p className={`text-[26px] text-s-black font-light`}>Новая услуга</p>
          <button title="close" onClick={onClose}>
            <Close />
          </button>
        </div>
        <div className="flex-grow overflow-y-auto">
          <div className="flex gap-[26px] mt-5">
            <Button
              type="red"
              onClick={handleSave}
              iconLeft={<Save />}
              text="Сохранить"
              disabled={
                !name ||
                !description ||
                !cost ||
                (String(cost).includes(".") && !String(cost).split(".")[1]) ||
                !oneTimeService ||
                !type ||
                !countResources
              }
            />
            <Button
              type="grey"
              onClick={onClose}
              iconLeft={<Cancel />}
              text="Отменить"
            />
          </div>
          <div className="mt-5">
            <div className="mb-3">
              <span className="text-[18px] mb-1">Тип:</span>
              <SelectorMock
                selectList={typesServices}
                labelKey="formatName"
                value={oneTimeService}
                setTakeValue={setOneTimeService}
                placeholder="Выберите тип"
              />
            </div>
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
            <div className="mb-3 flex gap-5">
              <div className="w-1/2">
                <span className="text-[18px] mb-1">Ресурс:</span>
                <SelectorMock
                  selectList={typesResources}
                  labelKey="resourceName"
                  value={type}
                  setTakeValue={setType}
                  placeholder="Выберите ресурс"
                />
              </div>
              <div className="w-1/2">
                <span className="text-[18px] mb-1">Количество:</span>
                <Input
                  placeholder="Введите количество"
                  value={String(countResources)}
                  setTakeValue={handleCountResourcesChange}
                />
              </div>
            </div>
            <div>
              <span className="text-[18px] mb-1">Цена услуги:</span>
              <Input
                placeholder="Введите цену услуги"
                value={String(cost)}
                setTakeValue={handleCostChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
