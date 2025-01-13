// @ts-ignore
import { useState, useEffect } from "react";
// @ts-ignore
import { v4 as uuidv4 } from "uuid";
import { TariffField } from "./UI/TariffField";
import { Button } from "../components/UI/Button";
// @ts-ignore
import AddSvg from "../img/abonent_sidebar_svg/add.svg?react"

interface TariffValuesManagerProps {
    min: number | 'min';
    max: number | 'max';
    setMin: (value: number) => void;
    setMax: (value: number) => void;
    defaultValues: (number | "min" | "max")[];
    onUpdateValues: (values: (number | "min" | "max")[]) => void;
}

interface PlusValue {
    id: string;
    value: number | null;
    isDuplicate: boolean;
}
// @ts-ignore
export const TariffValuesManager: React.FC<TariffValuesManagerProps> = ({
                                                                            // @ts-ignore
    min,
                                                                            // @ts-ignore
    max,
                                                                            // @ts-ignore
    setMin,
                                                                            // @ts-ignore
    setMax,
                                                                            // @ts-ignore
    defaultValues,
                                                                            // @ts-ignore
    onUpdateValues,
}) => {
    const [plusValues, setPlusValues] = useState<PlusValue[]>([]);

    // Функция для обновления флагов isDuplicate
    const updateDuplicates = (defaultValues: (number | "min" | "max")[], plusValues: PlusValue[]) => {
        // Извлекаем только числовые значения из defaultValues
        const numericDefaultValues = defaultValues.filter((v): v is number => v !== "min" && v !== "max");

        // Все уникальные значения (defaultValues + plusValues)
        const allValues = [
            ...numericDefaultValues,
            ...plusValues.map((item) => item.value).filter((value): value is number => value !== null),
        ];

        // Обновляем флаги isDuplicate для plusValues
        return plusValues.map((item) => ({
            ...item,
            isDuplicate: item.value !== null && allValues.filter((v) => v === item.value).length > 1,
        }));
    };

    // Обновляем общий массив значений
    useEffect(() => {
        const allValues = [
            ...defaultValues,
            // @ts-ignore
            ...plusValues.map((item) => item.value).filter((value): value is number => value !== null),
        ];
        onUpdateValues(allValues);
    }, [defaultValues, plusValues]);

    // Пересчитываем дубликаты при изменении defaultValues или plusValues
    // useEffect(() => {
    //     setPlusValues((prevPlusValues) => updateDuplicates(defaultValues, prevPlusValues));
    // }, [defaultValues, plusValues]);
    useEffect(() => {
        // @ts-ignore
        setPlusValues((prevPlusValues) => {
            const updatedPlusValues = updateDuplicates(defaultValues, prevPlusValues);
            // Проверяем, изменились ли значения
            if (JSON.stringify(updatedPlusValues) !== JSON.stringify(prevPlusValues)) {
                return updatedPlusValues;
            }
            return prevPlusValues; // Не вызываем обновление, если значения идентичны
        });
    }, [defaultValues]);

    const handleAddPlusValue = () => {
        // @ts-ignore
        setPlusValues((prevValues) => [
            ...prevValues,
            { id: uuidv4(), value: null, isDuplicate: false },
        ]);
    };

    const handleUpdatePlusValue = (index: number, newValue: number | null) => {
        // @ts-ignore
        setPlusValues((prevValues) => {
            const updatedValues = [...prevValues];
            updatedValues[index] = { ...updatedValues[index], value: newValue };
            return updateDuplicates(defaultValues, updatedValues.sort((a, b) => (a.value ?? 0) - (b.value ?? 0)));
        });
    };

    return (
        // @ts-ignore
        <div className="mt-1.5 flex items-center gap-2.5">
            <TariffField 
                min={0} 
                max={max === 'max' ? 999 : (plusValues.length === 0 ? max : plusValues[0].value!)} 
                placeholder="min" 
                plusValue={false} 
                onChange={setMin}
                defaultValues={defaultValues} 
            />

            {plusValues.map((item, index) => (
                <TariffField
                    key={item.id}
                    min={min}
                    max={max}
                    plusValue={true}
                    indexPlusValue={index}
                    setPlusValues={setPlusValues}
                    isDuplicate={item.isDuplicate}
                    onChange={(value: number) => handleUpdatePlusValue(index, value)}
                    autoFocus={true}
                />
            ))}

            <TariffField 
                min={min === 'min' ? 0 : (plusValues.length === 0 ? min : plusValues[plusValues.length-1].value!)} 
                max={999} 
                placeholder="max" 
                plusValue={false} 
                onChange={setMax}
                defaultValues={defaultValues} 
            />
            {(plusValues.length < 3) && (
                <Button
                    disabled={(defaultValues[0] === 'min') || (defaultValues[1] === 'max')}
                    type="grey"
                    onlyIcon={<AddSvg />}
                    onClick={handleAddPlusValue}
                />
            )}
        </div>
    );
};