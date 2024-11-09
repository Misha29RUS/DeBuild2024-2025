import CancelSvg from "../../img/select_item_svg/cancel.svg?react"

type SelectElementProps<T> = {
    handleSelect: (data: T) => void;
    data: T;
    data_name: keyof T;
}

export const SelectElement = <T, >({handleSelect, data, data_name}: SelectElementProps<T>) => {
    return (
        <div className="flex items-center p-1.5
        bg-s-light-grey rounded-lg">
            <CancelSvg onClick={() => handleSelect(data)}
            className="mr-1.5 w-4 h-4 cursor-pointer" />
            <span className="font-extralight text-[14px]">
                {String(data[data_name])}
            </span>
        </div>
    )
}