import React, { useState, useContext, useRef } from "react";
import { useHistory } from "react-router-dom";

import { InputText } from "primereact/inputtext";
import { InputSwitch } from "primereact/inputswitch";
import { Button } from "primereact/button";
import { Link } from "react-router-dom";
import { Toast } from "primereact/toast";

import StoreContext from "../../../services/Context";

import "./Login.css";

function Login() {
  const history = useHistory();
  const toast = useRef(null);

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [valor, setState] = useState(false);
  const [eye, setEye] = useState("pi pi-eye");
  const [visible, setVisible] = useState("password");
  const { token1, setToken } = useContext(StoreContext);

  function visivel() {
    if (eye === "pi pi-eye") {
      setEye("pi pi-eye-slash");
      setVisible("");
    } else {
      setEye("pi pi-eye");
      setVisible("password");
    }
  }

  function fazerLogin(email1, senha1) {
    if (email1 === "admin" && senha1 === "admin") {
      toast.current.show({
        severity: "success",
        summary: "Fazendo login",
        life: 5000,
      });
      return { token: "1234" };
    } else if (email1 === "") {
      toast.current.show({
        severity: "warn",
        summary: "Atenção!",
        detail: "O campo de e-mail é obrigatorio",
        life: 5000,
      });
      return { error: "Email invalidos" };
    } else if (senha1 === "") {
      toast.current.show({
        severity: "warn",
        summary: "Atenção!",
        detail: "O campo de senha é obrigatorio",
        life: 5000,
      });
      return { error: "Senha invalidos" };
    } else {
      toast.current.show({
        severity: "error",
        summary: "Erro",
        detail: "E-mail e/ou senha inválidos",
        life: 5000,
      });
      return { error: "Email e/ou senha invalidos" };
    }
  }

  function onSubmitHandler(event) {
    const { token } = fazerLogin(email, senha);
    if (token) {
      setToken(token);
      console.log(token1);
      setTimeout(() => {
        return history.push("/inicioAdmin");
      }, 600);
    } else {
      setSenha("");
    }
  }
  function keyHandler(e) {
    if (e.code === "Enter" || e.code === "NumpadEnter") onSubmitHandler();
  }

  return (
    // setToken(null),
    <div className="nutriapp-login">
      <Toast ref={toast} />
      <div className="CardVertical">
        <h1>NUTRIAPP</h1>

        <div className="Logo">
          {/* <img alt="logo" src=""> NUTRIAPP</img> */}
        </div>

        <div className="Email">
          <span className="p-float-label p-input-icon-left p-input-icon-right">
            <i className="pi pi-user" id="userIcon" />
            <i />
            <InputText
              id="campoemail"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="campoemail">E-mail</label>
          </span>
        </div>

        <div className="Senha">
          <span className="p-float-label p-input-icon-left p-input-icon-right">
            <i className="pi pi-lock" id="senhaIcon" />
            <InputText
              id="camposenha"
              type={visible}
              value={senha}
              onKeyDown={(e) => keyHandler(e)}
              onChange={(e) => setSenha(e.target.value)}
            />
            <i>
              <button
                className={eye}
                id="eyeIcon"
                onClick={(e) => visivel()}
                style={{ background: "none", border: "none" }}
              />
            </i>
            <label htmlFor="lefticon">Senha</label>
          </span>
        </div>

        <div className="DivChave">
          <label htmlFor="chave">Funcionário</label>
          <InputSwitch
            id="chave"
            checked={valor}
            onChange={(e) => setState(!valor)}
          />
        </div>
        <div className="esqueciSenha">
          <Link to="/recuperacao">Esqueci a senha</Link>
        </div>

        <div className="Botao">
          <Button
            id="bt"
            label="Entrar"
            icon="pi pi-sign-in"
            type="submit"
            onClick={onSubmitHandler}
            iconPos="left"
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
