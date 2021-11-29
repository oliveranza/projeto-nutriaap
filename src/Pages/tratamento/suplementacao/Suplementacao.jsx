import { Calendar } from "primereact/calendar";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { useState } from "react";
import Tratamento from "../../../components/tratamento/Tratamento";
import { addLocale } from "primereact/api";
import { pt } from "../../../locale/pt.json";
import { Button } from "primereact/button";
import { MultiSelect } from "primereact/multiselect";
import { Chips } from "primereact/chips";

import { suple } from "../../../util/suplementos.json";
import { fitoterap } from "../../../util/fitoterapicos.json";
import "./Suplementacao.css";

export default function Suplementacao() {
  function salvar() {}

  const [titulo, setTitulo] = useState();
  const [data, setData] = useState();
  const [descricao, setDescricao] = useState();
  const [suplementos, setSuplementos] = useState([]);
  const [suplementos2, setSuplementos2] = useState([]);
  const [fitoterapicos, setFitoterapicos] = useState([]);
  const [fitoterapicos2, setFitoterapicos2] = useState([]);
  const [posologia, setPosologia] = useState();

  addLocale("pt-br", pt);

  const protocolos = [
    { label: "EER/IOM - 2005" },
    { label: "FAO/OMS - 1985" },
    { label: "FAO/OMS - 2001" },
    { label: "Harris & Benedict - 1919" },
    { label: "Henry & Rees - 1991" },
    { label: "Katch-McArdle - 1996" },
    { label: "Mifflin-St Jeor - 1990" },
    { label: "Schofield - 1985" },
  ];

  function mudarSuple(e) {
    setSuplementos(e);
    const b = e.map((item) => item.name);
    setSuplementos2(b);
  }

  function mudarSuple2(e) {
    setSuplementos2(e);
    let b = [];
    e.map((item) => b.push({ name: item }));
    setSuplementos(b);
  }

  function mudarFito(e) {
    setFitoterapicos(e);
    const b = e.map((item) => item.name);
    setFitoterapicos2(b);
  }

  function mudarFito2(e) {
    setFitoterapicos2(e);
    let b = [];
    e.map((item) => b.push({ name: item }));
    setFitoterapicos(b);
  }

  const template = () => {
    return [{ name: "" }];
  };

  return (
    <>
      <Tratamento abaMenu={8}>
        <div className="suplementacao">
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
                  maxLength="200"
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
                <label htmlFor="descricao">Descrição</label>
                <InputTextarea
                  id="descricao"
                  type="text"
                  placeholder="Digite a descrição desta solicitados"
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  required="Deve ter uma descriação"
                />
              </div>

              <div className="suplementos">
                  <label id="lbSup" htmlFor="suplementos">Suplementos</label>
                  <Chips className="suplementosChips"
                    readonly={true}
                    value={suplementos2}
                    readOnly={true}
                    placeholder="Selecione os Suplementos clicando no botão ao lado"
                    onChange={(e) => mudarSuple2(e.target.value)}
                  />
                  <MultiSelect id="mt1"className="suplementosMulti"
                    showSelectAll={false}
                    value={suplementos}
                    options={suple}
                    onChange={(e) => mudarSuple(e.target.value)}
                    optionLabel="name"
                    display="chip"
                  />
              </div>

              <div className="fitoterapicos">
                  <label id="lbFit" htmlFor="fitoterapicos">Fitoterapicos</label>
                  <Chips className="fitoterapicosChips"
                    readonly={true}
                    value={fitoterapicos2}
                    readOnly={true}
                    placeholder="Selecione os fitoterapicos clicando no botão ao lado"
                    onChange={(e) => mudarFito2(e.target.value)}
                  />
                  <MultiSelect id="mt2"className="fitoterapicosMulti"
                    showSelectAll={false}
                    value={fitoterapicos}
                    options={fitoterap}
                    onChange={(e) => mudarFito(e.target.value)}
                    optionLabel="name"
                    display="chip"
                  />
              </div>

              

              <div className="p-field p-col-12 p-md-12">
                <label htmlFor="posologia">Posologia</label>
                <InputTextarea
                  id="descricao"
                  type="text"
                  placeholder="Digite os exames a serem solicitados ao paciente"
                  value={posologia}
                  onChange={(e) => setPosologia(e.target.value)}
                  autoResize="false"
                  required="Deve ter uma descriação"
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
