import "./Recuperacao.css";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Link } from "react-router-dom";
import { useState } from "react";

function Recuperacao() {
  const [email, setEmail]=useState("")

  return (
    <div className="nutriapp-recuperarsenha">
      <div className="CardVertical">
        <div>
          <h1>NUTRIAPP</h1>
        </div>
        <div>
          <h2>Recuperação de Senha</h2>
        </div>
        <div>
          <p>
            Digite seu endereço de e-mail e depois click no botão "Enviar" para
            que possamos lhe enviar um e-mail com as instruções para redefinição
            de senha.
          </p>
        </div>

        <div className="Email">
          <span className="p-float-label p-input-icon-left">
            <i className="pi pi-envelope" id="userIcon" />
            <InputText id="campoEmail" value={email} onChange={e => setEmail(e.target.value)} />
            <label htmlFor="lefticon">E-mail</label>
          </span>
        </div>

        <div className="p-d-flex p-jc-between" id="botoes">
          <div className="p-mr-2">
            <Link to="/login">
              <Button
                id="btcancelar"
                label="Cancelar"
                icon="pi pi-times-circle"
                iconPos="left"
              />
            </Link>
          </div>
          <div className="p-mr-2">
            <Link to="/login">
              <Button label="Enviar" icon="pi pi-send" iconPos="left" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Recuperacao;
