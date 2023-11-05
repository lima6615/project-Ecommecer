import { Link } from "react-router-dom";
import * as authService from "../../services/auth-service";
import { useContext } from "react";
import { ContextToken } from "../../utils/context-token";

function LoggedUser(){

    const {contextTokenPayload, setContextTokenPayload } =  useContext(ContextToken);
    
    function handleLogoutClick(){
        authService.logout();
        setContextTokenPayload(undefined);
    }

    return (
        contextTokenPayload && authService.isAuthenticated() 
        ? (
            <div className="dsc-logged-user">
                <p>{contextTokenPayload.user_name}</p>
                <span className="dsc-logged-user" onClick={handleLogoutClick}>Sair</span>
            </div>
        )
        : (
            <Link to="/login">Entrar</Link>
        )
    );
}

export default LoggedUser;