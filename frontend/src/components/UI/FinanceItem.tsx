import { IHistoryOfTransaction } from "../../app/services/types"

type FinanceItemProps = {
    operation: IHistoryOfTransaction
    styles?: string
}

export const FinanceItem = ({
    operation,
    styles
}: FinanceItemProps) => {
    const date = new Date(operation.dateOfTransaction)

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
                ${operation.typeOfTransaction === 'REPLENISHMENT'
                ? 'text-s-green' : 'text-s-red'}`}>
                <span className="overflow-hidden text-ellipsis whitespace-nowrap">
                    {operation.typeOfTransaction === 'REPLENISHMENT' ? '+' : '-'}
                    {operation.amountOfTransaction.toLocaleString('ru-RU')}
                </span>
                <span>&nbsp;₽</span>
            </div>
            <div className="w-[70%]">
                <p>
                    {operation.nameOfTransaction}
                </p>
                <p className="font-light">
                    {formatted_date}
                </p>
            </div>
        </div>
    )
}