type FinanceOperation = {
    operation_type: string,
    operation_quantity: number,
    operation_date: Date
}

type FinanceItemProps = {
    operation: FinanceOperation
    styles?: string
}

export const FinanceItem = ({
    operation,
    styles
}: FinanceItemProps) => {
    const date = operation.operation_date

    const formattedDate = date.toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
    
    const formattedTime = date.toLocaleTimeString('ru-RU', {
        hour: '2-digit',
        minute: '2-digit'
    });
    
    const formatted_date = `${formattedDate}, ${formattedTime}`;

    return (
        <div className={`flex items-center text-[18px] py-1.5
        border-b border-b-s-light-grey w-full ${styles}`}>
            <div className={`mr-[30px] w-[23%]
                flex items-center
                ${operation.operation_type === 'top_up_balance'
                ? 'text-s-green' : 'text-s-red'}`}>
                <span className="overflow-hidden text-ellipsis whitespace-nowrap">
                    {operation.operation_type === 'top_up_balance' ? '+' : '-'}
                    {operation.operation_quantity.toLocaleString('ru-RU')}
                </span>
                <span>&nbsp;₽</span>
            </div>
            <div className="w-[70%]">
                <p>
                    {operation?.operation_type === 'top_up_balance' 
                    ? 'Пополнение' : (operation.operation_type === 'payment_tariff'
                    ? 'Оплата тарифа' : (operation.operation_type === 'payment_service'
                    && 'Оплата услуги'))}
                </p>
                <p className="font-extralight">
                    {formatted_date}
                </p>
            </div>
        </div>
    )
}