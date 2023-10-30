import { useSelector } from "react-redux";
import Header from "./component/Header";
import { ProtectedRoute } from "./Routes";
import Login from "./pages/Login";
import axios from "axios";
import { useEffect } from "react";

function App() {
    axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
    const states = useSelector((state) => state);
    useEffect(() => {}, [states.token]);
    return (
        <div className="font-poppins">
            <Header states={states} />
            {states.token ? <ProtectedRoute states={states} /> : <Login />}
        </div>
    );
}

export default App;
