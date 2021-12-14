import { Button } from "primereact/button";
import React, { useState, useEffect} from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import api from "../../services/api";

import "./MenuTratamento.css";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export default function MenuTratamento(props) {
  
  const { id } = useParams();
  const aba = props.aba || 1;
  const selectedStyle = { backgroundColor: "white", color: "#22b2aa", };
  const [paciente, setPaciente] = useState({});
  const [dataNascimento, setDataNascimento]= useState()
  const [dataUltimaConulta, setDataUltimaConsulta]= useState()
  const [dataCadastro, setDataCadastro]= useState()

  useEffect(() => {
    api.get(`api/paciente/${id}`)
      .then((res) => {
        const pac = res.data;
        setPaciente(pac)
        const d1 = converterData(pac.dataNasc)
        setDataNascimento(d1);
        const d2 = converterData(pac.dataUltimaConsulta)
        setDataUltimaConsulta(d2);
        const d3 = converterData(pac.dataCadastro)
        setDataCadastro(d3);
      })
      .catch((erro) => {
        console.log(erro);
      });
  }, []);

  function converterData(data){
    const d1 = new Date(data)
    const d2 = format(d1,"dd 'de' MMMM 'de' yyyy",{locale:ptBR})
    return d2
  }
  

  return (
    <>
      <div className="menuTratamento">
        <div className="texto">
          <label className="paciente">Paciente</label>
          <Link to={`/paciente/${paciente.id}`}>
            <p className="nomePaciente">{paciente.nome +" "+ paciente.sobreNome}</p>
          </Link>
          <label className="paciente">Detalhes</label>
          <p className="nomePaciente">
            {paciente.nome} nasceu em {dataNascimento} ,
            sua última consulta ocorreu em  {dataUltimaConulta}.
          </p>
        </div>

        <div className="botoes">
          <Link to={`/paciente/tratamento/${id}`}>
            <Button
              name="resumo"
              style={aba === 1 ? selectedStyle : {}}
              label="Resumo"
            ></Button>
          </Link>

          <Link to={`/paciente/tratamento/anamnese/${id}`}>
            <Button
              name="anamnese"
              style={aba === 2 ? selectedStyle : {}}
              label="Anamnese"
            ></Button>
          </Link>

          <Link to={`/paciente/tratamento/antropometrica/${id}`}>
          <Button
            name="antropometrica"
            style={aba === 3 ? selectedStyle : {}}
            label="Avaliação Antropométrico"
          ></Button>
          </Link>

          <Link to={`/paciente/tratamento/exame/${id}`}>
          <Button
            name="exames"
            style={aba === 4 ? selectedStyle : {}}
            label="Exames"
          ></Button>
          </Link>

          <Link to={`/paciente/tratamento/gastoEnergetico/${id}`}>
          <Button
            name="gastoEnergetico"
            style={aba === 5 ? selectedStyle : {}}
            label="Gasto Energético"
          ></Button>
          </Link>

          <Link to={`/paciente/tratamento/planoalimentar/${id}`}>
          <Button
            name="planoAlimentar"
            style={aba === 6 ? selectedStyle : {}}
            label="Plano Alimentar"
          ></Button>
          </Link>

          <Link to={`/paciente/tratamento/recordatorioAlimentar/${id}`}>
          <Button
            name="recordatorioAlimentar"
            style={aba === 7 ? selectedStyle : {}}
            label="Recordatório Alimentar"
          ></Button>
          </Link>

          <Link to={`/paciente/tratamento/suplementacao/${id}`}>
          <Button
            name="suplementacao"
            style={aba === 8 ? selectedStyle : {}}
            label="Suplementação"
          ></Button>
          </Link>
        </div>
        <div className="dtCadastro">
            <p>Cadastrado desde {dataCadastro}</p>
        </div>
      </div>
    </>
  );
}
