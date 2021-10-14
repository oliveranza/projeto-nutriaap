import React,{ useState, useEffect } from 'react';
import {Link} from 'react-router-dom'
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

import 'primeflex/primeflex.css';
import './ListagemNutri.css'

import BarraDeMenu from '../../meusComponentes/BarraDeMenu/BarraDeMenu';
import Card from '../../meusComponentes/Card/Card';
// import foto1 from "../../../assets/female.png"
// import foto2 from "../../../assets/foto1.png"
// import foto3 from "../../../assets/foto3.png"
// import foto4 from "../../../assets/foto2.png"
// import foto5 from "../../../assets/foto6.png"
import api from '../../../services/api';




function ListagemNutri() {
  
  const [nutris, setNutri] = useState([]);

  /** =================================================================================
   *                            conexão com back
   */

  useEffect(() => {
    api.get("http://localhost:8080/api/nutricionistas")
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


  /* ==================================================================================
    pssando as informações dos nutris para dentro dos cards (LISTAGEM)
  */
  // const fotos = [foto1, foto2, foto3, foto4, foto5]

  let cards = [];
  for (let i = 0; i < nutris.length; i++) {
      cards.push(<Card key={nutris[i].id}
      // foto={fotos[i]}
      id={nutris[i].id}
      nome={nutris[i].nome+" "+nutris[i].sobreNome}
      dtNasc={nutris[i].dataNasc}
      genero={nutris[i].genero}
      crn={nutris[i].crn}
      tel={nutris[i].cell}
      email={nutris[i].email}
    />)
  }
/**==================================================================================== */


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
            <Link to="/cadastroNutri"><Button id="bt" label="cadastrar Nutricionista" icon="pi pi-id-card" iconPos="left" /></Link>
          </div>

        </div>
        <div className="fundobranco">
          {cards}
        </div>
      </div>
    </div>
  );

}

export default ListagemNutri