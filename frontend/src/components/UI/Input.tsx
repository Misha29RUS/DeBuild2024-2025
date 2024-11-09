import CloseSvg from "../../img/input_svg/close.svg?react"

type InputProps = {
    placeholder?: string;
    setTakeValue: React.Dispatch<React.SetStateAction<string>>;
    value: string;
};

export const Input = ({
    placeholder,
    setTakeValue,
    value
}: InputProps) => {
    return (
        <div className="relative">
            <input
                onChange={(event) => setTakeValue(event.target.value)}
                value={value}
                placeholder={placeholder}
                type="text"
                className={`border border-s-light-grey rounded-lg text-s-black
                px-4 py-3 pr-9 font-extralight text-[18px] placeholder:text-s-light-grey
                hover:border-s-dark-grey hover:placeholder:text-s-dark-grey
                outline-none`} />
            <CloseSvg className="absolute top-3 right-4 cursor-pointer"
            onClick={() => setTakeValue("")} />
        </div>
    )
} 