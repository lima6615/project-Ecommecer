import "./styles.css";
import { useEffect, useState } from "react";
import { userDTO } from "../../../models/user";
import * as useService from "../../../services/user-service";

function AdminHome() {
  const [user, setUser] = useState<userDTO>();

  useEffect(() => {
    useService.findMe().then((response) => {
      setUser(response.data);
      console.log(response.data);
    });
  }, []);

  return (
    <section id="admin-home-section" className="dsc-container">
      <h2 className="dsc-section-title dsc-mb20">
        Bem-vindo à área administrativa {user?.name}
      </h2>
    </section>
  );
}

export default AdminHome;
