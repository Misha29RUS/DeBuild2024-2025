import { useState, useEffect, useRef } from "react";
import { SelectElement } from "./SelectElement";
import { Checkbox } from "./Checkbox";
import ArrowSvg from "../../img/selectors_svg/keyboard_arrow_down.svg?react"
import CloseSvg from "../../img/selectors_svg/close.svg?react"

type MultiSelectorProps<T> = {
    placeholder: string;
    selectList: T[];
    setTakeValue: React.Dispatch<React.SetStateAction<T[]>>;
    value?: T[];
    labelKey: keyof T;
    type?: string;
};

export const MultiSelector = <T extends object>({
    placeholder,
    selectList,
    setTakeValue,
    value,
    labelKey,
    type
}: MultiSelectorProps<T>) => {
    const [selectedData, setSelectedData] = useState<T[]>(value || []);
    const [showDropdown, setShowDropdown] = useState(false);
    const [list, setList] = useState(selectList);
    const [searchText, setSearchText] = useState("");
    
    // Поиск по элементам в инпуте
    const handleSearch = (search: string) => {
        if (search !== "") {
            const filteredData = selectList.filter((item) =>
                String(item[labelKey]).toLowerCase().startsWith(search.toLowerCase())
            );
            setList(filteredData);
        } else {
            setList(selectList);
        }
    };

    // Ввод в инпут
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value)
        handleSearch(e.target.value);
    };

    const toggleSelect = (data: T) => {
        const isSelected = selectedData.some(
            (item) => item[labelKey] === data[labelKey]
        );
        const updatedSelectedData = isSelected
            ? selectedData.filter((item) => item[labelKey] !== data[labelKey])
            : [...selectedData, data];
        
        setSelectedData(updatedSelectedData);
        setTakeValue(updatedSelectedData);
    };

    // Закрытие выпадающего списка при клике вне элемента
    const dropdownRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !(dropdownRef.current).contains(event.target as Node)) {
                setShowDropdown(false);
                setSearchText("")
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
                value={showDropdown
                    ? searchText
                    : selectedData.length > 0
                    ? `Выбрано: ${selectedData.length}`
                    : ""}
                className={`py-3 px-4 pr-[60px]  outline-none border font-extralight text-[18px] w-[inherit] 
                ${showDropdown ?
                `rounded-t-lg ${type ? 'border-s-white' : 'border-s-dark-grey'} `
                : `rounded-lg ${type ? 'border-s-white' : 'border-s-light-grey'}`}
                ${type ? 
                'border-s-white text-s-white placeholder:text-s-white group-hover:border-s-white group-hover:text-s-white' 
                : 'placeholder:text-s-light-grey group-hover:border-s-dark-grey group-hover:text-s-dark-grey'}
                ${type === 'active' ? 'bg-s-red' 
                : (type === 'archive' ? 'bg-s-black'
                : (type === 'more' && 'bg-s-dark-grey'))}`}
                placeholder={placeholder}
                id="input"
            />
            {selectedData.length > 0 && (
                <CloseSvg className={`absolute top-3.5 right-[38px] cursor-pointer
                ${type ? 'fill-s-white' : 'fill-s-black'}`}
                onClick={() => {
                    setSelectedData([])
                    setTakeValue([])
                    setList(selectList)
                }} />
            )}
            {showDropdown && selectedData.length !== 0 && (
                <div className={`flex flex-wrap border-x py-3 px-4 gap-2.5
                ${type ? 'border-x-s-white' : 'border-x-s-dark-grey'}`}>
                    {selectedData.map((item, index) => (
                        <SelectElement key={index} data={item} 
                        data_name={labelKey} handleSelect={() => toggleSelect(item)} />
                    ))}
                </div>
            )}
            
            <ArrowSvg
                onClick={() => setShowDropdown(!showDropdown)}
                className={`absolute top-3.5 cursor-pointer right-4 
                ${type ? 'group-hover:fill-s-white' : 'group-hover:fill-s-dark-grey'}
                ${showDropdown ? `rotate-180 ${type ? 'fill-s-white' : 'fill-s-dark-grey'}` 
                : `${type ? 'fill-s-white' : 'fill-s-light-grey'}`}`}
            />

            {showDropdown && (
                <ul className={`absolute left-0 right-0 max-h-[200px]
                overflow-y-auto border rounded-b-lg z-10
                ${type ? 'border-s-white' : 'border-s-dark-grey'}`}>
                    {list?.slice(0, 10).map((data, index) => {
                        const isChecked = selectedData.some(
                            (item) => item[labelKey] === data[labelKey]
                        )
                        return (
                            <li
                                onClick={() => toggleSelect(data)}
                                key={index}
                                className={`py-3 px-4 transition-colors cursor-pointer
                                flex items-center
                                ${!type && 'hover:bg-s-light-grey'}
                                ${type === 'active' ? 'bg-s-red'
                                : (type === 'archive' ? 'bg-s-black'
                                : (type === 'more' && 'bg-s-dark-grey'))}`}>
                                <Checkbox filterChecked={isChecked} />    
                                <p className={`font-extralight text-[18px] ml-4
                                ${type && 'text-s-white'}`}> 
                                    {String(data[labelKey])}
                                </p>
                            </li>
                        )
                        })
                    }
                </ul>
            )}
        </div>
    );
};