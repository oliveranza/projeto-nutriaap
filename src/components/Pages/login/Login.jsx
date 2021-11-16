import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { InputText } from 'primereact/inputtext';
import { InputSwitch } from 'primereact/inputswitch';
import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';

import StoreContext from '../../../services/Context';

import './Login.css';

function Login() {
    const [valor, setState] = useState(false);
    const {token1 ,setToken } = useContext(StoreContext);
    const history = useHistory();

    let [email, setEmail] = useState();
    let [senha, setSenha] = useState();
    let [eye, setEye] = useState("pi pi-eye");
    let [visible, setVisible] = useState("password");

    function visivel() {
        if (eye === "pi pi-eye") {
            setEye("pi pi-eye-slash")
            setVisible("")
        }
        else {
            setEye("pi pi-eye")
            setVisible("password")
        }
    }

    function fazerLogin(email1, senha1) {
        if (email1 === 'admin' && senha1 === 'admin') {
            return { token: '1234' };
        } else {
            alert('Email e/ou senha invalidos')
            return { error: 'Email e/ou senha invalidos' }
        }

    }



    function onSubmitHandler(event) {

        const { token } = fazerLogin(email, senha);
        if (token) {
            setToken(token)
            console.log(token1)
            return history.push('/inicioAdmin')
        } else {
            setSenha("")
        }
    }
    function keyHandler(e){
        if(e.code ==="Enter" || e.code === "NumpadEnter")
            onSubmitHandler()
    }
    
    
    return (
        setToken(null),
        <div className="nutriapp-login">

            <div className="CardVertical">

                <h1>NUTRIAPP</h1>

                <div className="Logo">
                    {/* <img alt="logo" src=""> NUTRIAPP</img> */}
                </div>


                <div className="Email">
                    <span className="p-float-label p-input-icon-left p-input-icon-right" >
                        <i className="pi pi-user" id="userIcon" />
                        <i/>
                        <InputText id="campoemail" type="text" value={email} onChange={e => setEmail(e.target.value)}  />
                        <label htmlFor="campoemail" >E-mail</label>
                    </span>
                </div>



                <div className="Senha">
                    <span className="p-float-label p-input-icon-left p-input-icon-right">
                        <i className="pi pi-lock" id="senhaIcon" />
                        <InputText id="camposenha" type={visible} value={senha} onKeyDown={(e) => keyHandler(e)} onChange={e => setSenha(e.target.value)} />
                        <i><button className={eye} id="eyeIcon" onClick={e => visivel()} style={{ background: "none", border: "none" }} /></i>
                        <label htmlFor="lefticon">Senha</label>
                    </span>

                </div>

                <div className="DivChave">
                    <label htmlFor="chave">Funcionário</label>
                    <InputSwitch id="chave" checked={valor} onChange={e => setState(!valor)} />
                </div>
                <div className="esqueciSenha">
                    <Link to="/recuperacao">Esqueci a senha</Link>
                </div>

                <div className="Botao">
                    <Button id="bt" label="Entrar" icon="pi pi-sign-in" type="submit" onClick={onSubmitHandler}  iconPos="left"  />
                </div>

            </div>

        </div>
    );
}

export default Login