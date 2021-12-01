import BarraDeMenu from "../../components/BarraDeMenu/BarraDeMenu"
import "./Agenda.css"

import React from 'react';
// import FullCalendar from '@fullcalendar/core';
// import dayGridPlugin from '@fullcalendar/daygrid';
// import timeGridPlugin from '@fullcalendar/timegrid';
// import interactionPlugin from '@fullcalendar/interaction';





export default function Agenda(){

    return(

        <>
        <div className="nutriapp-agenda">
            <BarraDeMenu></BarraDeMenu>
            
            <div className="corpo">
            <FullCalendar events="" initialDate="2017-02-01" initialView='dayGridMonth' plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    headerToolbar={{ left: 'prev,next today', center: 'title', right: 'dayGridMonth,timeGridWeek,timeGridDay' }} editable selectable selectMirror dayMaxEvents />
            </div>
        </div>
        </>
    )


}