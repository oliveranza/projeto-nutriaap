import { Calendar } from "primereact/calendar";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { useState } from "react";
import Tratamento from "../../../components/tratamento/Tratamento";
import { addLocale } from "primereact/api";
import { pt } from "../../../locale/pt.json";
import { Button } from "primereact/button";

import "./Anamnese.css";

export default function Anamnese() {
  function salvar() {}

  const [titulo, setTitulo] = useState();
  const [data, setData] = useState();
  const [descricao, setDescricao] = useState();

  addLocale("pt-br", pt);

  return (
    <>
      <Tratamento abaMenu={2}>
        <div className="Anamnese">
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
                  // yearNavigator
                  mask="99/99/9999"
                  // yearRange=":"
                  placeholder={"Data"}
                  showIcon
                  icon="pi pi-calendar"
                  onChange={(e) => setData(e.target.value)}
                  required
                />
              </div>

              <div className="p-field p-col-12 p-md-12">
                <label htmlFor="descricao">Descirção</label>
                <InputTextarea
                  id="descricao"
                  type="text"
                  placeholder="Descreva a avaliação"
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
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
