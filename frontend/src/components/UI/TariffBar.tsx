interface TariffBarProps {
    values: number[]; // массив значений от 2 до 5
    min: number; // минимальное значение (левый край)
    max: number; // максимальное значение (правый край)
    styles?: string;
}

export const TariffBar: React.FC<TariffBarProps> = ({ values, min, max, styles }) => {
    const calculatePosition = (value: number): string => {
        // Рассчитываем позицию точки относительно полосы в процентах
        const percentage = ((value - min) / (max - min)) * 100;
        return `${percentage}%`;
    };
    
    return (
        <div className={`relative w-full ${styles}`}>
            {/* Полоса */}
            <div className="relative w-full h-0.5 bg-s-black">
                {/* Точки */}
                {values.map((value, index) => (
                <div
                    key={index}
                    className="absolute -top-0.5 w-1.5 h-1.5 bg-black rounded-full"
                    style={{
                    left: calculatePosition(value),
                    transform: "translateX(-50%)",
                    }}
                ></div>
                ))}
            </div>
            {/* Подписи */}
            {values.map((value, index) => (
                <div
                key={index}
                className="absolute text-[18px] text-s-black"
                style={{
                    top: "-1.5rem", // Сдвиг подписи вверх над точкой
                    left: calculatePosition(value),
                    transform: "translateX(-50%)",
                }}
                >
                    {value}
                </div>
            ))}
        </div>
    )
}