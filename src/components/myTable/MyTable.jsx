import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { confirmPopup } from "primereact/confirmpopup";
import { Toast } from "primereact/toast";
import { useRef } from "react";

import "./MyTable.css";

function MyTable(props) {
  const toast = useRef(null);

  function confirmar(event) {
    confirmPopup({
      target: event.currentTarget,
      message: "Tem certeza que quer excluir?",
      icon: "pi pi-exclamation-triangle",
      accept: () =>
        toast.current.show({
          severity: "success",
          summary: "Excluido",
          detail: "Excluido com sucesso",
          life: 3000,
        }),
      reject: () =>
        toast.current.show({
          severity: "info",
          summary: "cancelado",
          life: 2000,
        }),
    });
    console.log("excluido");
  }

  function editar() {
    return toast.current.show({
      severity: "info",
      summary: "provisorio",
      detail: "Aqui vai a função editar",
      life: 5000,
    });
  }

  const botoes = (
    <div className="botoes">
      <button onClick={editar} className="pi pi-pencil"></button>
      <button onClick={confirmar} className="pi pi-trash"></button>
    </div>
  );

  return (
    <div className="tabela">
      <Toast ref={toast} />
      <label htmlFor="">{props.label}</label>
      <DataTable
        value={props.dados}
        responsiveLayout="scroll"
        size="small"
        showGridlines
        stripedRows
        dataKey="id"
        emptyMessage="Nenhum Registro"
        // selectionMode="single"
        // selection={""}
        // onSelectionChange={"" /*e => setSelectedProduct3(e.value)*/}
        // onRowSelect={""}
        // onRowUnselect={""}
      >
        {props.colunas.map((col, i) => {
          return (
            <Column key={i} field={col} header={col} style={{ width: props.colWidth[i]}}></Column>
          );
        })}
        <Column body={() => botoes} style={{ width: "10%" }}></Column>
      </DataTable>
    </div>
  )
} export default MyTable;
