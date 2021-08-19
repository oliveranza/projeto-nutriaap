import "./CadastroNutri.css"
import React, { Component } from 'react';
import { InputText } from 'primereact/inputtext';
import 'primeflex/primeflex.css';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { InputMask } from 'primereact/inputmask';
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import BarraDeMenu from '../../meusComponentes/BarraDeMenu/BarraDeMenu';
import { MultiSelect } from 'primereact/multiselect';
import { useState } from "react";




function CadastroNutri() {


  const [especializacoes, setEscializacoes] = useState(null);

  const cities = [
    { name: 'New York', code: 0 },
    { name: 'Rome', code: 1}, 
    { name: 'London', code : 2},
    { name: 'Istanbul',code : 3 },
    { name: 'Paris', code : 4}
  ];


  return (



    <div className="nutriapp-cadastronutri">
      <BarraDeMenu />
      <div className="nutriapp-cadastronutri-inicio">
        <div className="ladoEsquerdo">
          <div className="foto">
            <label className="pi pi-user" id="lbfoto"></label>
          </div>

          <Button id="bt" label="Upload" icon="pi pi-upload" iconPos="left" />

        </div>


        <div className="ladoDireito">
          <div className="Dados">

            <div className="NomeSobreNome">
              <div className="p-fluid p-formgrid p-grid">
                <div className="p-field p-col">
                  <label htmlFor="firstname2">Nome</label>
                  <InputText id="firstname2" type="text" placeholder="DIgite o nome" />
                </div>
                <div className="p-field p-col">
                  <label htmlFor="lastname2">Sobre Nome</label>
                  <InputText id="lastname2" type="text" placeholder="Digite o sobrenome" />
                </div>

              </div>
            </div>

            <div className="p-fluid  p-col-12 ">
              <label htmlFor="datanascimento">Data de Nascimento</label>
              <Calendar id="datanascimento" value="" placeholder="Data de Nascimento" />
            </div>

            <div className="p-fluid p-col-12 ">
              <label htmlFor="genero">Gênero</label>
              <Dropdown inputId="genero" value="Selecione o genero" placeholder="Selecione" />
            </div>

            <div className="p-fluid p-col-12 ">
              <label htmlFor="phone">Telefone</label>
              <InputMask id="phone" mask="99 9 9999-9999" placeholder="99-9999-9999" ></InputMask>
            </div>

            <div className="p-fluid p-col-12">
              <label htmlFor="email">E-mail</label>
              <InputText id="email" type="text" placeholder="Digite o e-mail" />
            </div>


            <div className="p-fluid p-col-12">
              <label htmlFor="email">Especialidade</label>
              <InputText id="email" type="text" placeholder="Nutricionista,Medico" />
            </div>

            <div className="p-fluid p-col-12 ">
              <label htmlFor="phone">CRN</label>
              <InputText id="CRN" type="text" placeholder="1 23456/x" />
            </div>
            
            <div className="p-fluid p-col-12">
              <label className="mmselect">Especializações</label>
              <MultiSelect showSelectAll={false} value={especializacoes} options={cities} onChange={(e) => setEscializacoes(e.value)} optionLabel="name" placeholder="Suas especializações" display="chip"/>

            </div>
            <div className="p-d-flex p-jc-between">
              <Button id="bt2" label="Voltar" icon="pi pi-arrow-left" iconPos="left" />
              <Button id="bt" label="Salvar" icon="pi pi-save" iconPos="left" />

            </div>

          </div>


        </div>

      </div>

    </div>



  );
}
export default CadastroNutri