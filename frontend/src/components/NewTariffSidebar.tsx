import { useEffect, useState } from "react";

import Close from "../img/abonent_sidebar_svg/close.svg?react";
import Edit from "../img/abonent_sidebar_svg/mode_edit.svg?react";
import Save from "../img/abonent_sidebar_svg/check.svg?react";
import Cancel from "../img/abonent_sidebar_svg/cancel.svg?react";
import Delete from "../img/abonent_sidebar_svg/delete.svg?react";
import Archive from "../img/tag_table_svg/folder_open.svg?react";
import { useCreateTariffMutation } from "../app/services/tariffs.ts";
import { TariffBar } from "./UI/TariffBar.tsx";
import { Input } from "./UI/Input.tsx";
import { Textarea } from "./UI/Textarea.tsx";
import { Button } from "./UI/Button.tsx";
import { SelectorMock } from "./UI/SelectorMock.tsx";
import { TariffValuesManager } from "./TariffValuesManager.tsx";

const typesTariffs = [
  {
    type: "FIXED",
    typeName: "Фиксированный",
  },
  {
    type: "CUSTOMIZABLE",
    typeName: "Настраиваемый",
  },
];
type typesTariffs = {
  type: string;
  typeName: string;
};

export const NewTariffSidebar = ({ onClose }: { onClose: () => void }) => {
  const [typeTariff, setTypeTariff] = useState<typesTariffs | undefined>();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [countGigabytes, setCountGigabytes] = useState<string | number>("");
  const [costGigabyte, setCostGigabyte] = useState<string | number>("");
  const [countMinutes, setCountMinutes] = useState<string | number>("");
  const [costMinute, setCostMinute] = useState<string | number>("");
  const [countSms, setCountSms] = useState<string | number>("");
  const [costSms, setCostSms] = useState<string | number>("");
  const [cost, setCost] = useState<string | number>("");

  const [minGigabytes, setMinGigabytes] = useState<number | "min">("min");
  const [maxGigabytes, setMaxGigabytes] = useState<number | "max">("max");
  const [valuesGigabytes, setValuesGigabytes] = useState<
    (number | "min" | "max")[]
  >([]);
  const [defaultValuesGigabytes, setDefaultValuesGigabytes] = useState<
    (number | "min" | "max")[]
  >([minGigabytes, maxGigabytes]);
  useEffect(() => {
    setDefaultValuesGigabytes([minGigabytes, maxGigabytes]);
  }, [minGigabytes, maxGigabytes]);

  const [minMinutes, setMinMinutes] = useState<number | "min">("min");
  const [maxMinutes, setMaxMinutes] = useState<number | "max">("max");
  const [valuesMinutes, setValuesMinutes] = useState<
    (number | "min" | "max")[]
  >([]);
  const [defaultValuesMinutes, setDefaultValuesMinutes] = useState<
    (number | "min" | "max")[]
  >([minMinutes, maxMinutes]);
  useEffect(() => {
    setDefaultValuesMinutes([minMinutes, maxMinutes]);
  }, [minMinutes, maxMinutes]);

  const [minSms, setMinSms] = useState<number | "min">("min");
  const [maxSms, setMaxSms] = useState<number | "max">("max");
  const [valuesSms, setValuesSms] = useState<(number | "min" | "max")[]>([]);
  const [defaultValuesSms, setDefaultValuesSms] = useState<
    (number | "min" | "max")[]
  >([minSms, maxSms]);
  useEffect(() => {
    setDefaultValuesSms([minSms, maxSms]);
  }, [minSms, maxSms]);

  // Обработчики для изменения значений в полях
  const handleNameChange = (newName: string) => {
    setName(newName.slice(0, 20)); // Ограничиваем 20 символами
  };
  const handleDescriptionChange = (newDescription: string) => {
    setDescription(newDescription.slice(0, 100)); // Ограничиваем 100 символами
  };
  const handleCostChange = (
    newCost: string,
    setCost: React.Dispatch<React.SetStateAction<string | number>>,
  ) => {
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
  const handleCountResourcesChange = (
    newCount: string,
    setCountResources: React.Dispatch<React.SetStateAction<string | number>>,
  ) => {
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

  const hasDuplicates = (array: (number | string)[]): boolean => {
    // Исключаем строки 'min' и 'max' перед проверкой
    const filteredArray = array.filter(
      (item) => item !== "min" && item !== "max",
    );

    // Если после фильтрации массив пустой, возвращаем true
    if (filteredArray.length === 0) return true;

    const set = new Set(filteredArray);
    return set.size !== filteredArray.length;
  };

  const hasInvalidValues = (array: (number | string)[]): boolean => {
    // Проверяем на наличие строк 'min', 'max' или пустого массива
    return array.length === 0 || array.includes("min") || array.includes("max");
  };

  const isButtonDisabled = (isCustomizable: boolean): boolean => {
    if (isCustomizable) {
      const hasEmptyFields =
        !name ||
        !description ||
        !costGigabyte ||
        !costMinute ||
        !costSms ||
        (String(costGigabyte).includes(".") &&
          !String(costGigabyte).split(".")[1]) ||
        (String(costMinute).includes(".") &&
          !String(costMinute).split(".")[1]) ||
        (String(costSms).includes(".") && !String(costSms).split(".")[1]);
      const hasDuplicateValues =
        hasDuplicates(valuesGigabytes) ||
        hasDuplicates(valuesMinutes) ||
        hasDuplicates(valuesSms);

      const hasInvalidValuesInAnyArray =
        hasInvalidValues(valuesGigabytes) ||
        hasInvalidValues(valuesMinutes) ||
        hasInvalidValues(valuesSms);

      return hasEmptyFields || hasDuplicateValues || hasInvalidValuesInAnyArray;
    } else {
      // Логика для некастомизируемого тарифа
      const hasEmptyFields =
        !name ||
        !description ||
        !costGigabyte ||
        !costMinute ||
        !costSms ||
        (String(costGigabyte).includes(".") &&
          !String(costGigabyte).split(".")[1]) ||
        (String(costMinute).includes(".") &&
          !String(costMinute).split(".")[1]) ||
        (String(costSms).includes(".") && !String(costSms).split(".")[1]);

      const hasEmptyCost =
        !cost || !countGigabytes || !countMinutes || !countSms;

      return hasEmptyFields || hasEmptyCost;
    }
  };

  const [createService] = useCreateTariffMutation();
  // Обработчик для сохранения данных
  const handleSave = async () => {
    try {
      const updatedData = {
        type: typeTariff!.type,
        status: "ACTIVE",
        name,
        description,
        cost: Number(cost),
        tariffResourceDto: {
          countMinutes: typeTariff!.type === "FIXED" ? Number(countMinutes) : 0,
          costOneMinute: Number(costMinute),
          stepsMinutes:
            valuesMinutes.length > 0 && typeTariff!.type === "CUSTOMIZABLE"
              ? [...valuesMinutes].sort((a, b) => a - b)
              : null,
          countSms: typeTariff!.type === "FIXED" ? Number(countSms) : 0,
          costOneSms: Number(costSms),
          stepsSms:
            valuesSms.length > 0 && typeTariff!.type === "CUSTOMIZABLE"
              ? [...valuesSms].sort((a, b) => a - b)
              : null,
          countGigabytes: typeTariff!.type === "FIXED" ? Number(countGigabytes) : 0,
          costOneGigabyte: Number(costGigabyte),
          stepsGigabytes:
            valuesGigabytes.length > 0 && typeTariff!.type === "CUSTOMIZABLE"
              ? [...valuesGigabytes].sort((a, b) => a - b)
              : null,
        },
      };

      await createService(updatedData).unwrap(); // Асинхронно вызываем updateService
      console.log(`Тариф "${name}" успешно создан`);

      onClose(); // Закрыть sidebar после успешного сохранения
    } catch (error) {
      console.error(`Ошибка при создании тарифа "${name}":`, error);
      alert(`Ошибка при создании тарифа "${name}". Попробуйте еще раз.`);
    }
  };

  useEffect(() => {
    if (
      countGigabytes &&
      costGigabyte &&
      countMinutes &&
      costMinute &&
      countSms &&
      costSms
    ) {
      const totalCost =
        Number(countGigabytes) * Number(costGigabyte) +
        Number(countMinutes) * Number(costMinute) +
        Number(countSms) * Number(costSms);
      const limitedCost = Math.min(totalCost, 9999);
      setCost(limitedCost); // Устанавливаем значение с двумя знаками после запятой
    }
  }, [
    countGigabytes,
    costGigabyte,
    countMinutes,
    costMinute,
    countSms,
    costSms,
  ]);

  return (
    <div className="absolute shadow-[-5px_0_10px_0_rgba(0,0,0,0.10)] z-10 right-[0] top-[80px] w-[680px] h-[calc(100vh-80px)] bg-s-white">
      <div className="flex flex-col h-[calc(100vh-80px)] p-[30px]">
        <div className="border-b-[1px] border-s-light-grey flex justify-between pb-[20px]">
          <p className={`text-[26px] text-s-black font-light`}>Новый тариф</p>
          <button title="close" onClick={onClose}>
            <Close />
          </button>
        </div>
        <div className="flex-grow overflow-y-auto overflow-x-hidden">
          <div className="flex gap-[26px] mt-5">
            <Button
              onClick={handleSave}
              type="red"
              iconLeft={<Save />}
              text="Создать"
              disabled={isButtonDisabled(typeTariff?.type === "CUSTOMIZABLE")}
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
                selectList={typesTariffs}
                labelKey="typeName"
                value={typeTariff}
                setTakeValue={setTypeTariff}
                placeholder="Выберите тип"
              />
            </div>
            {typeTariff && (
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
                {typeTariff.type === "FIXED" ? (
                  <>
                    <div className="mb-3 flex gap-5">
                      <div className="w-1/2">
                        <span className="text-[18px] mb-1">Гигабайты:</span>
                        <Input
                          placeholder="Введите количество"
                          value={String(countGigabytes)}
                          setTakeValue={(newValue) =>
                            handleCountResourcesChange(
                              newValue,
                              setCountGigabytes,
                            )
                          }
                        />
                      </div>
                      <div className="w-1/2">
                        <span className="text-[18px] mb-1">
                          Цена за гигабайт:
                        </span>
                        <Input
                          placeholder="Введите цену"
                          value={String(costGigabyte)}
                          setTakeValue={(newValue) =>
                            handleCostChange(newValue, setCostGigabyte)
                          }
                        />
                      </div>
                    </div>
                    <div className="mb-3 flex gap-5">
                      <div className="w-1/2">
                        <span className="text-[18px] mb-1">Минуты:</span>
                        <Input
                          placeholder="Введите количество"
                          value={String(countMinutes)}
                          setTakeValue={(newValue) =>
                            handleCountResourcesChange(
                              newValue,
                              setCountMinutes,
                            )
                          }
                        />
                      </div>
                      <div className="w-1/2">
                        <span className="text-[18px] mb-1">
                          Цена за минуту:
                        </span>
                        <Input
                          placeholder="Введите цену"
                          value={String(costMinute)}
                          setTakeValue={(newValue) =>
                            handleCostChange(newValue, setCostMinute)
                          }
                        />
                      </div>
                    </div>
                    <div className="mb-3 flex gap-5">
                      <div className="w-1/2">
                        <span className="text-[18px] mb-1">СМС:</span>
                        <Input
                          placeholder="Введите количество"
                          value={String(countSms)}
                          setTakeValue={(newValue) =>
                            handleCountResourcesChange(newValue, setCountSms)
                          }
                        />
                      </div>
                      <div className="w-1/2">
                        <span className="text-[18px] mb-1">Цена за СМС:</span>
                        <Input
                          placeholder="Введите цену"
                          value={String(costSms)}
                          setTakeValue={(newValue) =>
                            handleCostChange(newValue, setCostSms)
                          }
                        />
                      </div>
                    </div>
                    <div className="mb-3">
                      <span className="text-[18px] mb-1">Цена тарифа:</span>
                      <Input
                        placeholder="Введите цену тарифа"
                        value={String(cost)}
                        setTakeValue={(newValue) =>
                          handleCostChange(newValue, setCost)
                        }
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="mb-3">
                      <div className="text-[18px] mb-5">Гигабайты:</div>
                      <div className="px-5">
                        <TariffBar
                          values={valuesGigabytes}
                          min={minGigabytes}
                          max={maxGigabytes}
                        />
                        <TariffValuesManager
                          min={minGigabytes}
                          max={maxGigabytes}
                          setMin={setMinGigabytes}
                          setMax={setMaxGigabytes}
                          defaultValues={defaultValuesGigabytes}
                          onUpdateValues={setValuesGigabytes}
                        />
                      </div>
                    </div>
                    <div className="mb-3">
                      <div className="text-[18px] mb-5">Минуты:</div>
                      <div className="px-5">
                        <TariffBar
                          values={valuesMinutes}
                          min={minMinutes}
                          max={maxMinutes}
                        />
                        <TariffValuesManager
                          min={minMinutes}
                          max={maxMinutes}
                          setMin={setMinMinutes}
                          setMax={setMaxMinutes}
                          defaultValues={defaultValuesMinutes}
                          onUpdateValues={setValuesMinutes}
                        />
                      </div>
                    </div>
                    <div className="mb-3">
                      <div className="text-[18px] mb-5">СМС:</div>
                      <div className="px-5">
                        <TariffBar
                          values={valuesSms}
                          min={minSms}
                          max={maxSms}
                        />
                        <TariffValuesManager
                          min={minSms}
                          max={maxSms}
                          setMin={setMinSms}
                          setMax={setMaxSms}
                          defaultValues={defaultValuesSms}
                          onUpdateValues={setValuesSms}
                        />
                      </div>
                    </div>
                    <div className="mb-3">
                      <span className="text-[18px] mb-1">
                        Цена за гигабайт:
                      </span>
                      <Input
                        placeholder="Введите цену"
                        value={String(costGigabyte)}
                        setTakeValue={(newValue) =>
                          handleCostChange(newValue, setCostGigabyte)
                        }
                      />
                    </div>
                    <div className="mb-3">
                      <span className="text-[18px] mb-1">Цена за минуту:</span>
                      <Input
                        placeholder="Введите цену"
                        value={String(costMinute)}
                        setTakeValue={(newValue) =>
                          handleCostChange(newValue, setCostMinute)
                        }
                      />
                    </div>
                    <div className="mb-3">
                      <span className="text-[18px] mb-1">Цена за СМС:</span>
                      <Input
                        placeholder="Введите цену"
                        value={String(costSms)}
                        setTakeValue={(newValue) =>
                          handleCostChange(newValue, setCostSms)
                        }
                      />
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
