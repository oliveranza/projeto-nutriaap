import "./CadastroNutri.css"
import 'primeflex/primeflex.css';

import BarraDeMenu from '../../meusComponentes/BarraDeMenu/BarraDeMenu';

import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { InputMask } from 'primereact/inputmask';
import { Button } from 'primereact/button';
import { MultiSelect } from 'primereact/multiselect';
import React, { useEffect, useState } from "react";
import { useHistory, Link, useParams } from 'react-router-dom';

import { addLocale } from 'primereact/api';
import api from "../../../services/api";




function CadastroNutri() {

  const {id} = useParams()
  
  
  
  const history = useHistory();
  
  
  useEffect(()=>{
    if(id!= null){
      api.get(`http://localhost:8080/api/nutricionista/${id}`)
      .then(res =>{
        const userPerfil = res.data
        console.log(userPerfil)
        setNome(userPerfil.nome)
        setSobreNome(userPerfil.sobreNome)
        setData(new Date(userPerfil.dataNasc))
        setEmail(userPerfil.email)
        setCell(userPerfil.cell)
        setCrn(userPerfil.crn)
        setGenero({label:userPerfil.genero})
        setEspecialidade(userPerfil.especialidade)

        let especia = userPerfil.especializacoes.map(esp => {
          for(let i=0; i<especi.length;i++ ){
            if(esp === especi[i].name){
              return (especi[i]);
            }
          }
          
        })
        setEspecializacoes(especia) 
        
    })}  
  },[])


  const [nome, setNome] = useState("");
  const [sobreNome, setSobreNome] = useState("");
  const [dataNasc, setData] = useState("");
  const [email, setEmail] = useState("");
  const [cell, setCell] = useState(Number);
  const [crn, setCrn] = useState("");
  const [genero, setGenero] = useState("");
  const [especialidade, setEspecialidade] = useState("");
  const [especializacoes, setEspecializacoes] = useState([]);
  
  const especi = [
    { name: 'Alergias alimentares', code: 0},
    { name: 'Doenças autoimunes', code: 1 },
    { name: 'Doenças cardiovasculares', code: 2 },
    { name: 'Doenças Crônicas Não Transmissíveis', code: 3 },
    { name: 'Ayurveda', code: 4 },
    { name: 'Fitoterapia', code: 5 },
    { name: 'Fertilidade', code: 6 },
    { name: 'Clínica', code: 7 },
    { name: 'Esportiva', code: 8 },
    { name: 'Estética', code: 9 },
    { name: 'Comportamental', code: 10 },
    { name: 'Funcional', code: 11 },
    { name: 'Gerontologia', code: 12 },
    { name: 'Doenças pulmonares', code: 13 },
    { name: 'Doenças renais', code: 14 },
    { name: 'Materno-infantil', code: 15 },
    { name: 'Nutrigenética', code: 16 },
    { name: 'Oncológica', code: 17 },
    { name: 'Pediátrica', code: 18 },
    { name: 'Ortomolecular', code: 19 },
    { name: 'Saúde da Mulher', code: 20 },
    { name: 'Vegetariana', code: 21 },
    { name: 'Saúde intestinal', code: 22 },
    { name: 'Terapia Intensiva', code: 23 },
    { name: 'Transtornos alimentares', code: 24 }
  ];
  
  const generos = [
    { label: "Masculino" },
    { label: "Feminino" },
    { label: "Outro" },
    { label: "Prefere Não declarar" },
  ]
  
  
  /*=================================calendário ===================================//
  * 
  */
  addLocale('pt-br', {
    firstDayOfWeek: 1,
    dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
    dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
    dayNamesMin: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
    monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Sep', 'Out', 'Nov', 'Dec'],
    today: 'Hoje',
    clear: 'Claro'
  });
  

  async function Salvar(e) {
    e.preventDefault()
    const espe  = especializacoes.map(especi=>especi.name)
    const gen = genero.label
    const usuario = {
      nome: nome,
      sobreNome: sobreNome,
      dataNasc: dataNasc,
      email: email,
      cell: cell,
      crn: crn,
      genero:gen,
      especialidade:especialidade,
      especializacoes: espe
    }

    let flag = false
    if(id!=null){
      flag = atualizar(e,usuario)
    }else{
      flag = Novo(e,usuario)
    }

    if(flag){
      alert("Operação realizada com sucesso!")
      history.push('/listaNutri')
    }else{
      alert(`oops! ocorreu um erro. tente novamente mais tarde`)
    }
    window.location.reload()
}

async function Novo(e, usuario) {
  e.preventDefault()

  await api.post("http://localhost:8080/api/nutricionista", usuario)
    .then(response => {
      console.log(response)
    })
    .catch(error=> {
      console.log("oops! ocorreu um erro. " + error)
  })

}


async function atualizar(e, usuario) {
  e.preventDefault()

  usuario.id=id
  
  await api.put("http://localhost:8080/api/nutricionista", usuario)
    .then(response => {
      console.log(response)
    })
    .catch(error=> {
      console.log("oops! ocorreu um erro. " + error)
  })

}

  return (
    // carregaDados(),
    <div className="nutriapp-cadastronutri">
      <BarraDeMenu tab={1} tipo="admin" />
      <div className="nutriapp-cadastronutri-inicio">
        <div className="ladoEsquerdo">
          <div className="foto">
            <label className="pi pi-user" id="lbfoto"></label>
          </div>

          <Button id="bt" label="Upload" icon="pi pi-upload" iconPos="left" />

        </div>


        <div className="ladoDireito">
          <form onSubmit={Salvar}>

            <div className="p-fluid p-formgrid p-grid">
              <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname2">Nome</label>
                <InputText id="firstname2"  type="text" placeholder="Digite o nome" value={nome} onChange={e => setNome(e.target.value)} required minLength="2" maxLength="25"/>
              </div>
              <div className="p-field p-col-12 p-md-6">
                <label htmlFor="lastname2">Sobrenome</label>
                <InputText id="lastname2" type="text" placeholder="Digite o sobrenome" value={sobreNome} onChange={e => setSobreNome(e.target.value)} required minLength="2" maxLength="80"/>
              </div>

              <div className="p-field  p-col-12 ">
                <label htmlFor="datanascimento">Data de Nascimento</label>
                <Calendar id="datanascimento" value={dataNasc} dateFormat="dd/mm/yy" locale='pt-br' monthNavigator yearNavigator mask="99/99/9999"
                  yearRange="1920:2021" placeholder={"Data de Nascimento"} showIcon icon="pi pi-calendar" onChange={e => setData(e.target.value)} required/>
              </div>

              <div className="p-field p-col-12 ">
                <label htmlFor="genero">Gênero</label>
                <Dropdown inputId="genero" value={genero} options={generos} onChange={e => setGenero(e.target.value)} placeholder="Selecione" required/>
              </div>

              <div className="p-field p-col-12 ">
                <label htmlFor="phone">cell</label>
                <InputMask id="phone" value={cell} onChange={e => setCell(e.value)} mask="99 9 9999-9999" placeholder="99-9999-9999" required></InputMask>
              </div>

              <div className="p-field p-col-12">
                <label htmlFor="email">E-mail</label>
                <InputText id="email" value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="Digite o e-mail" required maxLength="80"/>
              </div>


              <div className="p-field p-col-12">
                <label htmlFor="especialidade">Especialidade</label>
                <InputText id="especialidade" value={especialidade} onChange={e => setEspecialidade(e.target.value)} type="text" placeholder="Nutricionista,Medico" required/>
              </div>

              <div className="p-field p-col-12 ">
                <label htmlFor="crn">CRN</label>
                <InputText id="crn" value={crn} onChange={e => setCrn(e.target.value)} type="text" placeholder="1 23456/x" required/>
              </div>

              <div className="p-field p-col-12">
                <label className="mmselect">Especializações</label>
                <MultiSelect showSelectAll={false} value={especializacoes} options={especi} onChange={(e) => setEspecializacoes(e.target.value)}
                      optionLabel="name" placeholder="Suas especializações" display="chip"/>

              </div>

            </div>
            <div className="p-d-flex p-jc-between">
              <Link to="/listaNutri">
                <Button type="button" id="bt2"  label="Voltar" icon="pi pi-arrow-left" iconPos="left" />
              </Link>
                <Button type="submit" id="bt" label="Salvar" icon="pi pi-save" iconPos="left" autoFocus></Button>
            </div>
          </form>

        </div>

      </div>

    </div>



  );
}
export default CadastroNutri