import { React } from "react";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { isAuthenticated } from "../../services/auth";
import CadastroNutri from "../Pages/cadastroNutri/CadastroNutri";
import InicioAdmin from "../Pages/inicioAdmin/InicioAdmin";
import InicioNutri from "../Pages/InicioNutri/InicioNutri";
import ListagemNutri from "../Pages/listagemNutri/ListagemNutri";
import Login from "../Pages/login/Login";
import Recuperacao from "../Pages/Recupercaosenha/Recuperacao";

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        isAuthenticated() ?
            <Component {...props} />
            : <Redirect to={{ pathname: "/", state: { from: props.location } }} />
    )} />
)


const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/login" component={Login} />
            <Route path="/recuperacao" component={Recuperacao} />
            <PrivateRoute path="/inicioNutri" component={InicioNutri} />
            <PrivateRoute path="/inicioAdmin" component={InicioAdmin} />
            <PrivateRoute path="/listaNutri" component={ListagemNutri} />
            <PrivateRoute path="/cadastroNutri" component={CadastroNutri} />
        </Switch>
    </BrowserRouter>
);

export default Routes;