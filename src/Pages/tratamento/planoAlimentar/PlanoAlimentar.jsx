import { useRef, useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { InputTextarea } from "primereact/inputtextarea";
import { SelectButton } from "primereact/selectbutton";
import { addLocale } from "primereact/api";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";

import Tratamento from "../../../components/tratamento/Tratamento";
import MyTable from "../../../components/myTable/MyTable";
import { pt } from "../../../locale/pt.json";
import api from "../../../services/api";
import "./PlanoAlimentar.css";




export default function PlanoAlimentar() {

  const [titulo, setTitulo] = useState("");
  const [data, setData] = useState(new Date());
  const [dias, setDias] = useState([]);
  const [hora, setHora] = useState();
  const [refeicao, setRefeicao] = useState();
  const [alimento, setAlimento] = useState("");
  const [refeicoes, setRefeicoes] = useState([]);
  const [observacao, setObservacao] = useState();
  
  const { id, idAvaliacao } = useParams()
  const history = useHistory()
  const toast = useRef()
  const opcoesHoras = opc();
  const colunas = ["horario", "refeicao", "alimentos"];
  const width = ["10%", "20%", "60%"];

  useEffect(() => {
    if (idAvaliacao) {
      api.get(`/api/tratamento/${id}/${idAvaliacao}`).then((res) => {
        const avali = res.data;
        const dt = new Date(avali.data);
        const dias1 = avali.dias.split(", ")
        let dias2 = []
        for (let i = 0; i < dias1.length-1; i++) {
                   dias2.push({label:dias1[i]})
        }
        setTitulo(avali.titulo);
        setData(dt);
        setDias(dias2)
        setRefeicoes(avali.refeicao)
        setObservacao(avali.observacoes);
      });
    }
  }, []);

  async function salvar(e) {
    e.preventDefault();
    let diass = ""
    dias.forEach(ele =>{
      diass += ele.label+", "
    })
    console.log(diass);
    console.log(refeicoes);
    const ava = {
      tipo: "planoAlimentar",
      titulo: titulo,
      data: data,
      dias: diass,
      refeicao: refeicoes,
      observacoes: observacao,
    };
    if (idAvaliacao) {
      atualizar(ava);
    } else {
      novo(ava);
    }
  }

  async function novo(ava) {
    const res = await api.post(`api/tratamento/planoAlimentar/${id}`, ava);
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
    const res = await api.put(`api/tratamento/planoAlimentar/${id}`, ava);
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

  const opcoesDias = [
    { label: "Domingo" },
    { label: "Segunda" },
    { label: "Terça" },
    { label: "Quarta" },
    { label: "Quinta" },
    { label: "Sexta" },
    { label: "Sabado" },
  ];


  function opc() {
    let t = [];
    for (let i = 0; i <= 9; i++) {
      t.push({ label: "0" + i + ":00", key: i });
      t.push({ label: "0" + i + ":30", key: i });
    }
    for (let i = 10; i <= 23; i++) {
      t.push({ label: +i + ":00", key: i });
      t.push({ label: +i + ":30", key: i });
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


  function del(refei) {
    const nova = refeicoes.filter(ref =>ref.alimentos !==refei.alimentos);
    setRefeicoes(nova)
  }
  
  function add() {
    let verifica = true;
    hora == undefined ? (verifica = false) : "";
    refeicao == undefined ? (verifica = false) : "";
    alimento === "" ? (verifica = false) : "";
    if (verifica === true) {
      const item = {
        horario: hora.label,
        refeicao: refeicao.label,
        alimentos: alimento,
      };
      setRefeicoes([...refeicoes, item]);
      setHora()
      setRefeicao()
      setAlimento("")
      toast.current.show({
        severity:"success",
        summary:"Adicionado",
        detail:"Refeição adicionada",
        time: 3000,
      })
      console.log(refeicoes);
    } else {
      toast.current.show({
        severity:"info",
        summary:"Atenção",
        detail:"Para adicionar uma refeição, primeiro preencha todos os campos",
        time: 7000,
      })
    }
  }

  

  return (
    <> 
      <Toast ref={toast}/>
      <Tratamento abaMenu={6}>
        <div className="planoAlimentar">
          <form className="formulario" onSubmit={salvar}>
            <div className="p-fluid p-formgrid p-grid">
              <div className="p-field p-col-12 p-md-9">
                <label htmlFor="titulo">Título</label>
                <InputText
                  id="titulo"
                  type="text"
                  placeholder="Digite um título para este plano alimentar"
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
                  required
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
                />
              </div>

              <div className="p-col-12 p-md-2" id="divBt">
                <Button
                  type="button"
                  id="btAdd"
                  label="Adicionar Refeição"
                  icon="pi pi-plus"
                  iconPos="top"
                  onClick={(e) => add(e)}
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
                  minLength="2"
                />
              </div>

              <div className="p-field p-col-12 p-md-12">
                <MyTable
                  label="Refeições"
                  value={refeicoes}
                  colunas={colunas}
                  colWidth={width}
                  setValue={setRefeicoes}
                  remove={true}
                  handleRemove={del}
                  sort="horario"
                  ordem={1}
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
                ></Button>
              </div>
            </div>
          </form>
        </div>
      </Tratamento>
    </>
  );
}
