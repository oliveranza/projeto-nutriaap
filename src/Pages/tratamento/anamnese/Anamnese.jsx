import { Calendar } from "primereact/calendar";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { useEffect, useRef, useState } from "react";
import Tratamento from "../../../components/tratamento/Tratamento";
import { addLocale } from "primereact/api";
import { pt } from "../../../locale/pt.json";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";

import "./Anamnese.css";
import api from "../../../services/api";
import { useHistory, useParams } from "react-router";

export default function Anamnese(props) {
  const history = useHistory();

  const { id, idAvaliacao } = useParams();
  const [titulo, setTitulo] = useState("");
  const [data, setData] = useState(new Date());
  const [descricao, setDescricao] = useState("");
  const toast = useRef();

  useEffect(() => {
    if (idAvaliacao) {
      api.get(`/api/tratamento/${id}/${idAvaliacao}`).then((res) => {
        const avali = res.data;
        setTitulo(avali.titulo);
        const dt = new Date(avali.data);
        setData(dt);
        setDescricao(avali.descricao);
      });
    }
  }, []);

  async function salvar(e) {
    e.preventDefault();
    const ava = {
      tipo: "anamnese",
      titulo: titulo,
      data: data,
      descricao: descricao,
    };
    if (idAvaliacao) {
      atualizar(ava);
    } else {
      novo(ava);
    }
  }

  async function novo(ava) {
    const res = await api.post(`api/tratamento/anamnese/${id}`, ava);
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
    ava.id = idAvaliacao
    const res = await api.put(`api/tratamento/anamnese/${id}`, ava);
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
      <Toast ref={toast} />
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
