import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

import "./ListagemPaciente.css";

import BarraDeMenu from "../../components/BarraDeMenu/BarraDeMenu";
import Card from "../../components/Card/Card";
import api from "../../services/api";

function ListagemPaciente() {
  const [paciente, setPaciete] = useState([]);

  /** =================================================================================
   *                            conexão com back
   */

  useEffect(() => {
    api.get("api/paciente/getAll")
      .then((response) => {
        console.log(response.data);
        const d = response.data;
        setPaciete(d);
      })
      .catch((err) => {
        console.log("ops! ocorreu um erro" + err);
      });
  }, []);
  /**====================================================================================== */

  return (
    <div className="nutriapp-ListagemPaciente">
      <BarraDeMenu tab={1} tipo="nutri"/>

      <div className="corpo">
        <div className="header">
          {/* barra de pesquisa*/}
          <div className="divPesquisa">
            <span className="p-input-icon-left">
              <i className="pi pi-search" />
              <InputText
                className="pesquisa"
                placeholder="Digite para pesquisar"
              />
            </span>
          </div>

          <div className="botaocadastro">
            <Link to="/cadastroPaciente">
              <Button
                id="bt"
                label="cadastrar Paciente"
                icon="pi pi-id-card"
                iconPos="left"
                data-toggle="tooltip"
                title="Cadastrar um(a) Novo(a)"
              />
            </Link>
          </div>
        </div>
        <div className="fundobranco">
          {
            //carrega essa mensagem se nao tiver usuários para listar (usando operador ternário)
            paciente.length === 0 ? (
              <h3>
                😅 Nenhum paciente cadastrado. Cadastre agora clicando no botão
                ao lado ➔
              </h3>
            ) : (
              //do contrario preenche os cards com os usuários e exibe na tela
              paciente.map((paciente, i) => (
                <Card
                  tipoCard="paciente"
                  key={i}
                  id={paciente.id}
                  nome={paciente.nome + " " + paciente.sobreNome}
                  dtNasc={paciente.dataNasc}
                  genero={paciente.genero}
                  status={paciente.status}
                  tel={paciente.cell}
                  email={paciente.email}
                />
              ))
            )
          }
        </div>
      </div>
    </div>
  );
}

export default ListagemPaciente;
