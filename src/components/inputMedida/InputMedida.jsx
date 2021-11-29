import { InputText } from "primereact/inputtext";
import { Tooltip } from "primereact/tooltip";




export default function (props) {


  return (
    <>
      <div className="p-field p-col-12 p-md-2">
        <label htmlFor={props.titulo}>{props.titulo}</label>
        <InputText
          id={props.titulo}
          type="number"
          placeholder="Ex. 1.65"
          value={props.value}
          onChange={(e) => props.setValue(e.target.value)}
          required
          size="3"
          step="0.01"
          min="0"
          max="3"
          tooltip="Digite o valor em centímetros (cm)"
          tooltipOptions={{
            showDelay: 500,
            hideDelay: 300,
            position: "bottom",
          }}
        />
      </div>
      
    </>
  );
}
