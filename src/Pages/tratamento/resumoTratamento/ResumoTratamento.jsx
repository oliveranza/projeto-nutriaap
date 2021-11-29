import "./ResumoTratamento.css";
import "primeflex/primeflex.css";


import Tratamento from "../../../components/tratamento/Tratamento";
import TabelaTratamento from "../../../components/tabelaTratamento/TabelaTratamento";

export default function ResumoTratamento() {
  const example = [
    { id: 1, titulo: "Linha de exemplo 1", data: "7-10-2021" },
    { id: 2, titulo: "Linha de exemplo 2", data: "8-10-2021" },
    { id: 3, titulo: "Linha de exemplo 3", data: "9-10-2021" },
  ];

  return (
    <div className="resumo-tratamento">
      <Tratamento abaMenu={1}>
        <div className="resumo">
          <TabelaTratamento titulo="Avaliações de Anamnese" dados={example} />
          <TabelaTratamento titulo="Avaliações Antropométrica" />
          <TabelaTratamento titulo="Exames" />
          <TabelaTratamento titulo="Gasto Energetico" />
          <TabelaTratamento titulo="Plano Alimentar" />
          <TabelaTratamento titulo="Recordatorio Alimentar" />
          <TabelaTratamento titulo="Teste" />
        </div>
      </Tratamento>
    </div>
  );
}
