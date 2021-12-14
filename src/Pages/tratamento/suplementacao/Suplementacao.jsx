import { Calendar } from "primereact/calendar";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { useEffect, useRef, useState } from "react";
import Tratamento from "../../../components/tratamento/Tratamento";
import { addLocale } from "primereact/api";
import { pt } from "../../../locale/pt.json";
import { Button } from "primereact/button";
import { MultiSelect } from "primereact/multiselect";
import { Chips } from "primereact/chips";
import { Toast } from "primereact/toast";


import { suple } from "../../../util/suplementos.json";
import { fitoterap } from "../../../util/fitoterapicos.json";
import "./Suplementacao.css";
import { useHistory, useParams } from "react-router-dom";
import api from "../../../services/api";

export default function Suplementacao() {
  const history = useHistory();
  const { id, idAvaliacao } = useParams();
  const toast = useRef();

  const [titulo, setTitulo] = useState("");
  const [data, setData] = useState(new Date());
  const [descricao, setDescricao] = useState("");
  const [suplementos, setSuplementos] = useState([]);
  const [suplementos2, setSuplementos2] = useState([]);
  const [fitoterapicos, setFitoterapicos] = useState([]);
  const [fitoterapicos2, setFitoterapicos2] = useState([]);
  const [posologia, setPosologia] = useState("");

  useEffect(() => {
    if (idAvaliacao) {
      api.get(`/api/tratamento/${id}/${idAvaliacao}`).then((res) => {
        const avali = res.data;
        const dt = new Date(avali.data);
        const suple = avali.suplementos.map(ele =>{
          return {name:ele}
        })
        const fito = avali.fitoterapicos.map(ele =>{
          return {name:ele}
        })
        setTitulo(avali.titulo);
        setData(dt);
        setDescricao(avali.descricao);
        setSuplementos(suple);
        setFitoterapicos(fito);
        setSuplementos2(avali.suplementos);
        setFitoterapicos2(avali.fitoterapicos);
        setPosologia(avali.posologia)
      });
    }
  }, []);

  async function salvar(e) {
    e.preventDefault();
    const suple = suplementos.map(ele =>{
      return ele.name
    })
    const fito = fitoterapicos.map(ele =>{
      return ele.name
    })
    const ava = {
      tipo: "suplementacao",
      titulo: titulo,
      data: data,
      descricao: descricao,
      suplementos: suple,
      fitoterapicos: fito,
      posologia: posologia,
    };
    if (idAvaliacao) {
      atualizar(ava);
    } else {
      novo(ava);
    }
  }

  async function novo(ava) {
    const res = await api.post(`api/tratamento/suplementacao/${id}`, ava);
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
    const res = await api.put(`api/tratamento/suplementacao/${id}`, ava);
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

  // const template = () => {
  //   return [{ name: "" }];
  // };

  return (
    <>
      <Tratamento abaMenu={8}>
      <Toast ref={toast} />
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
                  required
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
