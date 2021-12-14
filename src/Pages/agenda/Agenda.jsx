import BarraDeMenu from "../../components/BarraDeMenu/BarraDeMenu";
import "./Agenda.css";
import { pt } from "../../locale/pt.json";

import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { addLocale } from "primereact/api";
import { format } from "date-fns";

export default function Agenda() {
  addLocale("pt-BR", pt);

  const eventos = [
    { id: 1, title: "event 1", start: "2021-12-15 10:00" },
    { id: 2, title: "event 2", start: "2021-12-15 13:00" },
    { id: 3, title: "event 3", start: "2021-12-15 17:00" },
  ];

  return (
    <div className="nutriapp-agenda">
      <BarraDeMenu tab={2}></BarraDeMenu>

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
          customButtons={{bt1: {text: "Adicionar Evento", click: () => alert("aqui")}}}
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
      </div>
    </div>
  );
}
