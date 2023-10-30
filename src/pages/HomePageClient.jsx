import { Avatar, Button, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Select, Table, Tbody, Td, Th, Thead, Tr, useToast } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiFillHome } from "react-icons/ai";
import { MdAddCircle } from "react-icons/md";
import { Link } from "react-router-dom";
import Chart from "react-apexcharts";
import { useDispatch } from "react-redux";
import { clearAuth } from "../redux/slices/userInfoSlice";
import { dateToLocalDateOnly } from "../utils/dateConverter";

const HomepageClient = ({ states }) => {
    const toast = useToast();
    const [typeList, setTypeList] = useState([]);
    const [expensesList, setExpenses] = useState([]);
    const dispatch = useDispatch();
    const [series, setSeries] = useState([]);
    const [options, setOptions] = useState({
        xaxis: { categories: [] },
    });
    const [isAddExpenseModelOpen, setIsAddExpenseModelOpen] = useState(false);
    const [isAddExpenseLoading, setIsAddExpenseLoading] = useState(false);
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

    const getAllExpense = async () => {
        await axios
            .get("/getExpense/" + states.accId, { headers: { Authorization: "Bearer " + states.token } })
            .then((res) => {
                console.log(res.data);
                let obj = {};
                for (let x of res.data.data) {
                    console.log(x.expenseType.title);
                    if (obj.hasOwnProperty(x.expenseType.title)) {
                        obj[x.expenseType.title] += x.expenseAmount;
                    } else {
                        obj[x.expenseType.title] = x.expenseAmount;
                    }
                }
                let arr = [];
                let opt = [];
                for (let x of Object.keys(obj)) {
                    console.log(x, obj[x]);
                    arr.push(obj[x]);
                    opt.push(x);
                }
                setSeries([{ data: arr }]);
                setOptions({ xaxis: { categories: opt } });
                setExpenses(res.data.data);
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
        let { expenseId, date, amount } = e.target;
        let data = {
            expenseTypeId: expenseId.value,
            expenseAmount: amount.value,
            date: date.value,
        };
        setIsAddExpenseLoading(true);
        await axios
            .post("/addExpense/" + states.accId, data, { headers: { Authorization: "Bearer " + states.token } })
            .then((res) => {
                console.log(res.data);
                toast({
                    isClosable: true,
                    status: "success",
                    description: res.data.message,
                    position: "top",
                });
                getAllExpense();
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
        setIsAddExpenseLoading(false);
    };
    const getTotalExpense = () => {
        let amt = 0;
        for(let x of expensesList){
            amt += x.expenseAmount;
        }
        return amt;
    }

    const addCloseHandler = () => {
        setIsAddExpenseModelOpen(false);
    };

    useEffect(() => {
        getAllType();
        getAllExpense();
    }, []);

    return (
        <div className="p-2">
            <div className="flex items-center justify-between">
                <Link to={"/"}>
                    <Button size={"sm"} className="mb-2" rounded={2} colorScheme="messenger" leftIcon={<AiFillHome />}>
                        Home
                    </Button>
                </Link>
                <Button onClick={() => setIsAddExpenseModelOpen(true)} size={"sm"} className="mb-2 whitespace-nowrap" rounded={2} colorScheme="yellow" leftIcon={<MdAddCircle size={20} />}>
                    Add Expense
                </Button>
            </div>
            {typeList && typeList.length > 0 && (
                <Modal isOpen={isAddExpenseModelOpen} onClose={() => addCloseHandler()}>
                    <ModalOverlay />
                    <ModalContent rounded={3}>
                        <ModalHeader fontSize={17}>Add Expense</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <form onSubmit={submitHandler}>
                                <div>
                                    <label className="text-xs font-bold">Expense Type</label>
                                    <Select name="expenseId" required size={"sm"} placeholder="-Select-">
                                        {typeList.map((el) => (
                                            <option key={el._id} value={el._id}>
                                                {el.title}
                                            </option>
                                        ))}
                                    </Select>
                                </div>
                                <div className="mt-3">
                                    <label className="text-xs font-bold">Expense Date</label>
                                    <Input name="date" type="date" required size={"sm"} />
                                </div>
                                <div className="mt-3">
                                    <label className="text-xs font-bold">Expense ₹ Amount</label>
                                    <Input name="amount" placeholder="₹ 00.00" type="number" required size={"sm"} />
                                </div>

                                <div className="flex items-center justify-end mt-5">
                                    <Button size={"sm"} rounded={1} colorScheme="blue" mr={3} onClick={() => addCloseHandler()}>
                                        Close
                                    </Button>
                                    <Button isLoading={isAddExpenseLoading} loadingText="Please wait" size={"sm"} rounded={1} type="submit" colorScheme="yellow">
                                        Submit
                                    </Button>
                                </div>
                            </form>
                        </ModalBody>
                    </ModalContent>
                </Modal>
            )}
            {typeList && typeList.length > 0 ? <Chart height={420} options={options} series={series} type="bar" /> : <p className="text-lg p-3">Loading</p>}
            <div className=" bg-gray-50 rounded-sm p-2">
                <h1 className="text-gray-700 font-bold p-4">All Expenses</h1>
                <div className=" bg-white relative">
                    <div className="absolute -top-6 right-0">
                      {expensesList.length > 0 &&  <p className="text-blue-500">Total Expense : <span className="text-blue-500 font-bold">₹ {getTotalExpense()}</span></p>}
                    </div>
                    <Table size="sm">
                        <Thead>
                            <Tr>
                                <Th>S.No.</Th>
                                <Th>Date</Th>
                                <Th>Expense On</Th>
                                <Th isNumeric>Amount</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {expensesList.length > 0 ? (
                                expensesList.map((el, i) => (
                                    <Tr key={el._id}>
                                        <Td>{i + 1}</Td>
                                        <Td>{dateToLocalDateOnly(el.date)}</Td>
                                        <Td>{el.expenseType.title}</Td>
                                        <Td isNumeric>₹ {el.expenseAmount}</Td>
                                    </Tr>
                                ))
                            ) : (
                                <Tr>
                                    <Td colSpan={4}>No record found...</Td>
                                </Tr>
                            )}
                        </Tbody>
                    </Table>
                </div>
            </div>
        </div>
    );
};

export default HomepageClient;
