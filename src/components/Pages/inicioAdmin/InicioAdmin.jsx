import { ReactChild } from "react";
import BarraDeMenu from "../../meusComponentes/BarraDeMenu/BarraDeMenu";
import GraficoBarras from "../../meusComponentes/graficoBarras/GraficoBarras";
import GraficoPizza from "../../meusComponentes/graficoPizza/GraficoPizza";
import GraficoLinhas from "../../meusComponentes/graficoLinhas/GraficoLinhas";
import "./InicioAdmin.css";

export default function InicioAdmin(props) {


    const menu = [
        { label: 'Início', icon: 'pi pi-home', url: '' },
        { label: 'Profissionais de Nutrição', icon: 'pi pi-id-card', url: '' },
        { label: 'Administradores', icon: 'pi pi-users', url: '' },
        { label: 'Relatórios', icon: 'pi pi-chart-line', url: '' },
    ]


    return (
        <div className="inicio">
            <BarraDeMenu items={menu} />
            <div className="inicioBody">

                <div className="cima">

                    <div className="esquerda">
                        <GraficoBarras titulo="Faturamento"/>
                    </div>

                    <div className="direita">
                        <GraficoPizza titulo="Desempenho"></GraficoPizza>
                    </div>

                </div>

                <div className="baixo">
                    <GraficoLinhas titulo="Pacientes"/>
                </div>
            </div>

        </div>


    )

}