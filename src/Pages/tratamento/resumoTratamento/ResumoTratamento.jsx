import "./ResumoTratamento.css";
import 'primeflex/primeflex.css';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

import Tratamento from "../../../components/tratamento/Tratamento";

export default function ResumoTratamento(){

    const example = [
        {id: 1, titulo:"linha 1", data:"7-10-2021"},
        {id: 2, titulo:"linha 2", data:"8-10-2021"},
        {id: 3, titulo:"linha 3", data:"9-10-2021"},
    ]

    return(
        <div className="resumo-tratamento">

            <Tratamento abaMenu={1}>
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
            </Tratamento>
        </div>
    );
}
