import {
    Avatar,
    Menu,
    MenuButton,
    MenuItem,
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    MenuList,
    useDisclosure,
    Button,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionIcon,
    AccordionPanel,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { MdOutlineLogout } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { clearAuth } from "../redux/slices/userInfoSlice";
import { RiMenuLine } from "react-icons/ri";
import Menus from "../utils/Menus";
import { NavLink } from "react-router-dom";

const Header = ({ states }) => {
    const { token, name } = useSelector((state) => state);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = React.useRef();
    const dispatch = useDispatch();
    const logOut = () => {
        dispatch(clearAuth());
    };
    return (
        <div className="flex z-50 items-center justify-between w-full border h-14 px-2 sticky top-0 bg-teal-50">
            <div className="flex items-center space-x-2">
                <RiMenuLine ref={btnRef} size={25} onClick={onOpen} cursor={"pointer"} className="md:hidden" />
                <img src="/logo.png" width={"30px"} alt="expense tracker- srm" />
                <h1 className="font-bold text-gray-600 text-lg">Expense Tracker</h1>
            </div>
            <div className="flex items-center justify-between gap-3">
                {token && <p className="text-xs select-none">Hello, {name}</p>}
                {token && (
                    <Menu>
                        <MenuButton>
                            <Avatar size={"sm"} icon={<AiOutlineUser fontSize="1.5rem" />} />
                        </MenuButton>
                        <MenuList>
                            <h1 className="mx-4 pb-4 font-bold">{name && name}</h1>
                            <MenuItem onClick={() => logOut()}>
                                <MdOutlineLogout fontSize="1.5rem" className="text-gray-600" />
                                <p className="ms-2">Logout</p>
                            </MenuItem>
                        </MenuList>
                    </Menu>
                )}
            </div>
            <Drawer isOpen={isOpen} placement="left" onClose={onClose} finalFocusRef={btnRef}>
                <DrawerOverlay />
                <DrawerContent maxW={"64"}>
                    <DrawerCloseButton />
                    <DrawerHeader>
                        <div className="flex items-center">
                        <img src="/logo.png" width={"30px"} className="mr-2" alt="expense tracker- srm" />
                        <h1 className="font-bold text-gray-600 text-lg">Expense Tracker</h1>
                        </div>
                    </DrawerHeader>
                    <DrawerBody p={2}>
                        <ul className="text-sm">
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
                                                                                        className={({ isActive }) =>
                                                                                            isActive ? "bg-teal-400 block p-2 rounded-md text-white font-semibold" : "block p-2"
                                                                                        }
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
                                                                                        className={({ isActive }) =>
                                                                                            isActive ? "bg-teal-400 block p-2 rounded-md text-white font-semibold" : "block p-2"
                                                                                        }
                                                                                    >
                                                                                        {innerEl.name}
                                                                                    </NavLink>
                                                                                </li>
                                                                            ) : (
                                                                                !innerEl.onlyAdmin && (
                                                                                    <li key={i2 + "sub_menu"} className="hover:bg-[#0000000a] duration-200 rounded-md">
                                                                                        <NavLink
                                                                                            to={innerEl.path}
                                                                                            className={({ isActive }) =>
                                                                                                isActive ? "bg-teal-400 block p-2 rounded-md text-white font-semibold" : "block p-2"
                                                                                            }
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
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </div>
    );
};

export default Header;
