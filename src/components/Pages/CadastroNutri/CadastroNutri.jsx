import "./CadastroNutri.css"
import React, { Component } from 'react';
import { InputText } from 'primereact/inputtext';
import 'primeflex/primeflex.css';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { InputMask } from 'primereact/inputmask';
import { Button } from 'primereact/button';
import BarraDeMenu from '../../meusComponentes/BarraDeMenu/BarraDeMenuAdm';



function CadastroNutri() {
  return (



    <div className="Header">
      <BarraDeMenu />
      <div className="InicioBody">
        <div className="LadoEsquerdo">
          <h1> Upload Foto</h1>
        </div>


        <div className="LadoDireito">

          <div className="Botao">
            <Button id="bt" label="Cadastrar" icon="pi pi-send" iconPos="left" />
            <Button id="bt2" label="Cancelar" icon="pi pi-times-circle" iconPos="left" />

          </div>

        </div>

      </div>

    </div>



  );
}
export default CadastroNutri