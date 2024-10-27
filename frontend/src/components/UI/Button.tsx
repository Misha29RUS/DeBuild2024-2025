type ButtonProps = {
    text?: string;
    type: string;
    styles?: string;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    iconLeft?: React.ReactNode; 
    iconRight?: React.ReactNode; 
    onlyIcon?: React.ReactNode;
}

export const Button = ({
    text, 
    type, 
    styles, 
    onClick, 
    disabled,
    iconLeft,
    iconRight,
    onlyIcon 
}: ButtonProps) => {
    const greyStyle = "border-s-dark-grey text-s-dark-grey hover:text-white " +
    "hover:bg-black disabled:text-s-dark-grey disabled:border-s-dark-grey " +
    "disabled:bg-transparent border bg-transparent hover:border-white"
    const redStyle = "text-white bg-s-red hover:bg-s-light-red disabled:bg-s-dark-red"

    return (
        <button 
            onClick={onClick} 
            disabled={disabled} 
            className={`group font-medium text-[18px] py-2.5
            rounded-md transition ease-linear delay-75
            disabled:cursor-not-allowed flex items-center
            ${onlyIcon ? 'px-2.5' : 'px-4'}
            ${type === 'grey' ? greyStyle : (type === 'red' && redStyle)} 
            ${styles}`}>
                {onlyIcon ? (
                    <span className={`delay-75 transition ease-linear
                        ${type === 'grey' 
                        ? 'fill-s-dark-grey group-hover:fill-white'
                        : (type === 'red') && 'fill-white'}`}>
                        {onlyIcon}
                    </span>
                ) : (
                    <>
                        {iconLeft && <span 
                        className={`mr-1 delay-75 transition ease-linear
                        ${type === 'grey' 
                        ? 'fill-s-dark-grey group-hover:fill-white'
                        : (type === 'red') && 'fill-white'}`}>
                            {iconLeft}
                        </span>}
                        {text && <span>{text}</span>}
                        {iconRight && <span 
                        className={`ml-1 delay-75 transition ease-linear
                        ${type === 'grey' 
                        ? 'fill-s-dark-grey group-hover:fill-white'
                        : (type === 'red') && 'fill-white'}`}>
                            {iconRight}
                        </span>}
                    </>
                )}
        </button>
    )
}