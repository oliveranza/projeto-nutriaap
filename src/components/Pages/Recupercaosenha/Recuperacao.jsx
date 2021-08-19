import './Recuperacao.css'
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

function Recuperacao() {

  return (
    <div className="nutriapp-recuperarsenha">

      <div className="CardVertical">
        <div>
          <h1>NUTRIAPP</h1>
        </div>
        <div>
          <p>Recuperação de Senha</p>
        </div>
        <div>
          <p>Digite seu endereço de e-mail e depois click no botão "Enviar" para que possamos
            lhe enviar um e-mail com as instruções para redefinição de senha.</p>
        </div>


        <div className="Email">
          <span className="p-float-label p-input-icon-left" >
            <i className="pi pi-envelope" id="userIcon" />
            <InputText id="lefticon" value="" />
            <label htmlFor="lefticon">E-mail</label>
          </span>
        </div>




        <div className="p-d-flex p-jc-center" style={{ width: "100%" }}>
          <div className="p-mr-2">
            <Button label="Enviar" icon="pi pi-send" iconPos="left" />
          </div>
          <div className="p-mr-2">
            <Button label="Cancelar" icon="pi pi-times-circle" iconPos="left" />
          </div>

        </div>

      </div>

    </div>
  );
}

export default Recuperacao