/* eslint-disable @typescript-eslint/no-explicit-any */
import "./styles.css";
import { useContext, useState } from "react";
import { CredentialsDTO } from "../../../models/auth";
import * as authService from '../../../services/auth-service';
import { useNavigate } from "react-router-dom";
import { ContextToken } from "../../../utils/context-token";

function Login() {

  const { setContextTokenPayload } =  useContext(ContextToken);

  const navigate = useNavigate();

  const [formData, setFormData] = useState<CredentialsDTO>({
    username: "",
    password: "",
  });

  function handleSubmit(event: any) {
    event.preventDefault();
    authService.loginRequest(formData)
        .then(response => {
            authService.saveAccessToken(response.data.access_token)
            setContextTokenPayload(authService.getAccessTokenPayload());
            navigate("/cart")
        })
        .catch(error => {
            console.log("Erro ao efetuar login", error);
        });
  }

  function handleInputChange(event: any){
    const data = event.target.value;
    const name = event.target.name;
    setFormData({...formData, [name]: data})
  }

  return (
    <section id="login-section" className="dsc-container">
      <div className="dsc-login-form-container">
        <form className="dsc-card dsc-form" onSubmit={handleSubmit}>
          <h2>login</h2>
          <div className="dsc-form-controls-container">
            <div>
              <input
                name="username"
                value={formData.username}
                type="email"
                placeholder="Email"
                autoComplete="false"
                className="dsc-form-control"
                onChange={handleInputChange}
              />
              <div className="dsc-form-error"></div>
            </div>
            <div>
              <input
                name="password"
                value={formData.password}
                type="password"
                placeholder="Senha"
                autoComplete="false"
                className="dsc-form-control"
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="dsc-mt20 dsc-login-form-buttons">
            <button type="submit" className="dsc-btn dsc-btn-blue">
              Entrar
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Login;
