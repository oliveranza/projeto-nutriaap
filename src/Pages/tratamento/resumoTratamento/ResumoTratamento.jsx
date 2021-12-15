import "./ResumoTratamento.css";
import "primeflex/primeflex.css";


import Tratamento from "../../../components/tratamento/Tratamento";
import MyTable from "../../../components/myTable/MyTable";
import { useEffect, useState } from "react";
import api from "../../../services/api";
import { useParams } from "react-router";
import { format } from "date-fns";

export default function ResumoTratamento() {

  const colunas = ["titulo", "data"]
  const width = ["75%","25%"]
  const {id} = useParams()

  const [anamense, setAnamnese] = useState([])
  const [antrpometrica, setAntropometrica] = useState([])
  const [exame, setExame] = useState([])
  const [gastoEnergetico, setGastoEnergetico] = useState([])
  const [planoAlimentar, setPlanoAlimentar] = useState([])
  const [recordatorioAlimentar, setRecordatorioAlimentar] = useState([])
  const [suplementacao, setSuplementacao] = useState([])


  useEffect(()=>{
    api.get(`api/tratamento/${id}`)
    .then((res)=>{
      let anamneses = []
      let antropometricas = []
      let exames = []
      let ge = []
      let suple = []
      let pa = []
      let ra = []

      const avaliacoes = res.data

      avaliacoes.forEach((ava)=>{
        const ava1 ={
          id: ava.id,
          titulo: ava.titulo,
          data:ava.data = formatarData(ava.data),
          tipo: ava.tipo,
        }
        switch (ava1.tipo) {
          case "anamnese":
            anamneses.push(ava1)
            break;
          case "antropometrica":
            antropometricas.push(ava1)
            break;
          case "exame":
            exames.push(ava1)
            break;
          case "gastoEnergetico":
            ge.push(ava1)
            break;
          case "planoAlimentar":
            pa.push(ava1)
            break;
          case "recordatorioAlimentar":
            ra.push(ava1)
            break;
          case "suplementacao":
            suple.push(ava1)
            break;
          default:
            break;
        }
        
      })
      setAnamnese(anamneses)
      setAntropometrica(antropometricas)
      setExame(exames)
      setGastoEnergetico(ge)
      setPlanoAlimentar(pa)
      setRecordatorioAlimentar(ra)
      setSuplementacao(suple)
    })
  },[])


  function formatarData(data){
    return format(new Date(data),"dd/MM/yyyy")
  }
  
  return (
    <div className="resumo-tratamento">
      <Tratamento abaMenu={1} >
        <div className="resumo">
          <MyTable label="Avaliações de Anamnese" value={anamense} colunas={colunas} colWidth={width} edit={true} delete={true} idPaciente={id} sort="data" ordem={-1}/>
          <MyTable label="Avaliações Antropométrica" value={antrpometrica} colunas={colunas} colWidth={width} edit={true} delete={true} idPaciente={id} sort="data" ordem={-1}/>
          <MyTable label="Exames" value={exame} colunas={colunas} colWidth={width} edit={true} delete={true} idPaciente={id} sort="data" ordem={-1}/>
          <MyTable label="Gasto Energetico" value={gastoEnergetico} colunas={colunas} colWidth={width} edit={true} delete={true} idPaciente={id} sort="data" ordem={-1}/>
          <MyTable label="Plano Alimentar" value={planoAlimentar} colunas={colunas} colWidth={width} edit={true} delete={true} idPaciente={id} sort="data" ordem={-1}/>
          <MyTable label="Recordatorio Alimentar" value={recordatorioAlimentar} colunas={colunas} colWidth={width} edit={true} delete={true} idPaciente={id} sort="data" ordem={-1}/>
          <MyTable label="Suplementação" value={suplementacao} colunas={colunas} colWidth={width} edit={true} delete={true} idPaciente={id} sort="data" ordem={-1}/>
        </div>
      </Tratamento>
    </div>
  );
}
