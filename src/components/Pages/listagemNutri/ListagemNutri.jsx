import 'primeflex/primeflex.css';
import './ListagemNutri.css'

import BarraDeMenu from '../../meusComponentes/BarraDeMenu/BarraDeMenu';
import Card from '../../meusComponentes/Card/Card';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';




function ListagemNutri() {

  const itemsMenu = [
    { label: 'Início', icon: 'pi pi-home', url: '/inicioAdmin' },
    { label: 'Profissionais de Nutrição', icon: 'pi pi-id-card', url: '/listaNutri' },
    { label: 'Administradores', icon: 'pi pi-users', url: '' },
    { label: 'Relatórios', icon: 'pi pi-chart-line', url: '' },
  ]


  return (

    <div className="nutriapp-ListagemNutri">
      <BarraDeMenu tab={1} items={itemsMenu} />

      <div className='nutriapp-listagem-inicio'>

        <div className='botao'>

          <Button id="bt" label="cadastrar Nutricionista" icon="pi pi-id-card" iconPos="left" />
        </div>

        <div className='search'>

          <span className="p-input-icon-left">
            <i className="pi pi-search" />
            <InputText  placeholder="Search" />
          </span>
        </div>

      </div>

      <div className='cards-listagem'>
        <Card>
          <div className='dados'>
            <h5>Nome:</h5>
            <h5>Data Nasc:</h5>
            <h5>Gênero:</h5>
            <h5>Crn:</h5>
            <h5>Telefone:</h5>
            <h5>E-mail:</h5>


          </div>

          <div className='btGrande'>
             <Button id="btDesempenho" label="DESEMPENHO" icon="pi pi-chart-line" iconPos="left" />
            <Button id="btEmail" label="E-MAIL" icon="pi pi-envelope" iconPos="left" />
          </div>

          <div className='btPequeno'>
             <Button id="btPerfil" label="" icon="pi pi-user" iconPos="left" />
            <Button id="btApagar" label="" icon="pi pi-user-minus" iconPos="left" /> 
          </div>
        
        </Card>


      </div>

    </div>
  );

}

export default ListagemNutri