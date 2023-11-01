import { Outlet } from "react-router-dom";
import HeaderAdmin from "../../components/HeaderAdmin";

function Admin(){
    return (
        <>
            <HeaderAdmin />
            <Outlet />
        </>
    );
}

export default Admin;