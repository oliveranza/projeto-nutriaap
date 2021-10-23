import { React } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";


import CadastroNutri from "../Pages/cadastroNutri/CadastroNutri";
import CadastroAdmin from "../Pages/cadastroAdmin/CadastroAdmin";
import InicioAdmin from "../Pages/inicioAdmin/InicioAdmin";
import InicioNutri from "../Pages/InicioNutri/InicioNutri";
import ListagemNutri from "../Pages/listagemNutri/ListagemNutri";
import ListagemAdmin from "../Pages/listagemAdmin/ListagemAdmin";
import Login from "../Pages/login/Login";
import Recuperacao from "../Pages/Recupercaosenha/Recuperacao";

import PrivateRoute from "./PrivateRoute"
import StoreProvider from "../../services/Porvider";



const Routes = () => (
    <BrowserRouter>
        <Switch>
            <StoreProvider>
                <Route path="/" exact component={Login} />
                <Route path="/login" component={Login} />
                <Route path="/recuperacao" component={Recuperacao} />
                <PrivateRoute path="/inicioNutri" component={InicioNutri} />
                <PrivateRoute path="/inicioAdmin" component={InicioAdmin} />
                <PrivateRoute path="/listaNutri" component={ListagemNutri} />
                <PrivateRoute path="/listaAdmin" component={ListagemAdmin} />
                <PrivateRoute path="/cadastroNutri" component={CadastroNutri} />
                <PrivateRoute path="/cadastroAdmin" component={CadastroAdmin} />
                <PrivateRoute path="/perfilNutri/:id" component={CadastroNutri} />
                <PrivateRoute path="/perfilAdmin/:id" component={CadastroAdmin} />
            </StoreProvider>

        </Switch>
    </BrowserRouter>
);

export default Routes;