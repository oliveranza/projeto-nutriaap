import './Recuperacao.css'
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

function Recuperacao() {

  return (
    <div className="Container">

      <div className="CardVertical">

        <h1>NUTRIAPP</h1>
          <h2>Recuperação de Senha</h2>
          <p>Digite seu endereço de e-mail e depois click no botão "Enviar" para que possamos
    lhe enviar um e-mail com as instruções para redefinição de senha.</p>


        <div className="Email">
          <span className="p-float-label p-input-icon-left" >
            <i className="pi pi-envelope" id="userIcon" />
            <InputText id="lefticon" value="" />
            <label htmlFor="lefticon">E-mail</label>
          </span>
        </div>




        <div className="Botao">
          <Button id="bt" label="Enviar" icon="pi pi-send" iconPos="left" />
          <Button id="bt2" label="Cancelar" icon="pi pi-times-circle" iconPos="left" />

        </div>

      </div>

    </div>
  );
}

export default Recuperacao