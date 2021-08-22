import 'primeflex/primeflex.css';
import './ListagemNutri.css'

import BarraDeMenu from '../../meusComponentes/BarraDeMenu/BarraDeMenu';
import Card from '../../meusComponentes/Card/Card';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import foto1 from "../../../assets/female.png"
import foto2 from "../../../assets/foto1.png"
import foto3 from "../../../assets/foto3.png"
import foto4 from "../../../assets/foto2.png"



function ListagemNutri() {

  const itemsMenu = [
    { label: 'Início', icon: 'pi pi-home', url: '/inicioAdmin' },
    { label: 'Profissionais de Nutrição', icon: 'pi pi-id-card', url: '/listaNutri' },
    { label: 'Administradores', icon: 'pi pi-users', url: '' },
    { label: 'Relatórios', icon: 'pi pi-chart-line', url: '' },
  ]


  /* é só carrega as informações do back e passa os valores
     das informações dos nutricionistas para dentro de cada propriedade do Card
  */
  const fotos = [foto1,foto2,foto3,foto4]

  let cards = [];
  for (let i = 0; i < 4; i++) {
    cards.push(<Card
        foto={fotos[i]}
        nome="Nome de Teste da Silva"
        dtNasc="25/01/1999"
        genero="Masculino"
        crn="0 12345/x"
        tel="(83) 9 9999-9999"
        email="exemplo@email.com"
    />)
  }



  return (

    <div className="nutriapp-ListagemNutri">
      <BarraDeMenu tab={1} items={itemsMenu} />

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
            <Button id="bt" label="cadastrar Nutricionista" icon="pi pi-id-card" iconPos="left" />
          </div>

        </div>


        {cards}
      </div>





    </div>
  );

}

export default ListagemNutri