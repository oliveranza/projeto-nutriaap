import "./Tratamento.css";
import 'primeflex/primeflex.css';

import { useEffect, useState } from "react";
import BarraDeMenu from "../../meusComponentes/BarraDeMenu/BarraDeMenu";
import { useParams } from "react-router-dom";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ScrollPanel } from 'primereact/scrollpanel';

import api from "../../../services/api";
import MenuTratamento from "../../meusComponentes/menuTratamento/MenuTratamento";

export default function Tratamento(){

    const {id} = useParams();
    
    const [nome, setNome] = useState("")
    const [sobreNome, setSobrenome] = useState("")

    const example = [
        {id: 1, titulo:"linha 1", data:"7-10-2021"},
        {id: 2, titulo:"linha 2", data:"8-10-2021"},
        {id: 3, titulo:"linha 3", data:"9-10-2021"},
    ]
    
    useEffect(() =>{
     api.get(`/api/paciente/${id}`)
     .then(res =>{
         const paci = res.data;
         setNome(paci.nome);
         setSobrenome(paci.sobreNome);
     })
     .catch(erro=>{console.log(erro)})
    },[id])

    return(
      <div className="nutriapp-tratamento">
        <BarraDeMenu tab={1} tipo="nutri"/>
        
        <div className="corpo">
            
            <div className="ladoEsquerdo">
                <MenuTratamento nome={nome} sobreNome={sobreNome} id={id} aba={1}/>
            </div>
            
            <div className="ladoDireito">
                <ScrollPanel >

                
                <div className="tabela">
                    <h4 htmlFor="">Avaliações de Anamnese</h4>
                    <DataTable value={example} responsiveLayout="scroll" size={"small"} showGridlines stripedRows selectionMode="single" selection={""}
                    onSelectionChange={""/*e => setSelectedProduct3(e.value)*/} dataKey="id" onRowSelect={""} onRowUnselect={""}>
                        <Column field="titulo" header="Título"></Column>
                        <Column field="data" header="Data"></Column>
                    </DataTable>
                </div>

                <div className="tabela">
                    <h4 htmlFor="">Avaliações Antropométrica</h4>
                    <DataTable value={example} responsiveLayout="scroll" size={"small"} showGridlines stripedRows selectionMode="single" selection={""}
                    onSelectionChange={""/*e => setSelectedProduct3(e.value)*/} dataKey="id" onRowSelect={""} onRowUnselect={""}>
                        <Column field="titulo" header="Título"></Column>
                        <Column field="data" header="Data"></Column>
                    </DataTable>
                </div>

                <div className="tabela">
                    <h4 htmlFor="">Exames</h4>
                    <DataTable value={example} responsiveLayout="scroll" size={"small"} showGridlines stripedRows selectionMode="single" selection={""}
                    onSelectionChange={""/*e => setSelectedProduct3(e.value)*/} dataKey="id" onRowSelect={""} onRowUnselect={""}>
                        <Column field="titulo" header="Título"></Column>
                        <Column field="data" header="Data"></Column>
                    </DataTable>
                </div>

                <div className="tabela">
                    <h4 htmlFor="">Gasto Energetico</h4>
                    <DataTable value={example} responsiveLayout="scroll" size={"small"} showGridlines stripedRows selectionMode="single" selection={""}
                    onSelectionChange={""/*e => setSelectedProduct3(e.value)*/} dataKey="id" onRowSelect={""} onRowUnselect={""}>
                        <Column field="titulo" header="Título"></Column>
                        <Column field="data" header="Data"></Column>
                    </DataTable>
                </div>

                <div className="tabela">
                    <h4 htmlFor="">Plano Alimentar</h4>
                    <DataTable value={example} responsiveLayout="scroll" size={"small"} showGridlines stripedRows selectionMode="single" selection={""}
                    onSelectionChange={""/*e => setSelectedProduct3(e.value)*/} dataKey="id" onRowSelect={""} onRowUnselect={""}>
                        <Column field="titulo" header="Título"></Column>
                        <Column field="data" header="Data"></Column>
                    </DataTable>
                </div>

                <div className="tabela">
                    <h4 htmlFor="">Recordatorio Alimentar</h4>
                    <DataTable value={example} responsiveLayout="scroll" size={"small"} showGridlines stripedRows selectionMode="single" selection={""}
                    onSelectionChange={""/*e => setSelectedProduct3(e.value)*/} dataKey="id" onRowSelect={""} onRowUnselect={""}>
                        <Column field="titulo" header="Título"></Column>
                        <Column field="data" header="Data"></Column>
                    </DataTable>
                </div>

                <div className="tabela">
                    <h4 htmlFor="">Suplementação</h4>
                    <DataTable value={example} responsiveLayout="scroll" size={"small"} showGridlines stripedRows selectionMode="single" selection={""}
                    onSelectionChange={""/*e => setSelectedProduct3(e.value)*/} dataKey="id" onRowSelect={""} onRowUnselect={""}>
                        <Column field="titulo" header="Título"></Column>
                        <Column field="data" header="Data"></Column>
                    </DataTable>
                </div>

                </ScrollPanel>
            </div>


        </div>

      
      </div>
    )
}