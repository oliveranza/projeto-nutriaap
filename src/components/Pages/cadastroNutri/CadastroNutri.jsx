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




function CadastroNutri() {


  const [especializacoes, setEscializacoes] = useState(null);

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


  return (



    <div className="nutriapp-cadastronutri">
      <BarraDeMenu items={itemsMenu}/>
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
              <MultiSelect showSelectAll={false} value={especializacoes} options={cities} onChange={(e) => setEscializacoes(e.value)} optionLabel="name" placeholder="Suas especializações" display="chip" />

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