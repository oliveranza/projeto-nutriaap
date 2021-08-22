import { React } from "react";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import CadastroNutri from "../Pages/cadastroNutri/CadastroNutri";
import InicioAdmin from "../Pages/inicioAdmin/InicioAdmin";
import InicioNutri from "../Pages/InicioNutri/InicioNutri";
import Login from "../Pages/login/Login";
import Recuperacao from "../Pages/Recupercaosenha/Recuperacao";


const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/login" component={Login} />
            <Route path="/recuperacao" component={Recuperacao} />
            <Route path="/inicioNutri" component={InicioNutri} />
            <Route path="/inicioAdmin" component={InicioAdmin} />
            <Route path="/cadastroNutri" component={CadastroNutri} />
        </Switch>
    </BrowserRouter>
);

export default Routes;