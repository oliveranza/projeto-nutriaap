import React, { useState } from 'react'
import './InicioNutri.css';

import { Button } from 'primereact/button';
import BarraDeMenu from '../../meusComponentes/BarraDeMenu/BarraDeMenu';
import TabelaComTabs from '../../meusComponentes/minhaTabela/TabelaComTabs';
import GraficoPizza from '../../meusComponentes/graficoPizza/GraficoPizza';
import GraficoLinhas from '../../meusComponentes/graficoLinhas/GraficoLinhas';


export default function InicioNutri() {

    return (
        <div className="Inicio">
            <div className="header">
                <BarraDeMenu />
            </div>
            <div className="InicioBody">
                <div className="LadoEsquerdo">
                    <TabelaComTabs tabs="" />
                </div>
                <div className="LadoDireito">
                    <div className="DivBotoes">
                        <Button id="btE" label={<p>Cadastrar<br />Paciente</p>} icon="pi pi-user-plus" iconPos="top"></Button>
                        <Button id="btD" label={<p>Marcar<br />Consulta</p>} icon="pi pi-plus" iconPos="top"></Button>
                    </div>
                    <div className="divPizza">
                        <GraficoPizza titulo="Meu Grafico de Pizza" data="" />
                    </div>
                    <div className="divLinhas">
                        <GraficoLinhas titulo="Meu grafico de Linhas" data="" />
                    </div>

                </div>
            </div>
        </div>

    )
}