import BarraDeMenu from "../../components/BarraDeMenu/BarraDeMenu";
import GraficoBarras from "../../components/graficoBarras/GraficoBarras";
import GraficoPizza from "../../components/graficoPizza/GraficoPizza";
import GraficoLinhas from "../../components/graficoLinhas/GraficoLinhas";
import "./InicioAdmin.css";

export default function InicioAdmin(props) {

    return (
        <div className="nutriap-inicioadmin">
            <BarraDeMenu tipo="admin" tab={0} />
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