import React from 'react'
import { Menubar } from 'primereact/menubar';
import { Button } from 'primereact/button';


export default function MenuBar(props) {

    let items = props.items;

    return (
        <div className="Menu">
            <Menubar className="MBar" style={{"backgroundColor":"#22b2aa", "width":"100vw"}}
                start={<h1 style={{"color":"white"}}>NUTRIAPP</h1>}
                model={items}
                end={<div style={{"display":"flex","justifyContent":"center","alignItems":"center", "flexDirection":"row"}}>
                        <div style={{"width":"40px"}}>
                            <i className="pi pi-bell"/>
                        </div>
                        <Button label="Logout" icon="pi pi-sign-out"
                                style={{"backgroundColor":"#22b2aa", "borderColor":"transparent"}}/>
                    </div>}
            />
        </div>


    )
}