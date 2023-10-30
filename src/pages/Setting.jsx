import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Button,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
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
import React, { useEffect, useState } from "react";
import { AiFillEdit, AiFillHome } from "react-icons/ai";
import { MdAddCircle, MdDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { clearAuth } from "../redux/slices/userInfoSlice";
import axios from "axios";

const Setting = ({ states }) => {
    const toast = useToast();
    const dispatch = useDispatch();
    const [typeList, setTypeList] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const [isTypeDeleteActionOpen, setIsTypeDeleteActionOpen] = useState(false);
    const [isTypeModelLoading, setIsTypeLoading] = useState(false);
    const [isDeleteModelLoading, setIsDeleteModelLoading] = useState(false);
    const [isCreateNewTypeOpen, setIsCreateNewTypeOpen] = useState(false);

    const getAllType = async () => {
        await axios
            .get("/allExpenseType", { headers: { Authorization: "Bearer " + states.token } })
            .then((res) => {
                console.log(res.data);
                setTypeList(res.data.data);
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
    const submitHandler = async (e) => {
        e.preventDefault();
        console.log(e.target);
        let { title } = e.target;
        let data = { title: title.value };
        setIsTypeLoading(true);
        if (selectedId) {
            await axios
                .put("/updateExpenseType/" + selectedId._id, data, { headers: { Authorization: "Bearer " + states.token } })
                .then((res) => {
                    console.log(res.data);
                    toast({
                        isClosable: true,
                        status: "success",
                        description: res.data.message,
                        position: "top",
                    });
                    createTypeCloseHandler();
                    getAllType();
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
        } else {
            await axios
                .post("/addExpenseType", data, { headers: { Authorization: "Bearer " + states.token } })
                .then((res) => {
                    console.log(res.data);
                    toast({
                        isClosable: true,
                        status: "success",
                        description: res.data.message,
                        position: "top",
                    });
                    createTypeCloseHandler();
                    getAllType();
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
        }
        setIsTypeLoading(false);
    };
    const createTypeCloseHandler = () => {
        setIsCreateNewTypeOpen(false);
        setSelectedId(null);
    };
    const deleteFn = async () => {
        setIsDeleteModelLoading(true);
        await axios
            .delete("/deleteExpenseType/" + selectedId._id, { headers: { Authorization: "Bearer " + states.token } })
            .then((res) => {
                console.log(res.data);
                toast({
                    isClosable: true,
                    status: "success",
                    description: res.data.message,
                    position: "top",
                });
                setIsTypeDeleteActionOpen(false);
                setSelectedId(null);
                getAllType();
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
        setIsDeleteModelLoading(false);
    };

    useEffect(() => {
        getAllType();
    }, []);
    return (
        <div className="p-2">
            <div className="flex items-center justify-between">
                <Link to={"/"}>
                    <Button size={"sm"} className="mb-2" rounded={2} colorScheme="messenger" leftIcon={<AiFillHome />}>
                        Home
                    </Button>
                </Link>
                <Button onClick={() => setIsCreateNewTypeOpen(true)} size={"sm"} className="mb-2 whitespace-nowrap" rounded={2} colorScheme="yellow" leftIcon={<MdAddCircle size={20} />}>
                    Create Expense Type
                </Button>
            </div>
            <Modal isOpen={isCreateNewTypeOpen} onClose={() => createTypeCloseHandler()}>
                <ModalOverlay />
                <ModalContent rounded={3}>
                    <ModalHeader fontSize={17}>{selectedId ? "Editing Expense Type" : "Add Expense Type"}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <form onSubmit={submitHandler}>
                            <div>
                                <label className="text-xs font-bold">Expense Type Title</label>
                                <Input name="title" defaultValue={selectedId ? selectedId.title : ""} placeholder="Title" required size={"sm"} />
                            </div>
                            <div className="flex items-center justify-end mt-5">
                                <Button size={"sm"} rounded={1} colorScheme="blue" mr={3} onClick={() => createTypeCloseHandler()}>
                                    Close
                                </Button>
                                <Button isLoading={isTypeModelLoading} loadingText="Please wait" size={"sm"} rounded={1} type="submit" colorScheme="yellow">
                                    Submit
                                </Button>
                            </div>
                        </form>
                    </ModalBody>
                </ModalContent>
            </Modal>
            {selectedId && (
                <AlertDialog
                    isOpen={isTypeDeleteActionOpen}
                    onClose={() => {
                        setIsTypeDeleteActionOpen(false);
                        setSelectedId(null);
                    }}
                >
                    <AlertDialogOverlay>
                        <AlertDialogContent>
                            <AlertDialogHeader fontSize="lg" fontWeight="bold">
                                Type Delete Action
                            </AlertDialogHeader>

                            <AlertDialogBody>Are you sure? You can't undo this action afterwards.</AlertDialogBody>
                            <AlertDialogFooter>
                                <Button
                                    onClick={() => {
                                        setIsTypeDeleteActionOpen(false);
                                        setSelectedId(null);
                                    }}
                                >
                                    Cancel
                                </Button>
                                <Button isLoading={isDeleteModelLoading} loadingText="Please wait..." colorScheme="red" ml={3} onClick={() => deleteFn()}>
                                    Delete
                                </Button>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialogOverlay>
                </AlertDialog>
            )}
            <div className=" bg-gray-50 rounded-sm p-2">
                <h1 className="text-gray-700 font-bold p-4">Expense Types</h1>
                <div className=" bg-white">
                    <Table>
                        <Thead>
                            <Tr>
                                <Th>#</Th>
                                <Th>Title</Th>
                                <Th>Action</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {typeList.length > 0 ? (
                                typeList.map((el, idx) => (
                                    <Tr key={el._id}>
                                        <Td>{idx + 1}</Td>
                                        <Td>{el.title}</Td>
                                        <Td>
                                            <div className="flex items-center space-x-3">
                                                <AiFillEdit
                                                    size={24}
                                                    color="blue"
                                                    cursor={"pointer"}
                                                    onClick={() => {
                                                        setSelectedId(el);
                                                        setIsCreateNewTypeOpen(true);
                                                    }}
                                                />
                                                <MdDelete
                                                    onClick={() => {
                                                        setIsTypeDeleteActionOpen(true);
                                                        setSelectedId(el);
                                                    }}
                                                    size={24}
                                                    color="red"
                                                    cursor={"pointer"}
                                                />
                                            </div>
                                        </Td>
                                    </Tr>
                                ))
                            ) : (
                                <Tr>
                                    <Td colSpan={3}>No record found...</Td>
                                </Tr>
                            )}
                        </Tbody>
                    </Table>
                </div>
            </div>
        </div>
    );
};

export default Setting;
