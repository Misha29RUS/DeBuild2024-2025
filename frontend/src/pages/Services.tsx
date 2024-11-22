import { useState, useEffect } from "react";
import { TariffBar } from "../components/UI/TariffBar"
import { TariffValuesManager } from "../components/TariffValuesManager";

export const Services = () => {
    // вот так надо пользоваться гибким тарифом
    const [min, setMin] = useState<number | 'min'>('min')
    const [max, setMax] = useState<number | 'max'>('max')
    const [values, setValues] = useState<(number | "min" | "max")[]>([]);
    const [defaultValues, setDefaultValues] = useState<(number | "min" | "max")[]>([min, max]);
    useEffect(() => {
        setDefaultValues([min, max]);
    }, [min, max]);

    return (
        <div className="grow flex items-center justify-center">
            <div className="w-[350px]">
                <TariffBar min={min} max={max} values={values} />
                <TariffValuesManager
                    min={min}
                    max={max}
                    setMin={setMin}
                    setMax={setMax}
                    defaultValues={defaultValues}
                    onUpdateValues={setValues}
                />
            </div>
        </div>
    )
}