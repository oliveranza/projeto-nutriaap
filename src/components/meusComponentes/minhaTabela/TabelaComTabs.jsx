import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { TabMenu } from 'primereact/tabmenu';
import React from 'react'
import { Component } from 'react'
import './TabelaComTabs.css'

export default class TabelaComTabs extends Component{
    
    constructor(props) {
        super(props)
       
        this.tabsDefault = props.tabs || [{ label: "Hoje", icon: 'pi pi-calendar' },
                    { label: 'Amanhã', icon: 'pi pi-calendar' },
                    { label: 'Esta Semana', icon: 'pi pi-calendar' }
        ];
        this.state={
            valorTabela: this.carregarTabHoje(),
            tab: 0,
        }
        
        
    }
    // const        valorTabela, setConsultas] = useState(carregarTabHoje());
    selectTab(e) {
        this.setState({tab: e })
    }
    
    carregarTabHoje() {
        let consultas1 = []
        let pacientes = ["Izabela", "Sandra", "João", "Crispen", "Sheldon", "Wellington", "José"]
        let p = 0;
        for (let i = 7; i < 24; i++) {
            consultas1.push({
                horario: `${(i < 10) ? ("0" + i + ":00") : (i + ":00")}`,
                descricao: `${(i > 6 && i % 3 === 0) ? (`Consulta com o(a) Sr(a). ${pacientes[p++]}`) : ("")}`
            })
        }
        return consultas1
    }


    render() {
        return (
            <>
                <h3>Consultas Agendadas</h3>
                <TabMenu model={this.tabsDefault} activeIndex={this.state.tab} onTabChange={e => this.selectTab(e.index)} id="tabMenu"/>

                <DataTable id="tabela1" value={this.state.valorTabela} resizableColumns columnResizeMode="fit" showGridlines stripedRows>
                    <Column field="horario" header="Horário" style={{ width: '15%' }}></Column>
                    <Column field="descricao" header="Descrição" style={{ width: '85%' }}></Column>
                </DataTable>
            </>
        )
    }
}