import { useState, useEffect } from "react";
import { TariffBar } from "../components/UI/TariffBar"
import { TariffValuesManager } from "../components/TariffValuesManager";

export const Services = () => {
    const [min, setMin] = useState(0)
    const [max, setMax] = useState(999)
    const [values, setValues] = useState<number[]>([]);
    console.log(values)
    const [defaultValues, setDefaultValues] = useState([min, max]);
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