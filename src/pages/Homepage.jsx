import React from "react";
import HomePageAdmin from "./HomePageAdmin";
import HomepageClient from "./HomePageClient";

const Homepage = ({ states }) => {
    return <>{states.isAdmin ? <HomePageAdmin states={states} /> : <HomepageClient states={states} />}</>;
};

export default Homepage;
