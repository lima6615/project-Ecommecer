import { Outlet } from "react-router-dom";
import HeaderClient from "../../components/HeaderClient";

function ClientHome() {
  return (
    <>
      <HeaderClient />
      <Outlet />
    </>
  );
}

export default ClientHome;
