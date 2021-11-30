import { Calendar } from "primereact/calendar";
import { InputText } from "primereact/inputtext";
import { useState } from "react";
import { addLocale } from "primereact/api";
import { pt } from "../../../locale/pt.json";
import { Button } from "primereact/button";
import { Tooltip } from 'primereact/tooltip';
import Tratamento from "../../../components/tratamento/Tratamento";

import "./Antropometrica.css";
import InputMedida from "../../../components/inputMedida/InputMedida";

export default function Antropometrica() {
  const [titulo, setTitulo] = useState();
  const [data, setData] = useState();
  const [altura, setAltura] = useState();
  const [peso, setPeso] = useState();
  const [pesoIdeal, setPesoIdeal] = useState();
  
  const [brd, setBrd] = useState();
  const [bre, setBre] = useState();
  const [bcd, setBcd] = useState();
  const [bce, setBce] = useState();
  const [ad, setAd] = useState();
  const [ae, setAe] = useState();
  const [pd, setPd] = useState();
  const [pe, setPe] = useState();
  const [pesc, setPesc] = useState();
  const [omb, setOmb] = useState();
  const [peit, setPeit] = useState();
  const [cint, setCint] = useState();
  const [abd, setAbd] = useState();
  const [quad, setQuad] = useState();
  const [pantd, setPantd] = useState();
  const [pante, setPante] = useState();
  const [cd, setCd] = useState();
  const [ce, setCe] = useState();
  const [cpd, setCpd] = useState();
  const [cpe, setCpe] = useState();

  addLocale("pt-br", pt);

  function salvar() {}

  return (
    <>
      <Tratamento abaMenu={3}>
        <div className="Antropometrica">
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

              <div className="medidasbasicas">
                <div className="p-field p-col-12 p-md-2">
                  <label htmlFor="altura">Altura</label>
                  <InputText
                    id="altura"
                    type="number"
                    placeholder="Ex. 1.65"
                    value={altura}
                    onChange={(e) => setAltura(e.target.value)}
                    required
                    size="3"
                    step="0.01"
                    min="0"
                    max="3"
                    tooltip="Digite a altura em metros"
                    tooltipOptions={{showDelay: 500, hideDelay: 300, position:'bottom'}}
                  />
                </div>
                <div className="p-field p-col-12 p-md-2">
                  <label htmlFor="peso">Peso</label>
                  <InputText
                    id="peso"
                    type="number"
                    placeholder="Ex. 70kg"
                    value={peso}
                    onChange={(e) => setPeso(e.target.value)}
                    required
                    size="3.00"
                    step="0.005"
                    min="0"
                    max="600"
                    tooltip="Digite o peso em kg"
                    tooltipOptions={{showDelay: 500, hideDelay: 300, position:'bottom'}}
                  />
                </div>
                <div className="p-field p-col-12 p-md-2">
                  <label htmlFor="pesoIdeal">Peso ideal</label>
                  <InputText
                    id="pesoIdeal"
                    type="number"
                    placeholder="Peso Ideal"
                    value={pesoIdeal}
                    onChange={(e) => setPesoIdeal(e.target.value)}
                    required
                    readOnly={true}
                    size="3.00"
                    step="0.005"
                    min="0"
                    max="600"
                    tooltip="Peso ideal"
                    tooltipOptions={{showDelay: 500, hideDelay: 300, position:'bottom'}}
                  />
                </div>
              </div>
               <div className="circunferencia">
                    <InputMedida value={brd} setValue={setBrd} titulo="Braço relaxado (direito)"/>
                    <InputMedida value={bre} setValue={setBre} titulo="Braço relaxado (esquerdo)"/>
                    <InputMedida value={bcd} setValue={setBcd} titulo="Braço contraido (direito)"/>
                    <InputMedida value={bce} setValue={setBce} titulo="Braço contraido (esquerdo)"/>
                    <InputMedida value={ad} setValue={setAd} titulo="Antebraço (direito)"/>
                    <InputMedida value={ae} setValue={setAe} titulo="Antebraço (esquerdo)"/>
                    <InputMedida value={pd} setValue={setPd} titulo="Punho (direito)"/>
                    <InputMedida value={pe} setValue={setPe} titulo="Punho (esquerdo)"/>
                    <InputMedida value={pesc} setValue={setPesc} titulo="Pescoço"/>
                    <InputMedida value={omb} setValue={setOmb} titulo="Ombro"/>
                    <InputMedida value={peit} setValue={setPeit} titulo="Peitoral"/>
                    <InputMedida value={cint} setValue={setCint} titulo="Cintura"/>
                    <InputMedida value={abd} setValue={setAbd} titulo="Abdomen"/>
                    <InputMedida value={quad} setValue={setQuad} titulo="Quadril"/>
                    <InputMedida value={pantd} setValue={setPantd} titulo="Panturrilha (direita)"/>
                    <InputMedida value={pante} setValue={setPante} titulo="Panturrilha (esquerda)"/>
                    <InputMedida value={cd} setValue={setCd} titulo="Coxa (direita)"/>
                    <InputMedida value={ce} setValue={setCe} titulo="Coxa (esquerda)"/>
                    <InputMedida value={cpd} setValue={setCpd} titulo="Coxa proximal (direita)"/>
                    <InputMedida value={cpe} setValue={setCpe} titulo="Coxa proximal (esquerda)"/>
               </div>

              <div className="botoes">
                <Button
                  type="submit"
                  id="btSalvar"
                  label="Salvar"
                  icon="pi pi-save"
                  iconPos="left"
                ></Button>
              </div>
            </div>
          </form>
        </div>
      </Tratamento>
    </>
  );
}
