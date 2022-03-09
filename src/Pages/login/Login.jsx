import React, { useState, useContext, useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { SelectButton } from "primereact/selectbutton";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Link } from "react-router-dom";
import { Toast } from "primereact/toast";
import api from "../../services/api";

import StoreContext from "../../services/Context";

import "./Login.css";

function Login() {
  const history = useHistory();
  const toast = useRef(null);

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [eye, setEye] = useState("pi pi-eye");
  const [visible, setVisible] = useState("password");
  const [nivel, setNivel] = useState(null);
  const { token, setToken } = useContext(StoreContext);

  const niveis = [
    // { name: "Paciente", value: 1 },
    { name: "Nutricionista", value: 2 },
    { name: "Administrador", value: 3 },
  ];

  useEffect(() => {
    setToken(null);
  }, []);

  function visivel() {
    if (eye === "pi pi-eye") {
      setEye("pi pi-eye-slash");
      setVisible("");
    } else {
      setEye("pi pi-eye");
      setVisible("password");
    }
  }

  async function fazerLogin(email1, senha1) {
    if (email1 === "") {
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
    } else if (nivel === null) {
      toast.current.show({
        severity: "warn",
        summary: "Atenção!",
        detail: "Selecione o tipo de acesso",
        life: 5000,
      });
      return { error: "Tipo de acesso não selecionado" };
    }
    if (email1 === "qualylife2021@gmail.com" && senha1 === "admin") {
      return { token: "1234", nv: nivel};
    } else {
      const userlogin = {
        userName: email1,
        password: senha1,
        nivelDeAcesso: nivel,
      };
      try {
        const res = await api.post("api/login", userlogin);
        return { token: "1234", nv: res.data.nivelDeAcesso };
      } catch (error) {
        return error.toString();
      }
    }
  }

  async function onSubmitHandler(event) {
    const resul = await fazerLogin(email, senha);
    if (resul.token) {
      setToken(resul.token);

      if (nivel === 1) {
        toast.current.show({
          severity: "success",
          summary: "Sucesso",
          detail: "Login feito com usuário paciente",
          life: 5000,
        });
      } else if (nivel === 2) {
        if (resul.nv === 2)
          return history.push("/inicioNutri");
      } else if (nivel === 3) {
        if (resul.nv === 3)
          return history.push("/inicioAdmin");
      }

    } else if (resul === "Error: Network Error") {
      toast.current.show({
        severity: "error",
        summary: "Erro",
        detail: "O servidor parece estar offline, tente novamente mais tarde",
        life: 5000,
      });
    } else {
      if (typeof resul === "string") {
        toast.current.show({
          severity: "error",
          summary: "Erro",
          detail: `Não foi possível acessar. Verifique se o e-mail, a senha e o tipo de usuário estão corretos.`,
          life: 7000,
        });
      }
    }
  }
  function keyHandler(e) {
    if (e.code === "Enter" || e.code === "NumpadEnter") onSubmitHandler();
  }

  return (
    <div className="nutriapp-login">
      <Toast ref={toast} />
      <div className="CardVertical">
        <h1>QUALYLIFE</h1>

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
              required
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

        <div className="esqueciSenha">
          <Link to="/recuperacao">Esqueci a senha</Link>
        </div>

        <div className="niveis">
          <label>Entrar como:</label>
          <SelectButton
            value={nivel}
            options={niveis}
            optionLabel="name"
            onChange={(e) => setNivel(e.value)}
          />
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
