import { Calendar } from "primereact/calendar";
import { InputText } from "primereact/inputtext";
import { useEffect, useRef, useState } from "react";
import Tratamento from "../../../components/tratamento/Tratamento";
import { addLocale } from "primereact/api";
import { pt } from "../../../locale/pt.json";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { Toast } from "primereact/toast";

import "./GastoEnergetico.css";
import api from "../../../services/api";

import { injurias } from "../../../util/injurias.json";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";

export default function GastoEnergetico() {

  const history = useHistory();
  const { id, idAvaliacao } = useParams();
  const toast = useRef();

  const [titulo, setTitulo] = useState();
  const [data, setData] = useState();
  const [peso, setPeso] = useState();
  const [altura, setAltura] = useState();
  const [protocolo, setProtocolo] = useState();
  const [grau, setGrau] = useState();
  const [injuria, setInjuria] = useState();
  
  useEffect(() => {
    if (idAvaliacao) {
      api.get(`/api/tratamento/${id}/${idAvaliacao}`).then((res) => {
        const avali = res.data;
        const dt = new Date(avali.data);
        setTitulo(avali.titulo);
        setData(dt);
        setPeso(avali.peso);
        setAltura(avali.altura);
        setProtocolo({label: avali.protocolo});
        setGrau(avali.nivelDeAtividade);
        setInjuria({label: avali.injuria})
      });
    }
  }, []);

  async function salvar(e) {
    e.preventDefault();
    const inj = injuria.label
    const prot = protocolo.label
    const ava = {
      tipo: "gastoEnergetico",
      titulo: titulo,
      data:data,
      peso: peso,
      altura: altura,
      protocolo: prot,
      nivelDeAtividade: grau,
      injuria:inj,
    };
    if (idAvaliacao) {
      atualizar(ava);
    } else {
      novo(ava);
    }
  }

  async function novo(ava) {
    const res = await api.post(`api/tratamento/gastoEnergetico/${id}`, ava);
    if (res.status === 201) {
      toast.current.show({
        severity: "success",
        summary: "Sucesso!",
        detail: "Avaliação cadastrada com sucesso",
        time: 2000,
      });
      setTimeout(() => {
        history.push(`/paciente/tratamento/${id}`);
      }, 1000);
    } else {
      toast.current.show({
        severity: "error",
        summary: "erro!",
        detail: "Erro no cadastro",
        time: 7000,
      });
    }
  }

  async function atualizar(ava) {
    ava.id = idAvaliacao;
    const res = await api.put(`api/tratamento/gastoEnergetico/${id}`, ava);
    if (res.status === 201) {
      toast.current.show({
        severity: "success",
        summary: "Sucesso!",
        detail: "Avaliação Atualizada com sucesso",
        time: 2000,
      });
      setTimeout(() => {
        history.push(`/paciente/tratamento/${id}`);
      }, 1500);
    } else {
      toast.current.show({
        severity: "error",
        summary: "erro!",
        detail: "ops, ocorreu alguam erro na atualização",
        time: 7000,
      });
    }
  }

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

  const graus = [
    { label: <><strong>Sedentário</strong> (1,2) - Faz atividades domesticas, caminhadas dentro de casa e fica sentado por muito tempo</>,value: "Sedentário"},
    { label: <><strong>Baixo</strong> (1,3) - Faz caminhadas por volta dos 6km/h, e atividades do nível sedentário</>,value: "Baixo"},
    { label: <><strong>Moderado</strong> (1,5) - Faz Corrida, natação, joga tenis, ginastica, e atividades do nível sedentário</>,value: "Moderado"},
    { label: <><strong>Intenso</strong> (1,7) - Faz ciclismo, corrida, joga volei, pula corda, e atividades do nível sedentário</>,value: "Intenso"},
    { label: <><strong>Muito intenso</strong> (1,9) - Faz ciclismo intenso, corridas intensas, joga basquete, e atividades do nível sedentário</>,value: "Muito intenso"},
  ];

    

  return (
    <>
      <Tratamento abaMenu={5}>
      <Toast ref={toast} />
        <div className="gastoEnergetico">
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

                <div className="p-field p-col-12 p-md-3">
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
                <div className="p-field p-col-12 p-md-3">
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

              <div className="p-field p-col-12 ">
                <label htmlFor="protocolo">Protocolo</label>
                <Dropdown
                  inputId="protocolo"
                  value={protocolo}
                  options={protocolos}
                  onChange={(e) => setProtocolo(e.target.value)}
                  placeholder="Selecione um protocolo"
                  required
                />
              </div>
              <div className="p-field p-col-12 ">
                <label htmlFor="grau">Nivel de atividades</label>
                <Dropdown
                  inputId="grau"
                  value={grau}
                  options={graus}
                  onChange={(e) => setGrau(e.target.value)}
                  placeholder="Selecione um protocolo"
                  required
                />
              </div>
              <div className="p-field p-col-12 ">
                <label htmlFor="injuria">Fator de injuria</label>
                <Dropdown
                  inputId="injuria"
                  value={injuria}
                  options={injurias}
                  onChange={(e) => setInjuria(e.target.value)}
                  placeholder="Selecione um protocolo"
                  required
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
