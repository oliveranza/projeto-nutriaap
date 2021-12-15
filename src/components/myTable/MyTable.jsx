import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { confirmPopup } from "primereact/confirmpopup";
import { Toast } from "primereact/toast";
import { useRef} from "react";

import "./MyTable.css";
import api from "../../services/api";
import { useHistory } from "react-router";


function MyTable(props) {
  
  let i = 0
  const toast = useRef(null);
  const history = useHistory();

  function confirmar(event, idAvalia, titulo) {
    confirmPopup({
      target: event.currentTarget,
      message: `Tem certeza que quer excluir ${titulo}?`,
      icon: "pi pi-exclamation-triangle",
      accept: () => excluir(idAvalia),
      reject: () =>
        toast.current.show({
          severity: "info",
          summary: "cancelado",
          life: 2000,
        }),
    });
  }
  async function excluir(idAva) {
    try {
      const res = await api.delete(`api/tratamento/${props.idPaciente}/${idAva}`)
      console.log(res);
      toast.current.show({
        severity: "success",
        summary: "Excluido",
        detail: "Excluido com sucesso",
        life: 3000,
      })
      window.location.reload()
      
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: error.message,
        life: 3000,
      })
      
    }
  }


  function editar(idAva, tipo) {
    history.push(`${tipo}/${props.idPaciente}/edit/${idAva}`)
  }

  function botoes(rowdata){
    
    return(
      <div className="botoesTabela">
       {props.edit?<button name="edit"  onClick={e => editar(rowdata.id, rowdata.tipo)} className="pi pi-pencil"/>:null}
       {props.delete?<button name="delete" onClick={(e) => confirmar(e,rowdata.id,rowdata.titulo)} className="pi pi-trash"/>:null}
       {props.remove?<button type="button" name="remove" onClick={() => props.handleRemove(rowdata)} className="pi pi-times"  />:null}
      </div>
    )
  };

  return (
    <div className="tabela">
      <Toast ref={toast} />
      <label htmlFor={props.label}>{props.label}</label>
      <DataTable
        value={props.value}
        responsiveLayout="scroll"
        size="small"
        showGridlines
        stripedRows
        // dataKey="id"
        emptyMessage="Nenhum Registro"
        sortField={[props.sort]}
        sortOrder={props.ordem}
      >
        {props.colunas.map((col, i) => {
          return (
            <Column key={i} field={col} header={`${col[0].toUpperCase()}${col.substr(1).replace(/cao/,"ção")}`} style={{ width: props.colWidth[i]}}></Column>
          );
        })}
        <Column header="Ações" body={botoes} style={{ width: '10%' }}></Column>
      </DataTable>
    </div>
  )
} export default MyTable;
