import { useEffect, useRef, useState } from "react"
import CloseSvg from "../../img/input_svg/close.svg?react"

interface PlusValue {
    id: string;
    value: number | null;
    isDuplicate: boolean;
}

interface TariffFieldProps {
    min: number | 'min'; // минимальное значение (левый край)
    max: number | 'max'; // максимальное значение (правый край)
    plusValue: boolean;
    setPlusValues?: React.Dispatch<React.SetStateAction<PlusValue[]>>;
    indexPlusValue?: number;
    placeholder?: string;
    onChange: (value: number) => void;
    styles?: string;
    autoFocus?: boolean;
    defaultValues?: (number | "min" | "max")[];
    isDuplicate?: boolean;
}

export const TariffField: React.FC<TariffFieldProps> = ({ 
    min,
    max,
    plusValue,
    setPlusValues,
    indexPlusValue,
    placeholder,
    onChange,
    styles,
    autoFocus,
    defaultValues,
    isDuplicate 
}) => {
    const [value, setValue] = useState<string>('');
    const [savedValue, setSavedValue] = useState<number | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);

    // Устанавливаем фокус, если autoFocus = true
    useEffect(() => {
        if (autoFocus && inputRef.current) {
            inputRef.current.focus();
        }
    }, [autoFocus]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
    
        if (/^\d*$/.test(inputValue)) {
            setValue(inputValue);
        }
    };

    const handleBlur = () => {
        if (value === '') {
            // Если поле пустое, возвращаем сохраненное значение
            if (savedValue !== null) {
                setValue(String(savedValue));
                onChange(savedValue);
            }
            if (plusValue && setPlusValues) {
                setPlusValues((prevValues) => prevValues.filter((_, i) => i !== indexPlusValue));
            }
            return;
        }
    
        const numericValue = parseInt(value, 10);

        // Преобразование 'min' и 'max' в числа
        const numericMin = typeof min === 'number' ? min : 0; // Пример: если 'min', то 0
        const numericMax = typeof max === 'number' ? max : 999; // Пример: если 'max', то 999
        
        if (defaultValues && (numericValue === defaultValues[0] || numericValue === defaultValues[1])) {
            if(savedValue === null) {
                setValue('')
            } else {
                setValue(String(savedValue))
            }
            return;
        } else if (defaultValues) {
            if (numericValue < numericMin) {
                if (numericMin === defaultValues[0]) {
                    setValue(String(numericMin+1));
                    onChange?.(numericMin+1);
                    setSavedValue(numericMin+1); 
                } else {
                    setValue(String(numericMin));
                    onChange?.(numericMin);
                    setSavedValue(numericMin); 
                } 
            } else if (numericValue > numericMax) {
                if (numericMax === defaultValues[1]) {
                    setValue(String(numericMax-1));
                    onChange?.(numericMax-1);
                    setSavedValue(numericMax-1); 
                } else {
                    setValue(String(numericMax));
                    onChange?.(numericMax);
                    setSavedValue(numericMax); 
                } 
            } else {
                onChange?.(numericValue);
                setSavedValue(numericValue);
            }
        } else {
            if (numericValue < numericMin) {
                setValue(String(numericMin));
                onChange?.(numericMin);
                setSavedValue(numericMin);
            } else if (numericValue > numericMax) {
                setValue(String(numericMax));
                onChange?.(numericMax);
                setSavedValue(numericMax);
            } else {
                onChange?.(numericValue);
                setSavedValue(numericValue);
            }
        }
    };

    return (
        <div className={`relative w-[68px] h-[46px] ${styles}`}>
            <input
                ref={inputRef}
                className={`border w-[inherit] rounded-lg text-s-black
                px-3 py-3 font-light text-[18px] placeholder:text-s-light-grey
                hover:border-s-dark-grey hover:placeholder:text-s-dark-grey
                outline-none text-center
                ${isDuplicate ? 'border-yellow-500' : 'border-s-light-grey'}`}
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