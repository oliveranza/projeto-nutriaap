import React, { useState } from 'react'
import './InicioNutri.css';

import MenuBar from '../../MenuBar'
import { TabMenu } from 'primereact/tabmenu'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button';
import { Chart } from 'primereact/chart';


export default function InicioNutri() {

    // informação do menubar
    const items = [
        { label: 'Inicio', icon: 'pi pi-home', command: (event) => { window.location.hash = "/fileupload"; } },
        { label: 'Pacientes', icon: 'pi pi-user', url: '' },
        { label: 'Agenda', icon: 'pi pi-calendar', url: '' },
        { label: 'Chat', icon: 'pi pi-comments', url: '' }
    ];

    // informação das tabs
    const tabs = [{ label: "Hoje", icon: 'pi pi-calendar' },
    { label: 'Amanhã', icon: 'pi pi-calendar' },
    { label: 'Esta Semana', icon: 'pi pi-calendar' }
    ];
    let t = 0;
    function selectTab(e) { t = e }


    // informações da tabela
    function getConsultas() {
        let consultas1 = []
        let pacientes = ["Izabela", "Sandra", "João", "Crispen", "Sheldon", "Wellington", "José"]
        let p = 0;
        for (let i = 7; i < 24; i++) {
            consultas1.push({
                horario: `${(i < 10) ? ("0" + i + ":00") : (i + ":00")}`,
                descricao: `${(i > 6 && i % 3 == 0) ? (`Consulta com o(a) Sr(a). ${pacientes[p++]}`) : ("")}`
            })
        }
        return consultas1
    }
    const [consultas, setConsultas] = useState(getConsultas());

    // dados para o grafico de pizza
    
        const chartData = {
            labels: ['A', 'B', 'C'],
            datasets: [{
                data: [300, 50, 100],
                backgroundColor: ["#42A5F5", "#66BB6A", "#FFA726"],
                hoverBackgroundColor: ["#64B5F6", "#81C784", "#FFB74D"]}
            ]
        }

        const lightOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: '#495057'
                    }
                }
            }
        }

    // dados para o grafico de linhas
    const basicData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'First Dataset',
                data: [65, 59, 80, 81, 56, 55, 40],
                fill: false,
                borderColor: '#42A5F5',
                tension: .4
            },
            {
                label: 'Second Dataset',
                data: [28, 48, 40, 19, 86, 27, 90],
                fill: false,
                borderColor: '#FFA726',
                tension: .4
            }
        ]
    }


        return (
            <div className="Inicio">
                <MenuBar items={items}></MenuBar>
                <div className="InicioBody">


                    <div className="LadoEsquerdo">

                        <h3>Consultas Agendadas</h3>

                        <div className="DivTabela">

                            <TabMenu model={tabs} activeIndex={tabs[t]} onTabChange={e => selectTab(e.index)} id="tabMenu" />

                            <DataTable id="tabela1" value={consultas} resizableColumns columnResizeMode="fit" showGridlines stripedRows>
                                <Column field="horario" header="Horário" style={{ width: '15%' }}></Column>
                                <Column field="descricao" header="Descrição" style={{ width: '85%' }}></Column>
                            </DataTable>

                        </div>
                    </div>



                    <div className="LadoDireito">
                        <div className="DivBotoes">
                            <Button id="btE" label={<p>Cadastrar<br />Paciente</p>} icon="pi pi-user-plus" iconPos="top"></Button>
                            <Button id="btD" label={<p>Marcar<br />Consulta</p>} icon="pi pi-plus" iconPos="top"></Button>
                        </div>
                        <div className="divPizza">
                            <label >Metrica 1</label>
                            <Chart id="pizza" type="pie" data={chartData} options={lightOptions}
                                                style={{"position":"relative","width":"70%"}}/>
                        </div>
                        <div className="divLinhas">
                            <label>Metrica 2</label>
                            <Chart type="line" data={basicData} options="" />
                        </div>


                    </div>
                </div>
            </div>

        )
    }