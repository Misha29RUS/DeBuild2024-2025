import { useState } from "react"
import CloseSvg from "../../img/input_svg/close.svg?react"

interface TariffFieldProps {
    min?: number; // минимальное значение (левый край)
    max?: number; // максимальное значение (правый край)
    plusValue: boolean;
    setPlusValues?: React.Dispatch<React.SetStateAction<{ id: string; value: number | null }[]>>;
    indexPlusValue?: number;
    placeholder?: string;
    onChange: (value: number) => void;
    styles?: string;
}

export const TariffField: React.FC<TariffFieldProps> = ({ 
    min,
    max,
    plusValue,
    setPlusValues,
    indexPlusValue,
    placeholder,
    onChange,
    styles 
}) => {
    const [value, setValue] = useState<string>('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
    
        if (/^\d*$/.test(inputValue)) {
            setValue(inputValue);
        }
    };

    const handleBlur = () => {
        if (value === '') return; // Если поле пустое, ничего не делаем
    
        const numericValue = parseInt(value, 10);
    
        // Проверяем диапазон
        if (numericValue < (min ? min : 0)) {
          setValue(String(min)); // Приводим к минимальному значению
          onChange?.((min ? min : 0));
        } else if (numericValue > (max ? max : 999)) {
          setValue(String(max)); // Приводим к максимальному значению
          onChange?.((max ? max : 999));
        } else {
          onChange?.(numericValue); // Передаём корректное значение
        }
    };

    return (
        <div className={`relative w-[68px] h-[46px] ${styles}`}>
            <input
                className={`border w-[inherit] border-s-light-grey rounded-lg text-s-black
                px-3 py-3 font-extralight text-[18px] placeholder:text-s-light-grey
                hover:border-s-dark-grey hover:placeholder:text-s-dark-grey
                outline-none text-center`}
                type="text"
                value={value}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder={placeholder}
                inputMode="numeric"
            />
            {plusValue && (
                <CloseSvg className="w-4 h-4 absolute top-1 right-1 cursor-pointer"
                    onClick={() => {
                        setPlusValues?.((prevValues) =>
                            prevValues.filter((_, i) => i !== indexPlusValue)
                        );
                    }}
                />
            )}  
        </div>
    )
}