import './App.css';
import CadastroNutri from './components/Pages/cadastroNutri/CadastroNutri';
import InicioAdmin from './components/Pages/inicioAdmin/InicioAdmin';
import InicioNutri from './components/Pages/InicioNutri/InicioNutri';
import Login1 from './components/Pages/login/Login';
import Recuperacao from './components/Pages/Recupercaosenha/Recuperacao';
import ListagemNutri from './components/Pages/listagemNutri/ListagemNutri';






function App() {
    return (
        <div className="App">
            {/* <Login1/> */}
            {/* <Recuperacao/> */}
            {/* <InicioNutri/> */}
            {/* <InicioAdmin/> */}
            {/* <CadastroNutri/> */}
            <ListagemNutri/>

        </div>
    );
}

export default App;
