import "./Recuperacao.css";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Link, useHistory } from "react-router-dom";
import { useRef, useState } from "react";
import { Toast } from "primereact/toast";
import api from "../../services/api";
import { SelectButton } from "primereact/selectbutton";

function Recuperacao() {
  const [email, setEmail] = useState("");
  const [nivel, setNivel] = useState(null);
  
  const toast = useRef(null);
  const history = useHistory();

  const niveis = [
    // { name: "Paciente", value: 1 },
    { name: "Nutricionista", value: 2 },
    { name: "Administrador", value: 3 },
  ];

  async function recuperar() {
    if (email === "") {
      toast.current.show({
        severity: "warn",
        summary: "Atenção",
        detail: "Preencha o campo e-mail",
        life: 5000,
      });
    } else {
      try {
        const res = await api.post("api/recuperarSenha", { userName: email, nivelDeAcesso: nivel });
        if (res.status === 200) {
          console.log(res);
          toast.current.show({
            severity: "success",
            summary: "Sucesso",
            detail: "Um e-mail com uma nova senha foi enviado para você",
            life: 5000,
          });
          setTimeout(() => {
            history.push("/login")
          }, 2000);
        }
      } catch (error) {
        if (error.toString() === "Error: Network Error") {
          {
            toast.current.show({
              severity: "error",
              summary: "Erro",
              detail:
                "O servidor parece estar offline, tente novamente mais tarde",
              life: 5000,
            });
          }
        } else {
          {
            toast.current.show({
              severity: "error",
              summary: "Erro",
              detail: "E-mail inválido para este tipo de conta",
              life: 5000,
            });
          }
        }
      }
    }
  }

  return (
    <div className="nutriapp-recuperarsenha">
      <Toast ref={toast} />
      <div className="CardVertical">
        <div>
          <h1>QUALYLIFE</h1>
        </div>
        <div>
          <h2>Recuperação de Senha</h2>
        </div>
        <div>
          <p>
            Digite seu endereço de e-mail usado para fazer login, depois clique
            no botão "<strong>Enviar</strong>". Em seguida nós lhe enviaremos um
            e-mail com uma nova senha de acesso ao sistema.
          </p>
        </div>

        <div className="Email">
          <span className="p-float-label p-input-icon-left">
            <i className="pi pi-envelope" id="userIcon" />
            <InputText
              id="campoEmail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="lefticon">E-mail</label>
          </span>
        </div>
          <div className="niveis">
            <label>Tipo de acesso da conta:</label>
            <SelectButton
              value={nivel}
              options={niveis}
              optionLabel="name"
              onChange={(e) => setNivel(e.value)}
            />
          </div>

        <div className="p-d-flex p-jc-between" id="botoes">
          <Link to="/login">
            <Button
              id="btcancelar"
              label="Cancelar"
              icon="pi pi-times-circle"
              iconPos="left"
            />
          </Link>
          <Button
            label="Enviar"
            icon="pi pi-send"
            iconPos="left"
            onClick={(e) => recuperar()}
          />
        </div>
      </div>
    </div>
  );
}

export default Recuperacao;
