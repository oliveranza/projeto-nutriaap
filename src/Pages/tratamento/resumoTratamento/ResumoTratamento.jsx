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
  const [suplementacao, setSuplementacao] = useState([])


  useEffect(()=>{
    api.get(`api/tratamento/${id}`)
    .then((res)=>{
      let anamneses = []
      let antropometricas = []
      let exames = []
      let ge = []
      let suple = []

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
      setSuplementacao(suple)
    })
  },[])

  
  // useEffect(()=>{
  //   api.get(`api/tratamento/anamnese/${id}`)
  //   .then((res)=>{
  //     const anam = res.data
  //     const anam2 = anam.map((anamnese)=>{
  //       return(
  //         {
  //           id: anamnese.id,
  //           titulo: anamnese.titulo,
  //           data:anamnese.data = formatarData(anamnese.data),
  //           tipo: anamnese.tipo,
  //         }
  //       )
  //     })
  //     setAnamnese(anam2)
  //   })
  // },[])

  function formatarData(data){
    return format(new Date(data),"dd/MM/yyyy")
  }
  
  return (
    <div className="resumo-tratamento">
      <Tratamento abaMenu={1} >
        <div className="resumo">
          <MyTable label="Avaliações de Anamnese" value={anamense} colunas={colunas} colWidth={width} edit={true} delete={true} idPaciente={id}/>
          <MyTable label="Avaliações Antropométrica" value={antrpometrica} colunas={colunas} colWidth={width} edit={true} delete={true} idPaciente={id}/>
          <MyTable label="Exames" value={exame} colunas={colunas} colWidth={width} edit={true} delete={true} idPaciente={id}/>
          <MyTable label="Gasto Energetico" value={gastoEnergetico} colunas={colunas} colWidth={width} edit={true} delete={true} idPaciente={id}/>
          <MyTable label="Plano Alimentar" colunas={colunas} colWidth={width} edit={true} delete={true} idPaciente={id}/>
          <MyTable label="Recordatorio Alimentar" colunas={colunas} colWidth={width} edit={true} delete={true} idPaciente={id}/>
          <MyTable label="Suplementação" value={suplementacao} colunas={colunas} colWidth={width} edit={true} delete={true} idPaciente={id}/>
        </div>
      </Tratamento>
    </div>
  );
}
