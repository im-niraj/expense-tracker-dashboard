import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Badge,
    Button,
    IconButton,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Table,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdSecurity } from "react-icons/md";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { clearAuth } from "../redux/slices/userInfoSlice";
import { AiFillHome, AiOutlineUserAdd } from "react-icons/ai";

const User = ({ states }) => {
    const toast = useToast();
    const dispatch = useDispatch();
    const [userList, setUserList] = useState([]);
    const [isCreateNewUserModelOpen, setIsCreateNewUserOpen] = useState(false);
    const [isCreateNewUserModelLoading, setIsCreateNewUserLoading] = useState(false);
    const [isActivateBtnIsLoading, setIsActivateBtnIsLoading] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isUserBlockActionOpen, setIsUserBlockActionOpen] = useState(false);
    const getAllUser = async () => {
        await axios
            .get("/get-all-user", { headers: { Authorization: "Bearer " + states.token } })
            .then((res) => {
                console.log(res.data);
                setUserList(res.data.data);
            })
            .catch((err) => {
                let message = err.response ? err.response.data.message : err.message;
                console.log(err);
                if (err.response && err.response.status === 401) {
                    dispatch(clearAuth());
                }
                toast({
                    isClosable: true,
                    status: "error",
                    description: message,
                    position: "top",
                });
            });
    };
    const dateToLocalDateTime = (date) => {
        date = new Date(date);
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        let hr = date.getHours();
        let min = date.getMinutes();
        let ampm = hr < 12 ? "AM" : "PM";
        hr = hr % 12;
        hr = hr ? hr : 12;
        hr = hr < 10 ? "0" + hr : hr;
        min = min < 10 ? "0" + min : min;
        day = day < 10 ? "0" + day : day;
        month = month < 10 ? "0" + month : month;
        return `${day}/${month}/${year} ${hr}:${min} ${ampm}`;
    };

    const userActivateDeactivateFn = async () => {
        setIsActivateBtnIsLoading(true);
        await axios
            .put(`/block-user/${selectedUser._id}`, null, { headers: { Authorization: "Bearer " + states.token } })
            .then((res) => {
                toast({
                    isClosable: true,
                    status: "success",
                    description: res.data.message,
                    position: "top",
                });
                getAllUser();
            })
            .catch((err) => {
                console.log(err);
                let message = err.response ? err.response.data.message : err.message;
                if (err.response && err.response.status === 401) {
                    dispatch(clearAuth());
                }
                toast({
                    isClosable: true,
                    status: "error",
                    description: message,
                    position: "top",
                });
            });
        setIsActivateBtnIsLoading(false);
        setIsUserBlockActionOpen(false);
    };
    const submitHandler = async (e) => {
        e.preventDefault();
        console.log(e.target);
        let { name, email, password, mobile } = e.target;
        let data = { name: name.value, email: email.value, password: password.value, mobile: mobile.value };
        setIsCreateNewUserLoading(true);
        await axios
            .post("/create-user", data, { headers: { Authorization: "Bearer " + states.token } })
            .then((res) => {
                console.log(res.data);
                toast({
                    isClosable: true,
                    status: "success",
                    description: res.data.message,
                    position: "top",
                });
                createUserCloseHandler();
                getAllUser();
            })
            .catch((err) => {
                console.log(err);
                let message = err.response ? err.response.data.message : err.message;
                if (err.response && err.response.status === 401) {
                    dispatch(clearAuth());
                }
                toast({
                    isClosable: true,
                    status: "error",
                    description: message,
                    position: "top",
                });
            });
        setIsCreateNewUserLoading(false);
    };
    const createUserCloseHandler = () => {
        setIsCreateNewUserOpen(false);
    };

    useEffect(() => {
        getAllUser();
    }, []);

    return (
        <div className="p-2">
            <div className="flex items-center justify-between">
                <Link to={"/"}>
                    <Button size={"sm"} className="mb-2" rounded={2} colorScheme="messenger" leftIcon={<AiFillHome />}>
                        Home
                    </Button>
                </Link>
                <Button onClick={() => setIsCreateNewUserOpen(true)} size={"sm"} className="mb-2" rounded={2} colorScheme="yellow" leftIcon={<AiOutlineUserAdd size={20} />}>
                    Create User
                </Button>
            </div>
            <Modal isOpen={isCreateNewUserModelOpen} onClose={() => createUserCloseHandler()}>
                <ModalOverlay />
                <ModalContent rounded={3}>
                    <ModalHeader fontSize={17}>Create New User</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <form onSubmit={submitHandler}>
                            <div>
                                <label className="text-xs font-bold">Name</label>
                                <Input name="name" required size={"sm"} />
                            </div>
                            <div className="mt-2">
                                <label className="text-xs font-bold">Email</label>
                                <Input name="email" type="email" required size={"sm"} />
                            </div>
                            <div className="mt-2">
                                <label className="text-xs font-bold">Password</label>
                                <Input name="password" required size={"sm"} />
                            </div>
                            <div className="mt-2">
                                <label className="text-xs font-bold">Mobile</label>
                                <Input name="mobile" size={"sm"} />
                            </div>
                            <div className="flex items-center justify-end mt-5">
                                <Button size={"sm"} rounded={1} colorScheme="blue" mr={3} onClick={() => createUserCloseHandler()}>
                                    Close
                                </Button>
                                <Button isLoading={isCreateNewUserModelLoading} loadingText="Please wait" size={"sm"} rounded={1} type="submit" colorScheme="yellow">
                                    Submit
                                </Button>
                            </div>
                        </form>
                    </ModalBody>
                </ModalContent>
            </Modal>
            {selectedUser && (
                <AlertDialog
                    isOpen={isUserBlockActionOpen}
                    onClose={() => {
                        setIsUserBlockActionOpen(false);
                        setSelectedUser(null);
                    }}
                >
                    <AlertDialogOverlay>
                        <AlertDialogContent>
                            <AlertDialogHeader fontSize="lg" fontWeight="bold">
                                Customer Action
                            </AlertDialogHeader>

                            <AlertDialogBody>
                                Are you want to <span className="font-bold">{selectedUser.isBlocked ? "Activate" : "Block"}</span> this user
                            </AlertDialogBody>

                            <AlertDialogFooter>
                                <Button
                                    onClick={() => {
                                        setIsUserBlockActionOpen(false);
                                        setSelectedUser(null);
                                    }}
                                >
                                    Cancel
                                </Button>
                                <Button isLoading={isActivateBtnIsLoading} loadingText="Please wait..." colorScheme="red" ml={3} onClick={() => userActivateDeactivateFn()}>
                                    {selectedUser.isBlocked ? "Activate" : "Block"} User
                                </Button>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialogOverlay>
                </AlertDialog>
            )}
            <div className="bg-teal-300 p-2 mb-2 rounded shadow-sm  flex items-center justify-between">
                <h1 className="font-bold">All users</h1>
            </div>
            <div className="w-full overflow-x-auto">
                <Table size="sm">
                    <Thead>
                        <Tr>
                            <Th>S.No.</Th>
                            <Th>Name</Th>
                            <Th>Email</Th>
                            <Th>Password</Th>
                            <Th>Mobile</Th>
                            <Th>Acc. Status</Th>
                            <Th isNumeric>Action</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {userList.length > 0 ? (
                            userList.map((el, sl) => (
                                <Tr key={el._id} _even={{ backgroundColor: "teal.50" }}>
                                    <Td>{sl + 1}</Td>
                                    <Td>
                                        <Link className="text-blue-600" to={"/user/" + el._id}>
                                            {el.name ? el.name : "n/a"}
                                        </Link>
                                    </Td>
                                    <Td>{el.email && el.email}</Td>
                                    <Td>{el.password && el.password}</Td>
                                    <Td>{el.mobile && el.mobile}</Td>
                                    <Td>{el.isBlocked ? <Badge colorScheme="red">Blocked</Badge> : <Badge colorScheme="green">Active</Badge>}</Td>
                                    <Td isNumeric>
                                        <IconButton
                                            colorScheme="orange"
                                            icon={<MdSecurity />}
                                            size={"xs"}
                                            onClick={(e) => {
                                                setIsUserBlockActionOpen(true);
                                                setSelectedUser(el);
                                            }}
                                        />
                                    </Td>
                                </Tr>
                            ))
                        ) : (
                            <Tr>
                                <Td colSpan={6}>No record found...</Td>
                            </Tr>
                        )}
                    </Tbody>
                </Table>
            </div>
        </div>
    );
};

export default User;
