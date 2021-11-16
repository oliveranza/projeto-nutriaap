import { React } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";


import CadastroNutri from "../Pages/cadastroNutri/CadastroNutri";
import CadastroAdmin from "../Pages/cadastroAdmin/CadastroAdmin";
import CadastroPaciente from "../Pages/cadastroPaciente/CadastroPaciente";
import InicioAdmin from "../Pages/inicioAdmin/InicioAdmin";
import InicioNutri from "../Pages/InicioNutri/InicioNutri";
import ListagemNutri from "../Pages/listagemNutri/ListagemNutri";
import ListagemAdmin from "../Pages/listagemAdmin/ListagemAdmin";
import ListagemPaciente from "../Pages/listagemPaciente/ListagemPaciente";
import Login from "../Pages/login/Login";
import Recuperacao from "../Pages/Recupercaosenha/Recuperacao";

import PrivateRoute from "./PrivateRoute"
import StoreProvider from "../../services/Porvider";
import Tratamento from "../Pages/tratamento/Tratamento";



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
                <PrivateRoute path="/listaPaciente" component={ListagemPaciente} />
                <PrivateRoute path="/cadastroNutri" component={CadastroNutri} />
                <PrivateRoute path="/cadastroAdmin" component={CadastroAdmin} />
                <PrivateRoute path="/cadastroPaciente" component={CadastroPaciente} />
                <PrivateRoute path="/nutri/:id" component={CadastroNutri} />
                <PrivateRoute path="/admin/:id" component={CadastroAdmin} />
                <PrivateRoute path="/paciente/:id" exact component={CadastroPaciente} />
                <PrivateRoute path="/paciente/tratamento/:id" component={Tratamento} />
            </StoreProvider>

        </Switch>
    </BrowserRouter>
);

export default Routes;