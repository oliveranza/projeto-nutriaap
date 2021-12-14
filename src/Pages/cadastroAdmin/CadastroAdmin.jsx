import "./CadastroAdmin.css";
import "primeflex/primeflex.css";

import BarraDeMenu from "../../components/BarraDeMenu/BarraDeMenu";

import React, { useEffect, useState, useRef } from "react";
import { useHistory, Link, useParams } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { InputMask } from "primereact/inputmask";
import { Button } from "primereact/button";
import { addLocale } from "primereact/api";
import { FileUpload } from "primereact/fileupload";
import { Toast } from "primereact/toast";


import { pt } from "../../locale/pt.json"
import foto from "../../assets/defaultUser.png";
import api from "../../services/api";

function CadastroAdmin() {
  //pegar o id da url
  const { id } = useParams();

  //usa o historico de navegação
  const history = useHistory();

  //carrega os dados do nutri em caso de update
  useEffect(() => {
    if (id != null) {
      api.get(`http://localhost:8080/api/admin/${id}`).then((res) => {
        const userPerfil = res.data;
        // const dt1 = userPerfil.dataNasc.split("/",3)
        // const dt2 = new Date(dt1[2],dt1[1]-1,dt1[0])
        console.log(userPerfil);
        setNome(userPerfil.nome);
        setSobreNome(userPerfil.sobreNome);
        setData(new Date(userPerfil.dataNasc));
        setEmail(userPerfil.email);
        setCell(userPerfil.cell);
        setGenero({ label: userPerfil.genero });
      });
    }
  }, [id]);

  const toast = useRef(null);

  //states
  const [image, setImage] = useState("");
  const [nome, setNome] = useState("");
  const [sobreNome, setSobreNome] = useState("");
  const [dataNasc, setData] = useState("");
  const [email, setEmail] = useState("");
  const [cell, setCell] = useState(Number);
  const [genero, setGenero] = useState("");

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
  addLocale("pt-BR", pt)

  //metodo de salva, cria novo ou atualiza se for o caso
  async function Salvar(e) {
    e.preventDefault();
    const gen = genero.label;
    // const dt = format(dataNasc,"dd/MM/yyyy")

    const usuario = {
      nome: nome,
      sobreNome: sobreNome,
      // dataNasc: dt,
      dataNasc: dataNasc,
      email: email,
      cell: cell,
      genero: gen,
      senha: "12345678",
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
        history.push("/listaAdmin");
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
      let response = await api.post("api/admin", usuario);
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
      let response = await api.put("api/admin", usuario);
      console.log(response);
      return response.status;
    } catch (error) {
      return error.toString();
    }
  }

  //renderização da paginas
  return (
    <div className="nutriapp-cadastroadmin">
      <Toast ref={toast} />
      <BarraDeMenu tab={2} tipo="admin" />
      <div className="nutriapp-cadastroadmin-inicio">
        <div className="corpo">
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
                  locale="pt-BR"
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
            </div>
            <div className="p-d-flex p-jc-between">
              <Link to="/listaAdmin">
                <Button
                  type="button"
                  id="btVoltar"
                  label="Voltar"
                  icon="pi pi-arrow-left"
                  iconPos="left"
                />
              </Link>
              <Button
                type="submit"
                id="btSalvar"
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
    </div>
  );
}
export default CadastroAdmin;
