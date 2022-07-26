import React, { useRef, useState} from 'react';
import '../hero/style.scss'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import ModalWindow from "../../Components/modalWindow/ModalWindow";
import axios from "axios";
import moment from "moment";





const Hero = () => {

    const [modalOpen, setModalOpen] = useState(false)
    const [events, setEvents] = useState([])
    const calendarRef = useRef(null)

    const onEventAdded = event => {
        let calendarApi = calendarRef.current.getApi()
        calendarApi.addEvent({
            start:moment(event.start).toDate(),
            end: moment(event.end).toDate(),
            title: event.title
        });
    }

   async function handleEventAdd(data) {
      await  axios.post(`https://6253ee2319bc53e234758b47.mockapi.io/api/todo-react/v1/dateEvents`, data.event)
    }

    async function handleDatesSet (data) {
        const response = await axios.get('https://6253ee2319bc53e234758b47.mockapi.io/api/todo-react/v1/dateEvents')
        setEvents(response.data)
    }

    return (
        <section>
            <button onClick={() => setModalOpen(true)}>Add Event</button>
            <div style={{position: 'relative', zIndex: 0}}>
                <FullCalendar
                    events={events}
                    ref={calendarRef}
                    plugins={[ dayGridPlugin ]}
                    initialView="dayGridMonth"
                    eventAdd={event => handleEventAdd(event)}
                    datesSet={(date) => handleDatesSet(date)}
                />
            </div>
            <ModalWindow isOpen={modalOpen} onClose={() => setModalOpen(false)} onEventAdded={event => onEventAdded(event)}/>
        </section>
    )
};

export default Hero;