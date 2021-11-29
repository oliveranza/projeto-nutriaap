import './InicioNutri.css';

import { Button } from 'primereact/button';
import BarraDeMenu from '../../components/BarraDeMenu/BarraDeMenu';
import TabelaComTabs from '../../components/minhaTabela/TabelaComTabs';
import GraficoPizza from '../../components/graficoPizza/GraficoPizza';
import GraficoLinhas from '../../components/graficoLinhas/GraficoLinhas';
import { Link } from 'react-router-dom';


export default function InicioNutri() {

    return (
        <div className="nutriapp-inicioNutri">
            <div className="header">
                <BarraDeMenu tipo="nutri"tab={0}/>
            </div>
            <div className="InicioBody">
                
                <div className="LadoEsquerdo">
                    <TabelaComTabs tabs="" />
                </div>

                <div className="LadoDireito">
                    <div className="DivBotoes">
                        <Link to="/cadastroPaciente" ><Button id="btE" label={<p>Cadastrar<br />Paciente</p>} icon="pi pi-user-plus" iconPos="top"></Button></Link>
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