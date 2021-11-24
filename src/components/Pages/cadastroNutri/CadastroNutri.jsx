import "./CadastroNutri.css";
import "primeflex/primeflex.css";

import BarraDeMenu from "../../meusComponentes/BarraDeMenu/BarraDeMenu";

import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { InputMask } from "primereact/inputmask";
import { Button } from "primereact/button";
import { MultiSelect } from "primereact/multiselect";
import React, { useEffect, useState, useRef } from "react";
import { useHistory, Link, useParams } from "react-router-dom";
import { FileUpload } from "primereact/fileupload";
import { Toast } from "primereact/toast";


import { addLocale } from "primereact/api";

import foto from "../../../assets/defaultUser.png";
import api from "../../../services/api";

function CadastroNutri() {
  //pegar o di da url
  const { id } = useParams();

  //usa o historico de navegação
  const history = useHistory();

  const toast = useRef(null);

  //states
  const [image, setImage] = useState("");
  const [nome, setNome] = useState("");
  const [sobreNome, setSobreNome] = useState("");
  const [dataNasc, setData] = useState("");
  const [email, setEmail] = useState("");
  const [cell, setCell] = useState(Number);
  const [crn, setCrn] = useState("");
  const [genero, setGenero] = useState("");
  const [especialidade, setEspecialidade] = useState("");
  const [especializacoes, setEspecializacoes] = useState([]);

  //lista de opção do combobox de especialidades
  const [especi] = useState([
    { name: "Alergias alimentares", code: 0 },
    { name: "Doenças autoimunes", code: 1 },
    { name: "Doenças cardiovasculares", code: 2 },
    { name: "Doenças Crônicas Não Transmissíveis", code: 3 },
    { name: "Ayurveda", code: 4 },
    { name: "Fitoterapia", code: 5 },
    { name: "Fertilidade", code: 6 },
    { name: "Clínica", code: 7 },
    { name: "Esportiva", code: 8 },
    { name: "Estética", code: 9 },
    { name: "Comportamental", code: 10 },
    { name: "Funcional", code: 11 },
    { name: "Gerontologia", code: 12 },
    { name: "Doenças pulmonares", code: 13 },
    { name: "Doenças renais", code: 14 },
    { name: "Materno-infantil", code: 15 },
    { name: "Nutrigenética", code: 16 },
    { name: "Oncológica", code: 17 },
    { name: "Pediátrica", code: 18 },
    { name: "Ortomolecular", code: 19 },
    { name: "Saúde da Mulher", code: 20 },
    { name: "Vegetariana", code: 21 },
    { name: "Saúde intestinal", code: 22 },
    { name: "Terapia Intensiva", code: 23 },
    { name: "Transtornos alimentares", code: 24 },
  ]);

  //carrega os dados do nutri em caso de update
  useEffect(() => {
    if (id != null) {
      api.get(`api/nutricionista/${id}`).then((res) => {
        const userPerfil = res.data;
        console.log(userPerfil);
        setNome(userPerfil.nome);
        setSobreNome(userPerfil.sobreNome);
        setData(new Date(userPerfil.dataNasc));
        setEmail(userPerfil.email);
        setCell(userPerfil.cell);
        setCrn(userPerfil.crn);
        setGenero({ label: userPerfil.genero });
        setEspecialidade(userPerfil.especialidade);

        let especia = [];

        userPerfil.especializacoes.map((esp) => {
          for (let i = 0; i < especi.length; i++) {
            if (esp === especi[i].name) {
              especia.push(especi[i]);
            }
          }
          return especia;
        });
        setEspecializacoes(especia);
      });
    }
  }, [id, especi]);

  //lista de opções do combobox genero
  const generos = [
    { label: "Masculino" },
    { label: "Feminino" },
    { label: "Outro" },
    { label: "Prefere Não declarar" },
  ];

  /*=================================calendário ===================================//
   * configurações necessárias para o calendário que seleciona a data de nascimento
   */
  addLocale("pt-br", {
    firstDayOfWeek: 1,
    dayNames: [
      "Domingo",
      "Segunda",
      "Terça",
      "Quarta",
      "Quinta",
      "Sexta",
      "Sábado",
    ],
    dayNamesShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
    dayNamesMin: ["D", "S", "T", "Q", "Q", "S", "S"],
    monthNames: [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ],
    monthNamesShort: [
      "Jan",
      "Fev",
      "Mar",
      "Abr",
      "Mai",
      "Jun",
      "Jul",
      "Ago",
      "Sep",
      "Out",
      "Nov",
      "Dec",
    ],
    today: "Hoje",
    clear: "Claro",
  });

  //metodo de salva, cria novo ou atualiza se for o caso
  async function Salvar(e) {
    e.preventDefault();
    const espe = especializacoes.map((especi) => especi.name);
    const gen = genero.label;
    const usuario = {
      nome: nome,
      sobreNome: sobreNome,
      dataNasc: dataNasc,
      email: email,
      cell: cell,
      crn: crn,
      genero: gen,
      especialidade: especialidade,
      especializacoes: espe,
      senha: "12346578",
    };

    let resposta;
    if (id != null) {
      resposta = await atualizar(e, usuario);
    } else {
      resposta = await Novo(e, usuario);
    }
    if ((resposta === 200) | (resposta === 201)) {
      toast.current.show({
        severity: "success",
        summary: "Sucesso!",
        detail: "Operação realizada com sucesso!",
        life: 2000,
      });
      setTimeout(() => {
        history.push("/listaNutri");
      }, 1500);
    } else if (resposta === "Error: Request failed with status code 400") {
      toast.current.show({
        severity: "warn",
        summary: "Atenção!",
        detail:"Algo parece estar errado. Verifique todos os campos e tente novamente.",
        life: 9000,
      });
    } else {
      toast.current.show({
        severity: "error",
        summary: "Desculpe!",
        detail:"O servidor parece estar indisponível no momento. Tente novamente mais tarde",
        life: 9000,
      });
    }
  }

  //metodo que cria um novo usuario
  async function Novo(e, usuario) {
    e.preventDefault();
    try {
      let response = await api.post("api/nutricionista", usuario);
      console.log(response);
      return response.status;
    } catch (error) {
      return error.toString();
    }
  }

  //metodo que atualiza um usuario existente
  async function atualizar(e, usuario) {
    e.preventDefault();
    usuario.id = id;
    
    try {
      let response = await api.put("api/nutricionista", usuario);
      console.log(response);
      return response.status;
    } catch (error) {
      return error.toString();
    }
  }

  //renderização da paginas
  return (
    <div className="nutriapp-cadastronutri">
      <Toast ref={toast} />
      <BarraDeMenu tab={1} tipo="admin" />
      <div className="nutriapp-cadastronutri-inicio">
        <div className="ladoEsquerdo">
          <div className="foto">
            {image ? (
              <img id="lbFoto" src={URL.createObjectURL(image)} alt="imagem" />
            ) : (
              <img
                id="lbFoto"
                src={foto}
                style={{ width: "60%", height: "60%" }}
                alt="imagemDefault"
              />
            )}
          </div>

          <div className="divBt1">
            <FileUpload
              id="bt1"
              type="file"
              mode="basic"
              auto
              accept="image/*"
              name="imagem"
              maxFileSize={10000000}
              customUpload
              uploadHandler={(e) => setImage(e.files.pop())}
              chooseLabel="Escolher"
            />
            <Button
              type="submit"
              id="bt2"
              label="Remover"
              icon="pi pi-minus"
              iconPos="left"
              onClick={(e) => setImage("")}
            ></Button>
          </div>
        </div>

        <div className="ladoDireito">
          <form onSubmit={Salvar}>
            <div className="p-fluid p-formgrid p-grid">
              <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname2">Nome</label>
                <InputText
                  id="firstname2"
                  type="text"
                  placeholder="Digite o nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  required
                  minLength="2"
                  maxLength="25"
                />
              </div>
              <div className="p-field p-col-12 p-md-6">
                <label htmlFor="lastname2">Sobrenome</label>
                <InputText
                  id="lastname2"
                  type="text"
                  placeholder="Digite o sobrenome"
                  value={sobreNome}
                  onChange={(e) => setSobreNome(e.target.value)}
                  required
                  minLength="2"
                  maxLength="80"
                />
              </div>

              <div className="p-field  p-col-12 ">
                <label htmlFor="datanascimento">Data de Nascimento</label>
                <Calendar
                  id="datanascimento"
                  value={dataNasc}
                  dateFormat="dd/mm/yy"
                  locale="pt-br"
                  monthNavigator
                  yearNavigator
                  mask="99/99/9999"
                  yearRange="1920:2021"
                  placeholder={"Data de Nascimento"}
                  showIcon
                  icon="pi pi-calendar"
                  onChange={(e) => setData(e.target.value)}
                  required
                />
              </div>

              <div className="p-field p-col-12 ">
                <label htmlFor="genero">Gênero</label>
                <Dropdown
                  inputId="genero"
                  value={genero}
                  options={generos}
                  onChange={(e) => setGenero(e.target.value)}
                  placeholder="Selecione"
                  required
                />
              </div>

              <div className="p-field p-col-12 ">
                <label htmlFor="phone">Telefone</label>
                <InputMask
                  id="phone"
                  value={cell}
                  onChange={(e) => setCell(e.value)}
                  mask="99 9 9999-9999"
                  placeholder="99-9999-9999"
                  required
                ></InputMask>
              </div>

              <div className="p-field p-col-12">
                <label htmlFor="email">E-mail</label>
                <InputText
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="Digite o e-mail"
                  required
                  maxLength="80"
                />
              </div>

              <div className="p-field p-col-12">
                <label htmlFor="especialidade">Especialidade</label>
                <InputText
                  id="especialidade"
                  value={especialidade}
                  onChange={(e) => setEspecialidade(e.target.value)}
                  type="text"
                  placeholder="Nutricionista,Medico"
                  required
                />
              </div>

              <div className="p-field p-col-12 ">
                <label htmlFor="crn">CRN</label>
                <InputText
                  id="crn"
                  value={crn}
                  onChange={(e) => setCrn(e.target.value)}
                  type="text"
                  placeholder="1 23456/x"
                  required
                />
              </div>

              <div className="p-field p-col-12">
                <label className="mmselect">Especializações</label>
                <MultiSelect
                  showSelectAll={false}
                  value={especializacoes}
                  options={especi}
                  onChange={(e) => setEspecializacoes(e.target.value)}
                  optionLabel="name"
                  placeholder="Suas especializações"
                  display="chip"
                />
              </div>
            </div>
            <div className="p-d-flex p-jc-between">
              <Link to="/listaNutri">
                <Button
                  type="button"
                  id="bt2"
                  label="Voltar"
                  icon="pi pi-arrow-left"
                  iconPos="left"
                />
              </Link>
              <Button
                type="submit"
                id="bt"
                label="Salvar"
                icon="pi pi-save"
                iconPos="left"
                autoFocus
              ></Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default CadastroNutri;
