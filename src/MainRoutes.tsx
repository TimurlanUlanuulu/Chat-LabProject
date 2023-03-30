import React from 'react';
import AuthPage from './pages/AuthPage';
import { Route, Routes } from "react-router-dom";

type RoutesType = {
    link: string;
    element: JSX.Element;
    id: number;
}

const MainRoutes: React.FC = () => {
    const ROUTES: RoutesType[] = [
        {link: "/", element: <AuthPage/>, id: 1}
    ]
    return (
        <Routes>
            {ROUTES.map(item => (
                <Route path={item.link} element={item.element} key={item.id} />
            ))}
        </Routes>
    );
};

export default MainRoutes;