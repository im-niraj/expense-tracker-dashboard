import { Button, Input, InputGroup, InputRightElement, Switch, useToast } from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setAuth } from "../redux/slices/userInfoSlice";

const Login = () => {
    const dispatch = useDispatch();
    const toast = useToast();
    const [isAdmin, setIsAdmin] = React.useState(false);
    const [show, setShow] = React.useState(false);
    const handleClick = () => setShow(!show);
    const [loginInfo, setLoginInfo] = useState({
        email: "",
        password: "",
    });

    const loginFn = () => {
        if (loginInfo.email && loginInfo.password) {
            console.log("first");
            if (isAdmin) {
                axios
                    .post("/admin-login", loginInfo)
                    .then((res) => {
                        console.log(res.data);
                        dispatch(setAuth(res.data.data));
                    })
                    .catch((err) => {
                        let message = err.response ? err.response.data.message : err.message;
                        console.log(err);
                        toast({
                            status: "error",
                            position: "top",
                            isClosable: true,
                            description: message,
                        });
                    });
            } else {
                axios
                    .post("/login", loginInfo)
                    .then((res) => {
                        console.log(res.data);
                        dispatch(setAuth(res.data.data));
                    })
                    .catch((err) => {
                        let message = err.response ? err.response.data.message : err.message;
                        console.log(err);
                        toast({
                            status: "error",
                            position: "top",
                            isClosable: true,
                            description: message,
                        });
                    });
            }
        } else {
            toast({
                status: "warning",
                position: "top",
                isClosable: true,
                title: "Email and Password are required for login",
            });
        }
    };

    return (
        <div className="w-full mt-10 flex items-center justify-center">
            <div className="p-2 sm:p-0 w-80">
                <div className="flex items-center justify-between mb-3">
                    <label className="text-sm text-blue-600 font-bold">Login as {isAdmin ? "Admin" : "user"}</label>
                    <Switch colorScheme="messenger" size="md" onChange={(e) => setIsAdmin(e.target.checked)} />
                </div>
                <div className="mb-2">
                    <label className="text-sm font-bold" htmlFor="email">
                        Email ID
                    </label>
                    <Input
                        value={loginInfo.email}
                        onChange={(e) =>
                            setLoginInfo((old) => {
                                return { ...old, email: e.target.value };
                            })
                        }
                        id="email"
                        placeholder="Enter your email"
                    />
                </div>
                <div className="mb-2">
                    <label className="text-sm font-bold" htmlFor="email">
                        Password
                    </label>
                    <InputGroup size="md">
                        <Input
                            value={loginInfo.password}
                            onChange={(e) =>
                                setLoginInfo((old) => {
                                    return { ...old, password: e.target.value };
                                })
                            }
                            pr="4.5rem"
                            type={show ? "text" : "password"}
                            placeholder="Enter password"
                        />
                        <InputRightElement width="4.5rem">
                            <Button h="1.75rem" size="sm" onClick={handleClick}>
                                {show ? "Hide" : "Show"}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                </div>
                <Button colorScheme="whatsapp" onClick={() => loginFn()}>
                    Login
                </Button>
            </div>
        </div>
    );
};

export default Login;
