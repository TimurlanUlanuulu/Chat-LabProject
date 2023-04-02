import React from "react";
import { Route, Routes } from "react-router-dom";
import Register from "./components/Auth/Register";
import LogIn from "./components/Auth/LogIn";
import ProfilePage from "./pages/ProfilePage";
import PhoneAuth from "./components/Auth/AuthWithPhoneNum/PhoneAuth";

type RoutesType = {
  link: string;
  element: JSX.Element;
  id: number;
};

const MainRoutes: React.FC = () => {
  const ROUTES: RoutesType[] = [
    {
      link: "/",
      element: <PhoneAuth />,
      id: 1,
    },
  ];
  return (
    <Routes>
      {ROUTES.map((item) => (
        <Route path={item.link} element={item.element} key={item.id} />
      ))}
      <Route
        path="/register"
        element={<Register location={undefined} name={""} />}
      />
      <Route path="/login" element={<LogIn location={undefined} name={""} />} />
      <Route path="/profile" element={<ProfilePage />} />
    </Routes>
  );
};

export default MainRoutes;
