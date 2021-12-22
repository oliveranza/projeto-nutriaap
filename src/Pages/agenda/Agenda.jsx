import BarraDeMenu from "../../components/BarraDeMenu/BarraDeMenu";
import "./Agenda.css";
import { pt } from "../../locale/pt.json";

import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { addLocale } from "primereact/api";
import { Dialog } from 'primereact/dialog';
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { InputText } from "primereact/inputtext";

export default function Agenda() {
  addLocale("pt-BR", pt);

  let eventoVazio = { id:null, title: "", start: new Date(), ends: new Date()}

  const [submitted, setSubmitted] = useState(false)
  const [eventoDialog, setEventoDialog] = useState(false)
  const [evento, setEvento] = useState(eventoVazio)
  const [dtInicio, setDtInicio] = useState(new Date().setHours(0,0))
  const [dtFim, setDtFim] = useState(new Date())

  const [eventos, setEventos] = useState([
    { id: 1, title: "event 1", start: "2021-12-06 10:00" },
    { id: 2, title: "event 2", start: "2021-12-10 13:00" },
    { id: 3, title: "event 3", start: "2021-12-14 17:00" },
    { id: 4, title: "event 4", start: "2021-12-23 11:00" },
    { id: 5, title: "event 5", start: "2021-12-27 09:00" },
  ]);

  const openNew = () => {
    setEvento(eventoVazio);
    setSubmitted(false);
    setEventoDialog(true);
  }

  const hideDialog = () => {
    setSubmitted(false);
    setProductDialog(false);
  }

  const productDialogFooter = (
    <React.Fragment>
        <Button label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
        <Button label="Salvar" icon="pi pi-check" className="p-button-text" onClick={salvar()} />
    </React.Fragment>
  );

  function salvar(){

  }



  return (
    <div className="nutriapp-agenda">
      <BarraDeMenu tab={2} tipo="nutri"></BarraDeMenu>

      <div className="corpo">
        <FullCalendar
          events={eventos}
          initialDate={new Date()}
          dateClick={e => alert(e.dateStr)}
          eventClick={e => alert(e.event.title)}
          locale={"pt-BR"}
          initialView="dayGridMonth"
          locales="pt-Br"
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          customButtons={{bt1: {text: "Adicionar Evento", click: () => openNew()}}}
          headerToolbar={{
            left: "dayGridMonth,timeGridWeek,timeGridDay prev,next",
            center: `title`,
            right: `today bt1`,
          }}
          buttonText={{
            today: "Hoje",
            month: "Meses",
            week: "Semanas",
            day: "Dias",
          }}
          daydi
          views={{timeGrid: {allDayText:"Dia Todo"}}}
          editable
          selectable
          dayMaxEvents
        />

        <Dialog visible={eventoDialog} style={{ width: '450px' }} header="Novo evento" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
                <div className="modal">
                  <form action="submit">

                    <label htmlFor="titulo">Título</label>
                    <InputText id="titulo"></InputText>
                    <label htmlFor="inicio">Inicio</label>
                    <Calendar
                      id="inicio"
                      value={dtInicio}
                      dateFormat="dd/mm/yy"
                      locale="pt-BR"
                      monthNavigator
                      yearNavigator
                      mask="99/99/9999"
                      yearRange="1920:2021"
                      placeholder={"Data de inicio"}
                      showIcon
                      showTime
                      stepHour={1}
                      stepMinute={30}
                      icon="pi pi-clock"
                      onChange={(e) => setDtInicio(e.target.value)}
                      required
                    />
                  </form>
                </div>
               
            </Dialog>
      </div>
    </div>
  );
}
