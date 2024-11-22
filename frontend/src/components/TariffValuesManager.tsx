import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { TariffField } from "./UI/TariffField";
import { Button } from "../components/UI/Button";
import AddSvg from "../img/abonent_sidebar_svg/add.svg?react"

interface TariffValuesManagerProps {
    min: number | 'min';
    max: number | 'max';
    setMin: (value: number) => void;
    setMax: (value: number) => void;
    defaultValues: (number | "min" | "max")[];
    onUpdateValues: (values: (number | "min" | "max")[]) => void;
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
    console.log(plusValues)

    return (
        <div className="mt-1.5 flex items-center gap-2.5">
            <TariffField 
                min={0} 
                max={max === 'max' ? 999 : (plusValues.length === 0 ? max : plusValues[0].value!)} 
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
                            return updatedValues.sort((a, b) => (a.value ?? 0) - (b.value ?? 0));
                        })
                    }
                    autoFocus={true}
                />
            ))}

            <TariffField 
                min={min === 'min' ? 0 : (plusValues.length === 0 ? min : plusValues[plusValues.length-1].value!)} 
                max={999} 
                placeholder="max" 
                plusValue={false} 
                onChange={setMax} 
            />
            {(plusValues.length < 3 && (defaultValues[0] !== 'min' && defaultValues[1] !== 'max')) && (
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