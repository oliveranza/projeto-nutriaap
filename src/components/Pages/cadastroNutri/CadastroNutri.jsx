import "./CadastroNutri.css"
import 'primeflex/primeflex.css';

import BarraDeMenu from '../../meusComponentes/BarraDeMenu/BarraDeMenu';

import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { InputMask } from 'primereact/inputmask';
import { Button } from 'primereact/button';
import { MultiSelect } from 'primereact/multiselect';
import React, { useState } from "react";
import { useHistory, Link } from 'react-router-dom';

import { addLocale } from 'primereact/api';
import api from "../../../services/api";
import axios from "axios";
import { useEffect } from "react";



function CadastroNutri() {


  
  const [nome, setNome] = useState('');
  const [sobreNome, setSobreNome] = useState('');
  
  
  const [telefone, setTelefone] = useState(null);
  const [especializacoes, setEscializacoes] = useState(null);
  const [genero, setGenero] = useState(null);
  const [data, setData] = useState(null);
  const [email, setEmail] = useState(null);
  const [especialidade, setEspecialidade] = useState(null);
  const [crn, setCrn] = useState(null);




  
  function valuesIniciais (){
      return ([nome,sobreNome])
  }
 
/* 
  const [especializacoes, setEscializacoes] = useState(null);
  const [genero, setGenero] = useState(null);
  const [data, setData] = useState(null); */

 useEffect(() => {
    api
      .post("http://localhost:8080/api/nutricionista", {
        nome,
        sobreNome,
      })
      .then((response) => console.log("deu certo"))
      .catch((err) => {
        console.log("ops! ocorreu um erro" + err)
      })

  }, )




    /* function valuesIniciais (){
        // return ([nome,sobreNome])
        return{nome, sobreNome}
    }

  async function createNewNutri(e){
    e.preventDefault();
    
    try {
      alert('Entrou no TRY');
       const response = api.post('http://localhost:8080/api/nutricionista',{nome, sobreNome});
      
    } catch (error) {
      alert('Erro ao tentar salvar um novo usuario');
    }
  } */

  function Form() {
  }
  const cities = [
    { name: 'Alergias alimentares', code: 0 },
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
  const itemsMenu = [
    { label: 'Início', icon: 'pi pi-home', url: '' },
    { label: 'Profissionais de Nutrição', icon: 'pi pi-id-card', url: '' },
    { label: 'Administradores', icon: 'pi pi-users', url: '' },
    { label: 'Relatórios', icon: 'pi pi-chart-line', url: '' },
  ]

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


  return (



    <div className="nutriapp-cadastronutri">
      <BarraDeMenu items={itemsMenu} />
      <div className="nutriapp-cadastronutri-inicio">
        <div className="ladoEsquerdo">
          <div className="foto">
            <label className="pi pi-user" id="lbfoto"></label>
          </div>

          <Button id="bt" label="Upload" icon="pi pi-upload" iconPos="left" />

        </div>


        <div className="ladoDireito">
          <form onSubmit={useEffect}>

            <div className="p-fluid p-formgrid p-grid">
              <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname2">Nome</label>
                <InputText id="firstname2" type="text" placeholder="DIgite o nome" value={nome} onChange={e => setNome(e.target.value)} />
              </div>
              <div className="p-field p-col-12 p-md-6">
                <label htmlFor="lastname2">Sobrenome</label>
                <InputText id="lastname2" type="text" placeholder="Digite o sobrenome" value={sobreNome} onChange={e => setSobreNome(e.target.value)} />
              </div>

              <div className="p-field  p-col-12 ">
                <label htmlFor="datanascimento">Data de Nascimento</label>
                <Calendar id="datanascimento" value={data} dateFormat="dd/mm/yy" locale='pt-br' monthNavigator yearNavigator mask="99/99/9999"
                  yearRange="1920:2021" placeholder="Data de Nascimento" showIcon icon="pi pi-calendar" onChange={e => setData(e.value)} />
              </div>

              <div className="p-field p-col-12 ">
                <label htmlFor="genero">Gênero</label>
                <Dropdown inputId="genero" value={genero} options={generos} onChange={e => setGenero(e.value)} placeholder="Selecione" />
              </div>

              <div className="p-field p-col-12 ">
                <label htmlFor="phone">Telefone</label>
                <InputMask id="phone" value={telefone} onChange={e => setTelefone(e.value)} mask="99 9 9999-9999" placeholder="99-9999-9999" ></InputMask>
              </div>

              <div className="p-field p-col-12">
                <label htmlFor="email">E-mail</label>
                <InputText id="email" value={email} onChange={e => setEmail(e.value)} type="text" placeholder="Digite o e-mail" />
              </div>


              <div className="p-field p-col-12">
                <label htmlFor="especialidade">Especialidade</label>
                <InputText id="especialidade" value={especialidade} onChange={e => setEspecialidade(e.value)} type="text" placeholder="Nutricionista,Medico" />
              </div>

              <div className="p-field p-col-12 ">
                <label htmlFor="crn">CRN</label>
                <InputText id="crn" value={crn} onChange={e => setCrn(e.value)} type="text" placeholder="1 23456/x" />
              </div>

              <div className="p-field p-col-12">
                <label className="mmselect">Especializações</label>
                <MultiSelect showSelectAll={false} value={especializacoes} options={cities} onChange={(e) => setEscializacoes(e.value)} optionLabel="name" placeholder="Suas especializações" display="chip" />

              </div>

            </div>
            <div className="p-d-flex p-jc-between">
              <Button id="bt2" label="Voltar" icon="pi pi-arrow-left" iconPos="left" />
              <Button type="submit" id="bt" label="Salvar" icon="pi pi-save" onClick={useEffect} iconPos="left" ></Button>
            </div>
          </form>


        </div>

      </div>

    </div>



  );
}
export default CadastroNutri