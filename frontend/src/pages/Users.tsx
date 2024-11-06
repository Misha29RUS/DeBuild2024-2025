import { Button } from "../components/UI/Button.tsx";
import { useEffect, useState } from "react";
import { AbonentSidebar } from "../components/AbonentSidebar.tsx";
import { basicUserData, BasicUserData } from "../mock/mock.ts";
export const Users = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [userID, setUserID] = useState(-1);
  const [activeRow, setActiveRow] = useState(-1);
  const [data, setData] = useState<BasicUserData[]>([]);
  const openSidebarClick = (e: React.MouseEvent, userID: number) => {
    e.stopPropagation();
    setShowSidebar(true);
    setUserID(userID);
  };
  useEffect(() => {
    const getData = () => {
      setData(basicUserData);
    };

    getData();
  }, []);
  return (
    <>
      <div className="grow p-[40px_90px]">
        Users
        <ul className="user-info-ul">
          {data.map((user) => (
            <li>
              <div className={`${activeRow === user.id && "bg-s-light-grey"} cursor-pointer p-3 hover:bg-s-light-grey`}
                   onClick={(e) => {
                     openSidebarClick(e, user.id);
                     setActiveRow(user.id);
                   }}
                   key={user.id}>
                {`${user.lastName} ${user.firstName} ${user.middleName}`}
              </div>
            </li>
          ))}
        </ul>
      </div>
      {showSidebar && (
        <AbonentSidebar
          onClose={() => {
            setShowSidebar(false);
            setActiveRow(null);
          }}
          userID={userID}
        />
      )}
    </>
  );
};
