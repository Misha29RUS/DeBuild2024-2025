import { Button } from "../components/UI/Button.tsx";
import { useState } from "react";
import { AbonentSidebar } from "../components/AbonentSidebar.tsx";
export const Users = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  return (
    <>
      <div className="grow p-[40px_90px]">
        Users
        <Button
          type="red"
          text="Открыть сайдбар"
          onClick={(e) => {
            setShowSidebar(true);
          }}
        />
        <Button
          type="grey"
          text="Открыть сайдбар"
          onClick={(e) => {
            setShowSidebar(true);
          }}
        />
      </div>
      {showSidebar && (
        <AbonentSidebar
          onClose={() => {
            setShowSidebar(false);
            // setActiveRow(null);
          }}
        />
      )}
    </>
  );
};
