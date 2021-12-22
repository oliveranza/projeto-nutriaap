import React, { useRef, useState } from "react";

import { TabMenu } from "primereact/tabmenu";
import { Avatar } from "primereact/avatar";
import { Menu } from "primereact/menu";
import { Toast } from "primereact/toast";

import "./BarraDeMenu.css";
import { Button } from "primereact/button";
import MinhaBarraDeMenu from "./MinhaBarraDeMenu";
import { InputText } from "primereact/inputtext";

export default function BarraDeMenu(props) {
  const opcItems =
    props.tipo === "nutri"
      ? [
          { label: "Inicio", icon: "pi pi-home", url: "/inicioNutri" },
          { label: "Pacientes", icon: "pi pi-user", url: "/listaPaciente" },
          { label: "Agenda", icon: "pi pi-calendar", url: "/agenda" },
          // { label: 'Chat', icon: 'pi pi-comments', url: '/inicioAdmin' }
        ]
      : props.tipo === "admin"
      ? [
          { label: "Início", icon: "pi pi-home", url: "/inicioAdmin" },
          { label: "Profissionais de Nutrição", icon: "pi pi-id-card", url: "/listaNutri"},
          { label: "Administradores", icon: "pi pi-users", url: "/listaAdmin" },
          // { label: 'Relatórios', icon: 'pi pi-chart-line', url: '/inicioNutri' },
        ]
      : "";

  const toast = useRef(null);
  const menu = useRef(null);
  const [items, setItems] = useState(opcItems);
  // const [tab, setTab] = useState(props.tab);

  const teste = [
    { label: "Inicio", icon: "pi pi-home", url: "/inicioNutri" },
    { label: "Pacientes", icon: "pi pi-user", url: "/listaPaciente" },
    { label: "Agenda", icon: "pi pi-calendar", url: "/agenda" },
    { label: 'Chat', icon: 'pi pi-comments', url: '/inicioAdmin' }
]
  

  const itemsMenu = [
    {
      label: "Perfil",
      icon: "pi pi-user",
      command: () => {
        toast.current.show({
          severity: "success",
          summary: "Perfil",
          detail: "Esse botão levará para a pagina do perfil",
          life: 5000,
        });
      },
    },
    {
      label: "Sair",
      icon: "pi pi-sign-out",
      command: () => {
        window.location.href = "/login";
      },
    },
  ];

  return (
    <div className="nutriapp-menu">
      <Toast ref={toast} />

      <h1 style={{ color: "white" }}>QUALYLIFE</h1>
      <TabMenu model={items} activeIndex={props.tab} onTabChange={e => setTab(e.index)} id="centermenu" style={{display:"flex", flexDirection:"row"}}></TabMenu>
      {/* <MinhaBarraDeMenu modelo={items} tab={props.tab}></MinhaBarraDeMenu> */}
      <div id="endmenu">
        <Menu model={itemsMenu} popup ref={menu} id="popup_menu" />
        <Avatar icon="pi pi-user" shape="circle" id="avatar" onClick={(e) => menu.current.toggle(e)} aria-controls="popup_menu" aria-haspopup />
      </div>
    </div>
  );
}
