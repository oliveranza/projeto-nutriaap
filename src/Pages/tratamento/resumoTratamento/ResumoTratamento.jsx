import "./ResumoTratamento.css";
import "primeflex/primeflex.css";


import Tratamento from "../../../components/tratamento/Tratamento";
import MyTable from "../../../components/myTable/MyTable";

export default function ResumoTratamento() {
  const example = [
    { id: 1, Titulo: "Linha de exemplo 1", Data: "7-10-2021" },
    { id: 2, Titulo: "Linha de exemplo 2", Data: "8-10-2021" },
    { id: 3, Titulo: "Linha de exemplo 3", Data: "9-10-2021" },
  ];
  const colunas = ["Titulo", "Data"]
  const width = ["75%", "25%"]

  return (
    <div className="resumo-tratamento">
      <Tratamento abaMenu={1}>
        <div className="resumo">
          <MyTable label="Avaliações de Anamnese" dados={example} colunas={colunas} colWidth={width}/>
          <MyTable label="Avaliações Antropométrica" colunas={colunas} colWidth={width}/>
          <MyTable label="Exames" colunas={colunas} colWidth={width}/>
          <MyTable label="Gasto Energetico" colunas={colunas} colWidth={width}/>
          <MyTable label="Plano Alimentar" colunas={colunas} colWidth={width}/>
          <MyTable label="Recordatorio Alimentar" colunas={colunas} colWidth={width}/>
        </div>
      </Tratamento>
    </div>
  );
}
