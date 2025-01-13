import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LogoSvg from "../img/header_svg/logo_header.svg?react";

import { Input } from "../components/UI/Input.tsx";
import { Button } from "../components/UI/Button.tsx";
import { SelectorMock } from "../components/UI/SelectorMock.tsx";

export function SuperAdmin() {
  axios.defaults.withCredentials = true;
  // const [errorText, setErrorText] = useState("");
  const [email, setEmail] = useState("");
  const [surname, setSurname] = useState("");
  const [name, setName] = useState("");
  const [patronymic, setPatronymic] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const roleChange = [
    {
      role: "ROLE_ADMIN",
      roleName: "Админимтратор",
    },
    {
      role: "ROLE_OPERATOR",
      roleName: "Оператор",
    },
  ];

  type roleChange = {
    role: string;
    roleName: string;
  };

  const [role, setRole] = useState<roleChange | undefined>();

  axios.defaults.withCredentials = true;
  const handleClickPrimaryButton = async (e) => {
    const accessToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith("accessToken="))
      ?.split("=")[1];
    e.preventDefault();
    try {
      const response = await axios.post(
        `/api/employees`,
        {
          email: email,
          role: role!.role,
          firstName: name,
          lastName: surname,
          patronymic: patronymic,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      if (response.status === 200) {
        setMessage(`Успешно! Почта ${email} имеет роль ${role.roleName}`);
        setSurname("");
        setRole(undefined);
        setEmail("");
        setPatronymic("");
        setName("");
      }
    } catch (error) {}
  };

  const handleLogout = () => {
    document.cookie = `accessToken=; path=/; max-age=0; secure; samesite=strict`;
    document.cookie = `refreshToken=; path=/; max-age=0; secure; samesite=strict`;

    // Перенаправляем на страницу входа
    navigate("/login");
  };
  const isButtonDisabled = !email || !surname || !name || !patronymic || !role;
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white shadow-md rounded-[20px] w-[714px]">
        <div className="bg-black text-white text-center py-4 rounded-t-[20px] flex justify-center">
          <LogoSvg />
        </div>
        <div className="py-[40px]">
          <h2 className="text-s-black text-[34px] text-center">
            Добавление пользователя
          </h2>
          <div className="mt-[30px] px-[100px]">
            <form className="" onSubmit={(e) => handleClickPrimaryButton(e)}>
              <div>
                <span className="text-[18px] mb-1">Почта:</span>
                <Input
                  placeholder="Введите почту"
                  value={email}
                  setTakeValue={setEmail}
                />
              </div>
              <div className="mt-[10px]">
                <span className="text-[18px] mb-1">Роль:</span>
                <SelectorMock
                  selectList={roleChange}
                  labelKey="roleName"
                  value={role}
                  setTakeValue={setRole}
                  placeholder="Выберите роль"
                />
              </div>
              <div className="mt-[10px]">
                <span className="text-[18px] mb-1">Фамилия:</span>
                <Input
                  placeholder="Введите фамилию"
                  value={surname}
                  setTakeValue={setSurname}
                />
              </div>
              <div className="mt-[10px]">
                <span className="text-[18px] mb-1">Имя:</span>
                <Input
                  placeholder="Введите имя"
                  value={name}
                  setTakeValue={setName}
                />
              </div>
              <div className="mt-[10px]">
                <span className="text-[18px] mb-1">Отчество:</span>
                <Input
                  placeholder="Введите отчество"
                  value={patronymic}
                  setTakeValue={setPatronymic}
                />
              </div>
              {message !== "" && (
                <p className=" mt-[10px] text-s-green text-[18px] text-center">
                  {message}
                </p>
              )}
              <Button
                text="Добавить"
                type="red"
                styles="w-[100%] justify-center mt-[30px]"
                disabled={isButtonDisabled}
              />
            </form>
            <div className="mt-[10px] flex flex-col items-center">
              <div>
                <p
                  className="cursor-pointer text-s-light-grey hover:text-s-dark-grey text-[18px]"
                  onClick={handleLogout}
                >
                  Выйти
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
