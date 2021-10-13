import React,{ useState, useEffect } from 'react';
import {Link} from 'react-router-dom'
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

import 'primeflex/primeflex.css';
import './ListagemAdmin.css'

import BarraDeMenu from '../../meusComponentes/BarraDeMenu/BarraDeMenu';
import Card from '../../meusComponentes/Card/Card';
import defaultAdmin from "../../../assets/defaultAdmin.png"
import api from '../../../services/api';




function ListagemAdmin() {


  /** ================================================================================
   *                              menu
   */
  const itemsMenu = [
    { label: 'Início', icon: 'pi pi-home', url: '/inicioAdmin' },
    { label: 'Profissionais de Nutrição', icon: 'pi pi-id-card', url: '/listaNutri' },
    { label: 'Administradores', icon: 'pi pi-users', url: '/listaAdmin' },
    { label: 'Relatórios', icon: 'pi pi-chart-line', url: '/inicioNutri' },
  ]
  /** ================================================================================*/
  


  /** =================================================================================
   *                            conexão com back
   */

  const [nutris, setNutri] = useState([]);

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

   useEffect(()=>{
     fetch('./nutricionistas.json',{
       headers:{
            Accept: "application/json"
       }
     }).then(res => res.json())
      .then(res => setNutri(res.data))
   },[]);


  /* ==================================================================================
    pssando as informações dos nutris para dentro dos cards (LISTAGEM)
  */
  // const fotos = [foto1, foto2, foto3, foto4, foto5]

  let cards = [];
  for (let i = 0; i < nutris.length; i++) {
    cards.push(<Card
      foto={defaultAdmin}
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
    <div className="nutriapp-ListagemAdmin">
      <BarraDeMenu tab={2} items={itemsMenu} />

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
            <Link to=""><Button id="bt" label="cadastrar Administrador" icon="pi pi-id-card" iconPos="left" /></Link>
          </div>

        </div>
        <div className="fundobranco">
          {cards}
        </div>
      </div>
    </div>
  );

}

export default ListagemAdmin