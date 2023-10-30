import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Sidebar from "./component/Sidebar";
import User from "./pages/User";
import Footer from "./component/Footer";
import UserProfile from "./pages/UserProfile";
import Setting from "./pages/Setting";

const ProtectedRoute = ({ states }) => {
    return (
        <>
            <Sidebar states={states} />
            <div className="md:ps-64 min-h-[calc(100vh_-_110px)]">
                <Routes>
                    <Route exact path="/" element={<Homepage states={states} />} />
                    <Route path={"*"} element={<Navigate to={"/"} />} />
                    {states.isAdmin && <Route path={"/user"} element={<User states={states} />} />}
                    {states.isAdmin && <Route path={"/user/:userId"} element={<UserProfile states={states} />} />}
                    {states.isAdmin && <Route path={"/setting"} element={<Setting states={states} />} />}
                </Routes>
            </div>
            <Footer />
        </>
    );
};
export { ProtectedRoute };
