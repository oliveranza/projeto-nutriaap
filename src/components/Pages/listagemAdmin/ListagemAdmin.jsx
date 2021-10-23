import React,{ useState, useEffect } from 'react';
import {Link} from 'react-router-dom'
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

import 'primeflex/primeflex.css';
import './ListagemAdmin.css'

import BarraDeMenu from '../../meusComponentes/BarraDeMenu/BarraDeMenu';
import Card from '../../meusComponentes/Card/Card';
// import foto1 from "../../../assets/female.png"
import api from '../../../services/api';




function ListagemAdmin() {
  
  const [admins, setAdmins] = useState([]);

  /** =================================================================================
   *                            conexão com back
   */

  useEffect(() => {
    api.get("http://localhost:8080/api/admin/getAll")
      .then((response) => {
        console.log(response.data)
        setAdmins(response.data);
      }).catch((err) => {
        console.log("ops! ocorreu um erro" + err)
      })
  }, []);
/**====================================================================================== */

/**
 * consumindo dados do aquivo json para teste
 *
 */

  //  useEffect(()=>{
  //    fetch('./administradores.json',{
  //      headers:{
  //           Accept: "application/json"
  //      }
  //    }).then(res => res.json())
  //     .then(res => setNutri(res.data))
  //  },[]);




  return (
    <div className="nutriapp-ListagemAdmin">
      <BarraDeMenu tab={2} tipo="admin" />

      <div className="corpo">

        <div className='header'>

          {/* barra de pesquisa*/}
          <div className='divPesquisa'>
            <span className="p-input-icon-left">
              <i className="pi pi-search" />
              <InputText className="pesquisa" placeholder="Digite para pesquisar" />
            </span>
          </div>

          <div className='botaocadastro'>
            <Link to="/cadastroAdmin"><Button id="bt" label="cadastrar Administrador(a)" icon="pi pi-id-card" iconPos="left" data-toggle="tooltip" title="Cadastrar um(a) Novo(a)"/></Link>
          </div>

        </div>
        <div className="fundobranco">
          {//carrega essa mensagem se nao tiver usuários para listar (usando operador ternário)
          admins.length===0?    
          <h3>Nenhum Administrador cadastrado.😅 Cadastre agora clicando no botão ao lado ➔  </h3>:

          //do contrario preenche os cards com os usuários e exibe na tela
          admins.map((admins, i)=> 
          <Card tipoCard="admin"
            key={i} 
            id={admins.id}
            nome={admins.nome+" "+admins.sobreNome}
            dtNasc={admins.dataNasc}
            genero={admins.genero}
            tel={admins.cell}
            email={admins.email}/>
           )}
          
        </div>
      </div>
    </div>
  );

}

export default ListagemAdmin