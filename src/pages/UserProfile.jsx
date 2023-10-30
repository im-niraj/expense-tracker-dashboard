import { Button, useToast } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiFillHome } from "react-icons/ai";
import { Link, useParams } from "react-router-dom";
import { dateToLocalDateTime } from "../utils/dateConverter";
import { clearAuth } from "../redux/slices/userInfoSlice";
import { useDispatch } from "react-redux";
import Chart from "react-apexcharts";

const UserProfile = ({ states }) => {
    const { userId } = useParams();
    const dispatch = useDispatch();
    const toast = useToast();

    const options = {
        xaxis: {
            categories: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
    };
    const series = [
        {
            name: "series-1",
            data: [30, 40, 25, 50, 49, 21, 70, 51],
        },
        {
            name: "series-2",
            data: [23, 12, 54, 61, 32, 56, 81, 19],
        },
        {
            name: "series-3",
            data: [24, 20, 5, 75, 42, 79, 72, 35],
        },
    ];
    useEffect(() => {
        // getUserInfo();
    }, []);
    return (
        <div className="p-2">
            <Link to={"/"}>
                <Button size={"sm"} className="mb-2" rounded={2} colorScheme="messenger" leftIcon={<AiFillHome />}>
                    Home
                </Button>
            </Link>

            <div>
                <Chart height={320} options={options} series={series} type="bar" />
            </div>
        </div>
    );
};

export default UserProfile;
