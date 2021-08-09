import './Login.css';
import { InputText } from 'primereact/inputtext';
import { InputSwitch } from 'primereact/inputswitch';
import { Button } from 'primereact/button';
import { useState } from 'react';


function Login() {
    const [valor, setState] = useState(false);

    const chavear = () => {
        return (
            valor ? false : true
        );
    }
    return (
        <div className="Container">

            <div className="CardVertical">

                <h1>NUTRIAPP</h1>

                <div className="Logo">
                    {/* <img alt="logo" src=""> NUTRIAPP</img> */}
                </div>


                <div className="Email">
                    <span className="p-float-label p-input-icon-left" >
                        <i className="pi pi-user" id="userIcon" />
                        <InputText id="lefticon" value="" onChange={e => setState()} />
                        <label htmlFor="lefticon">E-mail</label>
                    </span>
                </div>



                <div className="Senha">
                    <span className="p-float-label p-input-icon-left">
                        <i className="pi pi-lock" id="senhaIcon" />
                        <InputText id="lefticon" type="password" value="" />
                        <label htmlFor="lefticon">Senha</label>
                    </span>

                </div>

                <div className="DivChave">
                    <label htmlFor="chave">Funcionário</label>
                    <InputSwitch id="chave" checked={valor} onChange={e => setState(chavear())} />
                </div>
                <div className="esqueciSenha">
                    <a link>Esqueci a senha</a>
                </div>

                <div className="Botao">
                    <Button id="bt" label="Entrar" icon="pi pi-sign-in" iconPos="left" />
                </div>

            </div>

        </div>
    );
}

export default Login