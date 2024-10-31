import Close from "../img/abonent_sidebar_svg/close.svg?react";
import { useState } from "react";

export const AbonentSidebar = ({
  onClose,
  templateID,
}: {
  onClose: () => void;
  templateID: number | null;
}) => {
  const [tab, setTab] = useState("userInfo");
  const tabs = [
    { id: "userInfo", label: "Об абоненте" },
    { id: "tariffInfo", label: "Тариф и услуги" },
    { id: "balanceInfo", label: "Баланс" },
  ];
  return (
    <>
      <div className="absolute shadow-[-5px_0_10px_0_rgba(0,0,0,0.10)] z-10 right-[0] top-[80px] w-[680px] h-[calc(100vh-80px)] bg-s-white">
        <div className="flex flex-col h-[calc(100vh-80px)] p-[30px]">
          <div className="border-b-[1px] border-s-gray-150 flex justify-between pb-[20px]">
            <p className={`text-[26px] text-s-black font-light`}>+7(922)222-22-22</p>
            <button title="close" onClick={onClose}>
              <Close />
            </button>
          </div>
          <div className="mt-5 flex-grow overflow-x-auto">
            <ul className="flex font-medium text-[18px] text-s-light-grey tabs-ul">
              {tabs.map(({ id, label }) => (
                <li key={id} className="relative">
                  <button
                    className={`transition-colors pb-1 relative ${
                      tab === id ? "text-s-red" : ""
                    }`}
                    onClick={() => setTab(id)}
                  >
                    {label}
                    <span
                      className={`absolute bottom-0 left-0 w-full h-[1px] bg-s-red transform transition-transform duration-300 ease-in-out ${
                        tab === id ? "scale-x-100" : "scale-x-0"
                      }`}
                    ></span>
                  </button>
                </li>
              ))}
            </ul>
            <ul className="mt-5 font-normal text-[18px] user-info-ul text-s-black">
              <li>
                <p className="font-normal">Фамилия:</p>
                <p className="ml-[6px] font-extralight">Попов</p>
              </li>
              <li>
                <p className="font-normal">Имя:</p>
                <p className="ml-[6px] font-extralight">Иван</p>
              </li>
              <li>
                <p className="text-s-black font-normal">Отчество:</p>
                <p className="ml-[6px] font-extralight">Иванович</p>
              </li>
              <li>
                <p className="text-s-black font-normal">Дата рождения:</p>
                <p className="ml-[6px] font-extralight">05.03.2001</p>
              </li>
              <li>
                <p className="text-s-black font-normal">Серия паспорта:</p>
                <p className="ml-[6px] font-extralight">6517</p>
              </li>
              <li>
                <p className="text-s-black font-normal">Номер паспорта:</p>
                <p className="ml-[6px] font-extralight">441723</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
