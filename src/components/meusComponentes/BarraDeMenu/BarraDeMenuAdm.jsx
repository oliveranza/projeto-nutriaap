import React from 'react'
import { Menubar } from 'primereact/menubar';
import { Button } from 'primereact/button';
import { Component } from 'react';


export default class BarraDeMenu extends Component {

    constructor(props) {
        super(props)
        this.itemsDefault = [
            { label: 'Inicio', icon: 'pi pi-home', url: '' },
            { label: 'Profissionais De Nutrição', icon: 'pi pi- usuário', url: '' },
            { label: 'Administradores', icon: 'pi usuários-pi-', url: '' },
            { label: 'Relatorios', icon: 'pi pi- arquivo', url: '' }
        ]

        this.state = {
            items: this.props.items || this.itemsDefault,
        }

    };

    mudarState() {

    }


    render() {
        return (
            <div className="Menu" >
                <Menubar className="MBar" style={{ "backgroundColor": "#22b2aa", "width": "100vw" }}
                    start={<h1 style={{ "color": "white" }}>NUTRIAPP</h1>}
                    model={this.state.items}
                    end={<div style={{ "display": "flex", "justifyContent": "center", "alignItems": "center", "flexDirection": "row" }}>
                        <div style={{ "width": "40px" }}>
                            <i className="pi pi-bell" />
                        </div>
                        <Button label="Logout" icon="pi pi-sign-out"
                            style={{ "backgroundColor": "#22b2aa", "borderColor": "transparent" }} />
                    </div>}
                />
            </div>


        )
    }
}