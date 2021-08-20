import React from 'react'
import { Menubar } from 'primereact/menubar'
import { Button } from 'primereact/button'
import { Component } from 'react'
import './BarraDeMenu.css'
import { TabMenu } from 'primereact/tabmenu'


export default class BarraDeMenu extends Component {

    constructor(props) {
        super(props)
        this.itemsDefault = [
            { label: 'Inicio', icon: 'pi pi-home', url: '' },
            { label: 'Pacientes', icon: 'pi pi-user', url: '' },
            { label: 'Agenda', icon: 'pi pi-calendar', url: '' },
            { label: 'Chat', icon: 'pi pi-comments', url: '' }
        ]

        this.state = {
            items: this.props.items || this.itemsDefault,
            tab: 0,
        }

    };
    selectTab(e) {
        this.setState({ tab: e })
    }


    render() {
        return (
            <div className="nutriapp-menu" >
                <h1 style={{ "color": "white" }}>NUTRIAPP</h1>
                <TabMenu model={this.state.items} activeIndex={this.state.tab} onTabChange={e => this.selectTab(e.index)} id="centermenu" />
                <div id="endmenu">
                    <i className="pi pi-bell" />
                    <Button label="Logout" icon="pi pi-sign-out" style={{ "backgroundColor": "#22b2aa", "borderColor": "transparent" }} />
                </div>
            </div>


        )
    }
}