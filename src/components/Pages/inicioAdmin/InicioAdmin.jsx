import BarraDeMenu from "../../meusComponentes/BarraDeMenu/BarraDeMenu";
import GraficoBarras from "../../meusComponentes/graficoBarras/GraficoBarras";
import GraficoPizza from "../../meusComponentes/graficoPizza/GraficoPizza";
import GraficoLinhas from "../../meusComponentes/graficoLinhas/GraficoLinhas";
import "./InicioAdmin.css";
import { Link } from "react-router-dom";

export default function InicioAdmin(props) {


    const menu = [
        {label: 'Início', icon: 'pi pi-home', url: '/inicioAdmin'},
        { label: 'Profissionais de Nutrição', icon: 'pi pi-id-card', url: '',  },
        { label: 'Administradores', icon: 'pi pi-users', url: '' },
        { label: 'Relatórios', icon: 'pi pi-chart-line', url: '/inicioNutri' },
    ]


    return (
        <div className="inicio">
            <BarraDeMenu items={menu} tab={0} />
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