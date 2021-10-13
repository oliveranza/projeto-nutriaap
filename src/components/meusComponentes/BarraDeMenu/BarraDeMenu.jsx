import React,{Component} from 'react'
import { Link } from 'react-router-dom'

import { Button } from 'primereact/button'
import { TabMenu } from 'primereact/tabmenu'

import './BarraDeMenu.css'

export default class BarraDeMenu extends Component {

    // const menu = [
    //     { label: 'Início', icon: 'pi pi-home', url: '/inicioAdmin'},
    //     { label: 'Profissionais de Nutrição', icon: 'pi pi-id-card', url: '/listaNutri',  },
    //     { label: 'Administradores', icon: 'pi pi-users', url: '' },
    //     { label: 'Relatórios', icon: 'pi pi-chart-line', url: '/inicioNutri' },
    // ]
    
    constructor(props) {
        super(props)
        this.itemsDefault = [
            { label: 'Inicio', icon: 'pi pi-home', url: '/inicioNutri' },
            { label: 'Pacientes', icon: 'pi pi-user', url: '' },
            { label: 'Agenda', icon: 'pi pi-calendar', url: '' },
            { label: 'Chat', icon: 'pi pi-comments', url: '/inicioAdmin' }
        ]

        this.itemsAdmin = [
                { label: 'Início', icon: 'pi pi-home', url: '/inicioAdmin'},
                { label: 'Profissionais de Nutrição', icon: 'pi pi-id-card', url: '/listaNutri',  },
                { label: 'Administradores', icon: 'pi pi-users', url: '/listaAdmin' },
                { label: 'Relatórios', icon: 'pi pi-chart-line', url: '/inicioNutri' },
            ]
        
        this.state = {
            items: this.selectItems() || this.itemsDefault,
            tab: this.props.tab || 0,
        }

        
       
        
    };

    selectItems(){
        if(this.props.tipo==="nutri"){
            return  this.itemsDefault
        }else if(this.props.tipo ==="admin"){
            return this.itemsAdmin
        }
    }

    selectTab(e) {
        this.setState({ tab: e })
    };
    

    render() {
        return (
            this.selectItems(),
            <div className="nutriapp-menu" >
                <h1 style={{ "color": "white" }}>NUTRIAPP</h1>
                <TabMenu model={this.state.items} activeIndex={this.state.tab} onTabChange={e => this.selectTab(e.index)} id="centermenu" />
                <div id="endmenu">
                    <i className="pi pi-bell" />
                    <Link to="/login"><Button label="Logout" icon="pi pi-sign-out"  style={{ "backgroundColor": "#22b2aa", "borderColor": "transparent" }} /></Link>
                </div>
            </div>


        )
    }
}