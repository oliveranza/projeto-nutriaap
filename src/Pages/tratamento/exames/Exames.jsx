import { Calendar } from "primereact/calendar";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { useState, useRef, useEffect } from "react";
import Tratamento from "../../../components/tratamento/Tratamento";
import { addLocale } from "primereact/api";
import { pt } from "../../../locale/pt.json";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";

import api from "../../../services/api";
import { useHistory, useParams } from "react-router";

import "./Exames.css";

export default function Exmes() {
  const history = useHistory();
  const { id, idAvaliacao } = useParams();
  const toast = useRef();

  const [titulo, setTitulo] = useState();
  const [data, setData] = useState();
  const [exames, setExames] = useState();
  const [observacoes, setObservacoes] = useState();

  useEffect(() => {
    if (idAvaliacao) {
      api.get(`/api/tratamento/${id}/${idAvaliacao}`).then((res) => {
        const avali = res.data;
        setTitulo(avali.titulo);
        const dt = new Date(avali.data);
        setData(dt);
        setExames(avali.exames);
        setObservacoes(avali.observacoes);
      });
    }
  }, []);

  async function salvar(e) {
    e.preventDefault();
    const ava = {
      tipo: "exame",
      titulo: titulo,
      data: data,
      exames: exames,
      observacoes: observacoes,
    };
    if (idAvaliacao) {
      atualizar(ava);
    } else {
      novo(ava);
    }
  }

  async function novo(ava) {
    const res = await api.post(`api/tratamento/exame/${id}`, ava);
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
    const res = await api.put(`api/tratamento/exame/${id}`, ava);
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

  return (
    <>
      <Tratamento abaMenu={4}>
        <Toast ref={toast} />
        <div className="Exames">
          <form className="formulario" onSubmit={salvar}>
            <div className="p-fluid p-formgrid p-grid">
              <div className="p-field p-col-12 p-md-9">
                <label htmlFor="titulo">Título</label>
                <InputText
                  id="titulo"
                  type="text"
                  placeholder="Digite o título desta solicitação"
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
                <label htmlFor="descricao">Exames</label>
                <InputTextarea
                  id="descricao"
                  type="text"
                  placeholder="Digite os exames a serem solicitados ao paciente"
                  value={exames}
                  onChange={(e) => setExames(e.target.value)}
                  autoResize="false"
                  required="Deve ter uma descriação"
                />
              </div>

              <div className="p-field p-col-12 p-md-12">
                <label htmlFor="descricao">Observações</label>
                <InputTextarea
                  id="descricao"
                  type="text"
                  placeholder="Espaço reservado para observações"
                  value={observacoes}
                  onChange={(e) => setObservacoes(e.target.value)}
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
