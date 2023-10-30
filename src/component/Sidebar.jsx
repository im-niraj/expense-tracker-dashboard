import React from "react";
import Menus from "../utils/Menus";
import { NavLink } from "react-router-dom";
import { Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon } from "@chakra-ui/react";
const Sidebar = ({ states }) => {
    return (
        <div className="fixed -translate-x-64 md:translate-x-0 left-0 pt-14 top-0 w-64 h-screen z-30 bg-violet-50 overflow-y-auto">
            <ul className="p-2 text-sm">
                {Menus.map((el, i1) => (
                    <>
                        {el.isSubMenu ? (
                            <>
                                {states.isAdmin === true ? (
                                    <Accordion key={i1 + "sidebar"} allowMultiple borderColor={"transparent"}>
                                        <AccordionItem>
                                            <AccordionButton px={2} className="flex justify-between rounded-md">
                                                <h1 className="text-sm">{el.name}</h1>
                                                <AccordionIcon />
                                            </AccordionButton>
                                            <AccordionPanel pb={4}>
                                                <ul>
                                                    {el.subMenu.map((innerEl, i2) => (
                                                        <>
                                                            {states.isAdmin === true ? (
                                                                <li key={i2 + "sub_menu"} className="hover:bg-[#0000000a] duration-200 rounded-md">
                                                                    <NavLink
                                                                        to={innerEl.path}
                                                                        className={({ isActive }) => (isActive ? "bg-teal-400 block p-2 rounded-md text-white font-semibold" : "block p-2")}
                                                                    >
                                                                        {innerEl.name}
                                                                    </NavLink>
                                                                </li>
                                                            ) : (
                                                                !innerEl.onlyAdmin && (
                                                                    <li key={i2 + "sub_menu"} className="hover:bg-[#0000000a] duration-200 rounded-md">
                                                                        <NavLink
                                                                            to={innerEl.path}
                                                                            className={({ isActive }) => (isActive ? "bg-teal-400 block p-2 rounded-md text-white font-semibold" : "block p-2")}
                                                                        >
                                                                            {innerEl.name}
                                                                        </NavLink>
                                                                    </li>
                                                                )
                                                            )}
                                                        </>
                                                    ))}
                                                </ul>
                                            </AccordionPanel>
                                        </AccordionItem>
                                    </Accordion>
                                ) : (
                                    !el.onlyAdmin && (
                                        <Accordion key={i1 + "sidebar"} allowMultiple borderColor={"transparent"}>
                                            <AccordionItem>
                                                <AccordionButton px={2} className="flex justify-between rounded-md">
                                                    <h1 className="text-sm">{el.name}</h1>
                                                    <AccordionIcon />
                                                </AccordionButton>
                                                <AccordionPanel pb={4}>
                                                    <ul>
                                                        {el.subMenu.map((innerEl, i2) => (
                                                            <>
                                                                {states.isAdmin === true ? (
                                                                    <li key={i2 + "sub_menu"} className="hover:bg-[#0000000a] duration-200 rounded-md">
                                                                        <NavLink
                                                                            to={innerEl.path}
                                                                            className={({ isActive }) => (isActive ? "bg-teal-400 block p-2 rounded-md text-white font-semibold" : "block p-2")}
                                                                        >
                                                                            {innerEl.name}
                                                                        </NavLink>
                                                                    </li>
                                                                ) : (
                                                                    !innerEl.onlyAdmin && (
                                                                        <li key={i2 + "sub_menu"} className="hover:bg-[#0000000a] duration-200 rounded-md">
                                                                            <NavLink
                                                                                to={innerEl.path}
                                                                                className={({ isActive }) => (isActive ? "bg-teal-400 block p-2 rounded-md text-white font-semibold" : "block p-2")}
                                                                            >
                                                                                {innerEl.name}
                                                                            </NavLink>
                                                                        </li>
                                                                    )
                                                                )}
                                                            </>
                                                        ))}
                                                    </ul>
                                                </AccordionPanel>
                                            </AccordionItem>
                                        </Accordion>
                                    )
                                )}
                            </>
                        ) : (
                            <>
                                {states.isAdmin === true ? (
                                    <li key={i1 + "sidebar"} className="hover:bg-[#0000000a] duration-200 rounded-md">
                                        <NavLink to={el.path} className={({ isActive }) => (isActive ? "bg-teal-400 block p-2 rounded-md text-white font-semibold" : "block p-2")}>
                                            {el.name}
                                        </NavLink>
                                    </li>
                                ) : (
                                    !el.onlyAdmin && (
                                        <li key={i1 + "sidebar"} className="hover:bg-[#0000000a] duration-200 rounded-md">
                                            <NavLink to={el.path} className={({ isActive }) => (isActive ? "bg-teal-400 block p-2 rounded-md text-white font-semibold" : "block p-2")}>
                                                {el.name}
                                            </NavLink>
                                        </li>
                                    )
                                )}
                            </>
                        )}
                    </>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;
