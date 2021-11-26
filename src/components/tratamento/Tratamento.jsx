import { ScrollPanel } from "primereact/scrollpanel";
import BarraDeMenu from "../../components/BarraDeMenu/BarraDeMenu";
import MenuTratamento from "../../components/menuTratamento/MenuTratamento";

import "./Tratamento.css";

export default function Tratamento(props) {
  return (
    <div className="nutriapp-Tratamento">
      <BarraDeMenu tipo="nutri" tab={1} />
      <div className="corpo">
        <div className="ladoEsquerdo">
          <MenuTratamento aba={props.abaMenu} />
        </div>
        <div className="ladoDireito">
          <ScrollPanel>
            {props.children}
          </ScrollPanel>
        </div>
      </div>
    </div>
  );
}
