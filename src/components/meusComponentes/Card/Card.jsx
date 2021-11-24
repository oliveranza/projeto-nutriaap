import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { confirmDialog } from "primereact/confirmdialog";
import React, { useEffect, useRef, useState } from "react";
import fotoNutri from "../../../assets/defaultNutri.png";
import fotoAdmin from "../../../assets/defaultAdmin.png";
import fotoPaciente from "../../../assets/defaultPaciente.png";
// import fotoPaciente from "../../../assets/defaultNutri.png"

import "./Card.css";
import api from "../../../services/api";
import { Link } from "react-router-dom";
import { format } from "date-fns";

export default function Card(props) {
  const [foto, setFoto] = useState(fotoAdmin);
  const [endpoint, setEndpoint] = useState("");
  const toast = useRef(null);

  useEffect(() => {
    switch (props.tipoCard) {
      case "nutri":
        setFoto(fotoNutri);
        setEndpoint("nutricionista");
        break;
      case "admin":
        setFoto(fotoAdmin);
        setEndpoint("admin");
        break;
      case "paciente":
        setFoto(fotoPaciente);
        setEndpoint("paciente");
        break;
      default:
        break;
    }
  }, []);

  async function accept(){
    await excluir();
  };

  function reject(msg) {
    toast.current.show({
      severity: "info",
      summary: "Cancelado",
      detail: msg || null,
      life: 5000,
    });
  }

  const confirmDelete = () => {
    confirmDialog({
      header: `Você está prestes a excluir ${props.nome}`,
      message: `Tem certeza que deseja fazer isso?`,
      icon: "pi pi-exclamation-triangle",
      accept,
      reject: () => reject(),
    });
  };

  async function excluir() {
    try {
      let response = await api.delete(`api/${endpoint}/${props.id}`);
      console.log(response.data);
      toast.current.show({
        severity: "error",
        summary: "Excluido",
        detail: `${props.nome} excluido com sucesso.`,
        life: 2000,
      });
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      console.log(`error: ${error}`);
      let er = error.toString();
      if (er==="Error: Request failed with status code 404"){
        reject("Usuário Inexistente no sistema")
      }else{
        reject("Servidor indisponível. Tente de novo mais tarde")
      }
    }
  }

  return (
    <div className="nutriapp-card" key={props.id}>
      <Toast ref={toast} />
      <div className="divFoto">
        <img src={props.foto || foto} alt="foto" className="foto" />
      </div>

      <div className="info">
        <div className="info1">
          <label className="nome">
            Nome: <p>{props.nome || "Fulano"}</p>
          </label>
          <label className="dtNascimento">
            Data Nasc.: 
            <p>
              {format(new Date(props.dtNasc), "dd/MM/yyyy") || "12/12/2000"}
            </p>
          </label>
          <label className="genero">
            Gênero: <p>{props.genero || "Outro"}</p>
          </label>
        </div>

        <div className="info2">
          <label className="telefone">
            Telefone: <p>{props.tel || "(83) 9 9978-2578"}</p>
          </label>
          <label className="email">
            E-mail: <p>{props.email || "fulano@email.com"}</p>
          </label>
          {
            //operador ternario - se for lista(tipoCard) de nutricionista carrega o CRN
            props.tipoCard === "nutri" ? (
              <label className="crn">
                CRN: <p> {props.crn || "1 23456/x"} </p>
              </label>
            ) : //se for lista de pacientes carrega o Status ao inves de CRN
            //ainda em caso de ser paciente outro operador ternario, se for ativo(true) muda o style da tag p para ficar o texto verde, se for inativo(false) muda pra vermelho
            props.tipoCard === "paciente" ? (
              <label className="status">
                Status: 
                <p
                  style={
                    props.status
                      ? { color: "lime", fontWeight: "bold" }
                      : { color: "red", fontWeight: "bold" }
                  }
                >
                  {" "}
                  {props.status ? "Ativo" : "Inativo" || "unknown"}{" "}
                </p>
              </label>
            ) : (
              //e se Admin deixa o campo em branco
              ""
            )
          }
        </div>
      </div>

      <div className="botoes">
        <div className="btGrande">
          {props.tipoCard === "paciente" ? (
            <Link to={`paciente/tratamento/${props.id}`}>
              {" "}
              <Button
                id="btTratamento"
                label="Tratamento"
                icon="pi pi-heart"
                iconPos="left"
                data-toggle="tooltip"
                title={`Ver tratamento de ${props.nome}`}
              />
            </Link>
          ) : (
            <Button
              id="btDesempenho"
              label="Desempenho"
              icon="pi pi-chart-line"
              iconPos="left"
              data-toggle="tooltip"
              title={`Ver desempenho de ${props.nome}`}
            />
          )}

          <Button
            id="btEmail"
            label="E-mail"
            icon="pi pi-envelope"
            iconPos="left"
            data-toggle="tooltip"
            title={`Enviar e-mail para ${props.nome}`}
          />
        </div>

        <div className="btPequeno">
          <Link
            to={
              props.tipoCard === "nutri"
                ? `nutri/${props.id}`
                : props.tipoCard === "admin"
                ? `admin/${props.id}`
                : `paciente/${props.id}`
            }
          >
            <Button
              id="btPerfil"
              icon="pi pi-user"
              iconPos="left"
              data-toggle="tooltip"
              title="Editar"
            />
          </Link>

          <Button
            id="btApagar"
            icon="pi pi-user-minus"
            iconPos="left"
            onClick={confirmDelete}
            data-toggle="tooltip"
            title="Excluir"
          />
        </div>
      </div>
    </div>
  );
}
