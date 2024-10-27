import { useState, useEffect, useRef } from "react";
import ArrowSvg from "../../img/selectors_svg/keyboard_arrow_down.svg?react"
import CloseSvg from "../../img/selectors_svg/close.svg?react"

type SelectorProps<T> = {
    placeholder: string;
    selectList: T[];
    setTakeValue: React.Dispatch<React.SetStateAction<string | T | null>>;
    value?: T;
    labelKey: keyof T;
    type?: string;
};

export const Selector = <T extends object>({
    placeholder,
    selectList,
    setTakeValue,
    value,
    labelKey,
    type
}: SelectorProps<T>) => {
    const [selectedData, setSelectedData] = useState<T | string | undefined>(value);
    const [showDropdown, setShowDropdown] = useState(false);
    const [list, setList] = useState(selectList);

    // Поиск по элементам в инпуте
    const handleSearch = (search: string) => {
        if (search !== "") {
            const filteredData = selectList?.filter((item: T) =>
                String(item[labelKey]).toLowerCase().startsWith(search.toLowerCase())
            );
            setList(filteredData);
        } else {
            setList(selectList);
        }
    };

    // Ввод в инпут
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedData(e.target.value);
        setTakeValue(e.target.value as unknown as T);
        handleSearch(e.target.value);
    };

    // Закрытие выпадающего списка при клике вне элемента
    const dropdownRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !(dropdownRef.current).contains(event.target as Node)) {
                setShowDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative group w-full" ref={dropdownRef}>
            <input
                onChange={handleChange}
                onFocus={() => setShowDropdown(true)}
                value={typeof selectedData === 'object' && selectedData !== null
                    ? String((selectedData as T)[labelKey]) 
                    : selectedData || ''}
                className={`py-3 px-4 outline-none border font-extralight text-[18px] w-[inherit] 
                ${showDropdown ?
                `rounded-t-lg ${type ? 'border-white' : 'border-s-dark-grey'} `
                : `rounded-lg ${type ? 'border-white' : 'border-s-light-grey'}`}
                ${type ? 
                'border-white text-white placeholder:text-white group-hover:border-white group-hover:text-white' 
                : 'placeholder:text-s-light-grey group-hover:border-s-dark-grey group-hover:text-s-dark-grey'}
                ${type === 'active' ? 'bg-s-red' 
                : (type === 'archive' ? 'bg-black'
                : (type === 'more' && 'bg-s-dark-grey'))}`}
                placeholder={placeholder}
                id="input"
            />
            {selectedData && (
                <CloseSvg className={`absolute top-3.5 right-[38px] cursor-pointer
                ${type ? 'fill-white' : 'fill-black'}`}
                onClick={() => {
                    setSelectedData("")
                    setTakeValue("")
                    setList(selectList)
                }} />
            )}
            <ArrowSvg
                onClick={() => setShowDropdown(!showDropdown)}
                className={`absolute top-3.5 cursor-pointer right-4 
                ${type ? 'group-hover:fill-white' : 'group-hover:fill-s-dark-grey'}
                ${showDropdown ? `rotate-180 ${type ? 'fill-white' : 'fill-s-dark-grey'}` 
                : `${type ? 'fill-white' : 'fill-s-light-grey'}`}`}
            />

            {showDropdown && (
                <ul className={`absolute left-0 right-0 max-h-[200px]
                overflow-y-auto border rounded-b-lg z-10
                ${type ? 'border-white' : 'border-s-dark-grey'}`}>
                    {list?.slice(0, 10).map((data, index) => (
                        <li
                            onClick={() => {
                                setSelectedData(data);
                                setTakeValue(data);
                                setShowDropdown(false);
                            }}
                            key={index}
                            className={`py-3 px-4 transition-colors cursor-pointer
                            ${!type && 'hover:bg-s-light-grey'}
                            ${type === 'active' ? 'bg-s-red'
                            : (type === 'archive' ? 'bg-black'
                            : (type === 'more' && 'bg-s-dark-grey'))}`}>
                            <p className={`font-extralight text-[18px]
                            ${type && 'text-white'}`}>
                                {String(data[labelKey])}
                            </p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};