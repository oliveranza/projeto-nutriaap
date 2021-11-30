import { Calendar } from "primereact/calendar";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { useState } from "react";
import Tratamento from "../../../components/tratamento/Tratamento";
import { addLocale } from "primereact/api";
import { pt } from "../../../locale/pt.json";
import { Button } from "primereact/button";
import { SelectButton } from "primereact/selectbutton";
// import { MyTable} from "../../../components/myTable/MyTable"

import "./PlanoAlimentar.css";
import { Dropdown } from "primereact/dropdown";
import MyTable from "../../../components/myTable/MyTable";

export default function PlanoAlimentar() {
  const [titulo, setTitulo] = useState();
  const [data, setData] = useState();
  const [dias, setDias] = useState([]);
  const [hora, setHora] = useState();
  const [refeicao, setRefeicao] = useState();
  const [alimento, setAlimento] = useState();
  const [tabela, setTabela] = useState();
  const [observacao, setObservacao] = useState();

  addLocale("pt-br", pt);

  const opcoesDias = [
    { label: "Domingo" },
    { label: "Segunda" },
    { label: "Terça" },
    { label: "Quarta" },
    { label: "Quinta" },
    { label: "Sexta" },
    { label: "Sabado" },
  ];

  const opcoesHoras = opc();

  function opc() {
    let t = [];
    for (let i = 0; i <= 9; i++) {
      t.push({ label: "0" + i + ":00", key:i });
      t.push({ label: "0" + i + ":30",key:i });
    }
    for (let i = 10; i <= 23; i++) {
      t.push({ label: +i + ":00",key:i });
      t.push({ label: +i + ":30",key:i });
    }
    return t;
  }
  const opcoesRefeicao = [
    { label: "Café da manhã" },
    { label: "Lanche do dia" },
    { label: "Brunch" },
    { label: "Almoço" },
    { label: "Lanche da Tarde" },
    { label: "Jantar" },
    { label: "Pré-treino" },
    { label: "Pós-treino" },
    { label: "Refeição intermitente" },
  ];

  const colunas = ["Hora", "Refeição", "Alimentos"];
  const width = ["10%", "20%", "70%"];

  function add(){

  }

  function salvar() {}

  return (
    <>
      <Tratamento abaMenu={6}>
        <div className="planoAlimentar">
          <form className="formulario" onSubmit={salvar}>
            <div className="p-fluid p-formgrid p-grid">
              <div className="p-field p-col-12 p-md-9">
                <label htmlFor="titulo">Título</label>
                <InputText
                  id="titulo"
                  type="text"
                  placeholder="Digite o título desta avaliação"
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  required
                  minLength="2"
                  maxLength="25"
                />
              </div>

              <div className="p-field p-col-12 p-md-3">
                <label htmlFor="data">Data</label>
                <Calendar
                  id="data"
                  value={data}
                  dateFormat="dd/mm/yy"
                  locale="pt-br"
                  monthNavigator
                  mask="99/99/9999"
                  placeholder={"Data"}
                  showIcon
                  icon="pi pi-calendar"
                  onChange={(e) => setData(e.target.value)}
                  required
                />
              </div>
              <div className="p-field p-col-12 p-md-12">
                <label htmlFor="dias">Dias da semana</label>
                <SelectButton
                  className="dias"
                  value={dias}
                  options={opcoesDias}
                  onChange={(e) => setDias(e.target.value)}
                  multiple="true"
                  tooltip="Selecione os dias para este plano alimentar"
                  tooltipOptions={{
                    position: "bottom",
                    showDelay: 700,
                    hideDelay: 200,
                  }}
                ></SelectButton>
              </div>

              <div className="p-field p-col-12 p-md-4">
                <label htmlFor="horario">Horário</label>
                <Dropdown
                  id="horario"
                  value={hora}
                  options={opcoesHoras}
                  placeholder="Hora"
                  onChange={(e) => setHora(e.target.value)}
                  required
                />
              </div>
              <div className="p-field p-col-12 p-md-6">
                <label htmlFor="refeicao">Titulo da refeição</label>
                <Dropdown
                  id="refeicao"
                  value={refeicao}
                  options={opcoesRefeicao}
                  placeholder="Selecione a refeicao"
                  onChange={(e) => setRefeicao(e.target.value)}
                  required
                />
              </div>

              <div className="p-field p-col-12 p-md-2" id="divBt">
                <Button
                  type="submit"
                  id="btAdd"
                  label="Adicionar Refeição"
                  icon="pi pi-plus"
                  iconPos="top"
                  autoFocus
                ></Button>
              </div>

              <div className="p-field p-col-12 p-md-10">
                <label htmlFor="alimentos">Alimentos</label>
                <InputText
                  id="alimentos"
                  type="text"
                  placeholder="Digite os alimentos desta refeição"
                  value={alimento}
                  onChange={(e) => setAlimento(e.target.value)}
                  required
                  minLength="2"
                  maxLength="25"
                />
              </div>
              

              <div className="p-field p-col-12 p-md-12">
                <MyTable
                  label="Tabela"
                  dados={tabela}
                  colunas={colunas}
                  colWidth={width}
                />
              </div>

              <div className="p-field p-col-12 p-md-12">
                <label htmlFor="observacoes">Observações</label>
                <InputTextarea
                  id="observacoes"
                  type="text"
                  placeholder="Espaço reservado para observações"
                  value={observacao}
                  onChange={(e) => setObservacao(e.target.value)}
                  autoResize="false"
                />
              </div>
              
              <div className="botoes">
                <Button
                  type="submit"
                  id="btSalvar"
                  label="Salvar"
                  icon="pi pi-save"
                  iconPos="left"
                  autoFocus
                ></Button>
              </div>
            </div>
          </form>
        </div>
      </Tratamento>
    </>
  );
}
