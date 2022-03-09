import BarraDeMenu from "../../components/BarraDeMenu/BarraDeMenu";
import "./Agenda.css";
import { pt } from "../../locale/pt.json";

import React, { useEffect, useRef, useState } from "react";
import FullCalendar, { ViewApi } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { addLocale } from "primereact/api";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Toast } from "primereact/toast";
import { classNames } from "primereact/utils";

import api from "../../services/api";

export default function Agenda() {
  addLocale("pt-BR", pt);

  let eventoVazio = {
    id: "",
    title: "",
    start: new Date(),
    ends: new Date(),
    paciente: {},
  };

  const [submitted, setSubmitted] = useState(false);
  const [eventoDialog, setEventoDialog] = useState(false);
  const [deleteEventoDialog, setDeleteEventoDialog] = useState(false);
  const [evento, setEvento] = useState(eventoVazio);
  const [pacientes, setPacientes] = useState([]);
  const toast = useRef(null);

  const [eventos, setEventos] = useState([
    {
      id: "1",
      title: "Consulta José",
      start: "2022-03-06 10:00",
      ends: "2022-03-06 11:00",
      paciente: {},
    },
    {
      id: "2",
      title: "Consulta João",
      start: "2022-03-10 13:00",
      ends: "2022-03-10 14:00",
      paciente: {},
    },
    {
      id: "3",
      title: "Consulta Maria",
      start: "2022-03-14 17:00",
      ends: "2022-03-14 18:00",
      paciente: {},
    },
    {
      id: "4",
      title: "Consulta Francisco",
      start: "2022-03-23 11:00",
      ends: "2022-03-23 12:00",
      paciente: {},
    },
    {
      id: "5",
      title: "Consulta Jotinha",
      start: "2022-03-27 09:00",
      ends: "2022-03-27 10:00",
      paciente: {},
    },
  ]);

  useEffect(() => {
    api
      .get("api/paciente/getAll")
      .then((response) => {
        console.log(response.data);
        const d = response.data;
        const pacs = d.map((ele) => {
          return { label: ele.nome, id: ele.id };
        });
        setPacientes(pacs);
      })
      .catch((err) => {
        console.log("ops! ocorreu um erro" + err);
      });
  }, []);

  const openNew = () => {
    setEvento(eventoVazio);
    setSubmitted(false);
    setEventoDialog(true);
  };

  const edit = (id) => {
    const index = findIndexById(id);
    const ev = eventos[index];
    console.log(ev);
    setEvento(ev);
    setEventoDialog(true);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setEventoDialog(false);
  };

  const createId = () => {
    let id = "";
    let chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < 8; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  };

  const save = () => {
    setSubmitted(true);

    if (evento.title.trim() && evento.paciente.label) {
      let _eventos = [...eventos];
      let _evento = { ...evento };
      if (evento.id) {
        const indice = findIndexById(evento.id);
        _eventos[indice] = evento;
        toast.current.show({
          severity: "success",
          summary: "Sucesso!",
          detail: "Consulta atualizada",
          life: 3000,
        });
      } else {
        _evento.id = createId();
        _evento.title = evento.title;
        _evento.paciente = evento.paciente;
        _evento.start = evento.start;
        _evento.ends = evento.ends;
        _eventos.push(_evento);
        toast.current.show({
          severity: "success",
          summary: "Sucesso!",
          detail: "Consulta marcada",
          life: 3000,
        });
      }

      setEventos(_eventos);
      setEventoDialog(false);
      setEvento(eventoVazio);
    }
  };

  const findIndexById = (id) => {
    let index = -1;
    for (let i = 0; i < eventos.length; i++) {
      if (eventos[i].id == id) {
        index = i;
        break;
      }
    }
    return index;
  };

  const onInputChange = (e, attb) => {
    const val = (e.target && e.target.value) || "";
    let _evento = { ...evento };
    _evento[`${attb}`] = val;

    setEvento(_evento);
  };

  const onDropboxChange = (selPaciente, attb) => {
    const p = selPaciente;
    let _evento = { ...evento };
    _evento[`${attb}`] = p;

    setEvento(_evento);
  };

  const onDataChange = (dt, attb) => {
    const dt1 = dt;
    console.log(dt1);
    let _evento = { ...evento };
    _evento[`${attb}`] = dt1;

    setEvento(_evento);
  };

  const confirmDeleteEvento = () => {
    hideDialog();
    setDeleteEventoDialog(true);
  };

  const deleteEvento = () => {
    let _eventos = eventos.filter((val) => val.id !== evento.id);
    setEventos(_eventos);
    setDeleteEventoDialog(false);
    setEvento(eventoVazio);
    toast.current.show({
      severity: "success",
      summary: "Sucesso",
      detail: "Consulta removida",
      life: 4000,
    });
  };

  const hideDeleteEventoDialog = () => {
    setDeleteEventoDialog(false);
    setEventoDialog(true)
  }

  const productDialogFooter = (
    <React.Fragment>
      { evento.id?(
        <Button
        id="btDelete"
        label="Excluir"
        icon="pi pi-trash"
        className="p-button-text"
        onClick={confirmDeleteEvento}
      />):''}
      <Button
        label="Cancelar"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDialog}
      />
      <Button
        label="Salvar"
        icon="pi pi-check"
        className="p-button-text"
        onClick={save}
      />
    </React.Fragment>
  );

  const deleteEventoDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDeleteEventoDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        className="p-button-text"
        onClick={deleteEvento}
      />
    </React.Fragment>
  );

  return (
    <div className="nutriapp-agenda">
      <BarraDeMenu tab={2} tipo="nutri"></BarraDeMenu>
      <Toast ref={toast} />
      <div className="corpo">
        <FullCalendar
          events={eventos}
          editable={false}
          initialDate={new Date()}
          dateClick={""}
          eventClick={(e) => edit(e.event.id)}
          locale={"pt-BR"}
          initialView="dayGridMonth"
          locales="pt-Br"
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          customButtons={{
            bt1: { text: "Nova Consulta", click: () => openNew() },
          }}
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
          views={{ timeGrid: { allDayText: "Dia Todo" } }}
          selectable
          dayMaxEvents
        />

        <Dialog
          visible={eventoDialog}
          style={{ width: "450px" }}
          header={evento.id?"Atualizar Consulta":"Nova Consulta"}
          modal
          draggable={false}
          className="p-fluid"
          footer={productDialogFooter}
          onHide={hideDialog}
        >
          <div className="modal">
            <form action="submit">
              <div>
                <label htmlFor="title">Título</label>
                <InputText
                  id="title"
                  type="text"
                  placeholder="Digite o título desta avaliação"
                  value={evento.title}
                  onChange={(e) => onInputChange(e, "title")}
                  // onChange={(e) => setTitulo(e.target.value)}
                  required
                  minLength="2"
                  maxLength="200"
                  className={classNames({
                    "p-invalid": submitted && !evento.title,
                  })}
                />
                {submitted && !evento.title && (
                  <small className="p-error">
                    Um título deve ser informado.
                  </small>
                )}
              </div>

              <div>
                <label htmlFor="paciente">Paciente</label>
                <Dropdown
                  inputId="paciente"
                  // value={paciente}
                  value={evento.paciente}
                  options={pacientes}
                  onChange={(e) => onDropboxChange(e.value, "paciente")}
                  // onChange={(e) => setPaciente(e.target.value)}
                  placeholder={"Selecione"}
                  required
                  className={classNames({
                    "p-invalid": submitted && !evento.paciente.label,
                  })}
                />
                {submitted && !evento.paciente.label && (
                  <small className="p-error">Selecione um paciente.</small>
                )}
              </div>

              <label htmlFor="inicio">Inicio</label>
              <Calendar
                id="start"
                value={new Date(evento.start)}
                dateFormat="dd/mm/yy"
                hourFormat="00"
                locale="pt-BR"
                monthNavigator
                yearNavigator
                mask="99/99/9999"
                yearRange={`2000:${new Date().getFullYear() + 10}`}
                placeholder={"Data de inicio"}
                showIcon
                showTime
                stepHour={1}
                stepMinute={30}
                icon="pi pi-clock"
                onChange={(e) => onDataChange(e.target.value, "start")}
                required
              />

              <label htmlFor="fim">Fim</label>
              <Calendar
                id="ends"
                value={new Date(evento.ends)}
                dateFormat="dd/mm/yy"
                locale="pt-BR"
                monthNavigator
                yearNavigator
                mask="99/99/9999"
                yearRange={`2000:${new Date().getFullYear() + 10}`}
                placeholder={"Data de inicio"}
                showIcon
                showTime
                stepHour={1}
                stepMinute={30}
                icon="pi pi-clock"
                onChange={(e) => onDataChange(e.target.value, "ends")}
                required
              />
            </form>
          </div>
        </Dialog>

        <Dialog
          visible={deleteEventoDialog}
          style={{ width: "450px" }}
          header="Confirme"
          modal
          draggable={false}
          footer={deleteEventoDialogFooter}
          onHide={hideDeleteEventoDialog}
        >
          <div className="confirmation-content">
            <i
              className="pi pi-exclamation-triangle mr-3"
              style={{ fontSize: "2rem" }}
            />
            {evento && (
              <span>
                tem certeza que quer excluir "<b>{evento.title}</b>" ?
              </span>
            )}
          </div>
        </Dialog>
      </div>
    </div>
  );
}
