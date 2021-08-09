import React, { useState } from 'react'
import './login.css'
import { MdEmail, MdLock } from "react-icons/md";
import { HiEyeOff, HiEye } from "react-icons/hi";
import Link from '@material-ui/core/Link';

/* ESTE INDEX REPRESENTA A PAG LOGIN*/

//essa func terá o mesmo nome da pasta Login
function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [show, setShow] = useState(false);
    const handleClick = (e) => {
        e.preventDefault()
        setShow(!show);
    }


    return (
        //Div prinicpal (PAI)
        <div className="login">

            {/*  <div className="login-logo">
                 <img src="https://www.kindpng.com/picc/m/500-5006461_imagem-de-frutas-png-transparent-png.png"></img>
            </div> */}

            <div className="login-right">
                <h1>Nutri App</h1>
                <div className="login-loginInputEmail">
                    <MdEmail />
                    <input type="email" placeholder="Digite seu e-mail"
                        value={email}
                        onChange={e => setEmail(e.target.value)} />

                </div>

                <div className="login-loginInputSenha">
                    <MdLock />
                    <input type={show ? "text" : "password"} placeholder="Digite sua senha" value={password} onChange={e => setPassword(e.target.value)} />
                    <div className="login-yey">
                        {show ? (
                            <HiEye size={20}
                                onClick={handleClick} />
                        ) : (
                            <HiEyeOff size={20}
                                onClick={handleClick} />
                        )}

                    </div>
                </div>
                {/* <div className="esqueceuSenha">
                    <Link
                        component="button"
                        variant="body2"
                        onClick={() => {
                        }}
                    >
                        Esqueceu a senha?
                    </Link>
                </div> */}

                <button type="submit">Entrar</button>
            </div>
        </div>

    )
}
export default Login;