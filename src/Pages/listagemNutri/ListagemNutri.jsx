import React,{ useState, useEffect } from 'react';
import {Link} from 'react-router-dom'
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

import 'primeflex/primeflex.css';
import './ListagemNutri.css'

import BarraDeMenu from '../../components/BarraDeMenu/BarraDeMenu';
import Card from '../../components/Card/Card';
// import foto1 from "../../assets/female.png"
import api from '../../services/api';




function ListagemNutri() {
  
  const [nutris, setNutri] = useState([]);

  /** =================================================================================
   *                            conexão com back
   */

  useEffect(() => {
    api.get("http://localhost:8080/api/nutricionista/getAll")
      .then((response) => {
        console.log(response.data)
        setNutri(response.data);
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
  //    fetch('./nutricionistas.json',{
  //      headers:{
  //           Accept: "application/json"
  //      }
  //    }).then(res => res.json())
  //     .then(res => setNutri(res.data))
  //  },[]);




  return (
    <div className="nutriapp-ListagemNutri">
      <BarraDeMenu tab={1} tipo="admin" />

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
            <Link to="/cadastroNutri"><Button id="bt" label="cadastrar Nutricionista" icon="pi pi-id-card" iconPos="left" data-toggle="tooltip" title="Cadastrar um(a) Novo(a)" /></Link>
          </div>

        </div>
        <div className="fundobranco">
          {//carrega essa mensagem se nao tiver usuários para listar (usando operador ternário)
          nutris.length===0?    
          <h3>Nenhum profissional de nutrição cadastrado.😅 Cadastre agora clicando no botão ao lado ➔  </h3>:

          //do contrario preenche os cards com os usuários e exibe na tela
          nutris.map((nutri, i)=> 
          <Card tipoCard="nutri"
            key={i} 
            id={nutri.id}
            nome={nutri.nome+" "+nutri.sobreNome}
            dtNasc={nutri.dataNasc}
            genero={nutri.genero}
            crn={nutri.crn}
            tel={nutri.cell}
            email={nutri.email}/>
           )}
          
        </div>
      </div>
    </div>
  );

}

export default ListagemNutri