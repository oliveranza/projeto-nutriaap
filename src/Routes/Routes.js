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
import StoreProvider from "../services/Porvider";
import Tratamento from "../Pages/tratamento/resumoTratamento/ResumoTratamento";
import Anamnese from "../Pages/tratamento/anamnese/Anamnese";
import Antropometrica from "../Pages/tratamento/antropometrica/Antropometrica";
import Exames from "../Pages/tratamento/exames/Exames";
import GastoEnergetico from "../Pages/tratamento/gastoEnergetico/GastoEnergetico";
import PlanoAlimentar from "../Pages/tratamento/planoAlimentar/PlanoAlimentar";
import Suplementacao from "../Pages/tratamento/suplementacao/Suplementacao";
import RecordatorioAlimentar from "../Pages/tratamento/recordatorioAlimentar/RecordatorioAlimentar";
import Agenda from "../Pages/agenda/Agenda";



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
                <PrivateRoute path="/agenda" component={Agenda} />
                <PrivateRoute path="/cadastroNutri" component={CadastroNutri} />
                <PrivateRoute path="/cadastroAdmin" component={CadastroAdmin} />
                <PrivateRoute path="/cadastroPaciente" component={CadastroPaciente} />
                <PrivateRoute path="/nutri/:id" component={CadastroNutri} />
                <PrivateRoute path="/admin/:id" component={CadastroAdmin} />
                <PrivateRoute path="/paciente/:id" exact component={CadastroPaciente} />
                <PrivateRoute path="/paciente/tratamento/:id" exact component={Tratamento} />
                <PrivateRoute path="/paciente/tratamento/anamnese/:id" exact component={Anamnese} />
                <PrivateRoute path="/paciente/tratamento/anamnese/:id/edit/:idAvaliacao" component={Anamnese} />
                <PrivateRoute path="/paciente/tratamento/antropometrica/:id" component={Antropometrica} />
                <PrivateRoute path="/paciente/tratamento/exames/:id" component={Exames} />
                <PrivateRoute path="/paciente/tratamento/gastoEnergetico/:id" component={GastoEnergetico} />
                <PrivateRoute path="/paciente/tratamento/planoAlimentar/:id" component={PlanoAlimentar} />
                <PrivateRoute path="/paciente/tratamento/recordatorioAlimentar/:id" component={RecordatorioAlimentar} />
                <PrivateRoute path="/paciente/tratamento/suplementacao/:id" component={Suplementacao} />
            </StoreProvider>

        </Switch>
    </BrowserRouter>
);

export default Routes;