import "./ResumoTratamento.css";
import "primeflex/primeflex.css";


import Tratamento from "../../../components/tratamento/Tratamento";
import MyTable from "../../../components/myTable/MyTable";
import { useEffect, useState } from "react";
import api from "../../../services/api";
import { useParams } from "react-router";
import { format } from "date-fns";

export default function ResumoTratamento() {
  const example = [
    { id: 1, Titulo: "Linha de exemplo 1", Data: "7-10-2021" },
    { id: 2, Titulo: "Linha de exemplo 2", Data: "8-10-2021" },
    { id: 3, Titulo: "Linha de exemplo 3", Data: "9-10-2021" },
  ];
  const colunas = ["titulo", "data"]
  const width = ["75%","25%"]
  const {id} = useParams()

  const [anamense, setAnamnese] = useState([])


  useEffect(()=>{
    api.get(`api/tratamento/anamnese/${id}`)
    .then((res)=>{
      const anam = res.data
      const anam2 = anam.map((a)=>{
        return(
          {
            id: a.id,
            titulo: a.titulo,
            data:a.data = (format(new Date(a.data),"dd/MM/yyyy")),
            tipo: a.tipo,
          }
        )
      })
      setAnamnese(anam2)
    })
  },[])
  
  return (
    <div className="resumo-tratamento">
      <Tratamento abaMenu={1} >
        <div className="resumo">
          <MyTable label="Avaliações de Anamnese" value={anamense} colunas={colunas} colWidth={width} edit={true} delete={true} idPaciente={id}/>
          <MyTable label="Avaliações Antropométrica" colunas={colunas} colWidth={width} edit={true}idPaciente={id}/>
          <MyTable label="Exames" colunas={colunas} colWidth={width} edit={true}idPaciente={id}/>
          <MyTable label="Gasto Energetico" colunas={colunas} colWidth={width} edit={true}idPaciente={id}/>
          <MyTable label="Plano Alimentar" colunas={colunas} colWidth={width} edit={true}idPaciente={id}/>
          <MyTable label="Recordatorio Alimentar" colunas={colunas} colWidth={width} edit={true}idPaciente={id}/>
          <MyTable label="Suplementação" colunas={colunas} colWidth={width} edit={true}idPaciente={id}/>
        </div>
      </Tratamento>
    </div>
  );
}
