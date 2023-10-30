import React from "react";

const Footer = () => {
    //mt-[814px]
    return (
        <div className="h-14 w-full bg-teal-100 md:ps-64 flex items-center justify-start">
            <h1 className="p-5 text-sm text-[#858886]">Copyright © {new Date().getFullYear()} All rights reserved.</h1>
        </div>
    );
};

export default Footer;
