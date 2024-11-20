import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { TariffField } from "./UI/TariffField";
import { Button } from "../components/UI/Button";
import AddSvg from "../img/abonent_sidebar_svg/add.svg?react"

interface TariffValuesManagerProps {
    min: number;
    max: number;
    setMin: (value: number) => void;
    setMax: (value: number) => void;
    defaultValues: number[];
    onUpdateValues: (values: number[]) => void;
}

export const TariffValuesManager: React.FC<TariffValuesManagerProps> = ({
    min,
    max,
    setMin,
    setMax,
    defaultValues,
    onUpdateValues,
}) => {
    const [plusValues, setPlusValues] = useState<{ id: string; value: number | null }[]>([]);

    // Обновляем общий массив значений
    useEffect(() => {
        const allValues = [...defaultValues, ...plusValues.map(item => item.value).filter((value): value is number => value !== null)];
        onUpdateValues(allValues);
    }, [defaultValues, plusValues]);

    return (
        <div className="mt-1.5 flex items-center gap-2.5">
            <TariffField 
                min={0} 
                max={max} 
                placeholder="min" 
                plusValue={false} 
                onChange={setMin} 
            />

            {plusValues.map((item, index) => (
                <TariffField
                    key={item.id}
                    min={min}
                    max={max}
                    plusValue={true}
                    indexPlusValue={index}
                    setPlusValues={setPlusValues}
                    onChange={(value: number) =>
                        setPlusValues(prevValues => {
                            const updatedValues = [...prevValues];
                            updatedValues[index] = { ...updatedValues[index], value };
                            return updatedValues;
                        })
                    }
                />
            ))}

            <TariffField 
                min={min} 
                max={999} 
                placeholder="max" 
                plusValue={false} 
                onChange={setMax} 
            />
            {plusValues.length < 3 && (
                <Button
                    type="grey"
                    onlyIcon={<AddSvg />}
                    onClick={() =>
                        setPlusValues(prevValues => [
                            ...prevValues,
                            { id: uuidv4(), value: null },
                        ])
                    }
                />
            )}
        </div>
    );
};