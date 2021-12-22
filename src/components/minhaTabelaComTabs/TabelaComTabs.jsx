import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { TabMenu } from "primereact/tabmenu";
import React, { useState } from "react";
import "./TabelaComTabs.css";

export default function TabelaComTabs(props) {
  const tabsDefault = props.tabs || [
    { label: "Hoje", icon: "pi pi-calendar" },
    { label: "Amanhã", icon: "pi pi-calendar" },
    { label: "Esta Semana", icon: "pi pi-calendar" },
  ];

  function carregarTabHoje() {
    let consultas1 = [];
    let pacientes = [
      "Izabela",
      "Sandra",
      "João",
      "Crispen",
      "Sheldon",
      "Wellington",
      "José",
    ];
    let p = 0;
    for (let i = 7; i < 24; i++) {
      consultas1.push({
        horario: `${i < 10 ? "0" + i + ":00" : i + ":00"}`,
        descricao: `${
          i > 6 && i % 3 === 0
            ? `Consulta com o(a) Sr(a). ${pacientes[p++]}`
            : ""
        }`,
      });
    }
    return consultas1;
  }
  const [valorTabela, setValorTabela] = useState(carregarTabHoje());
  const [tab, setTab] = useState(0);

  return (
    <>
      <h3>Consultas Agendadas</h3>
      <TabMenu model={tabsDefault} activeIndex={tab} onTabChange={(e) => setTab(e.index)} id="tabMenu" />

      <DataTable id="tabela1" value={valorTabela} resizableColumns columnResizeMode="fit" showGridlines stripedRows >
        <Column field="horario" header="Horário" style={{ width: "15%" }} ></Column>
        <Column field="descricao" header="Descrição" style={{ width: "85%" }} ></Column>
      </DataTable>
    </>
  );
}
