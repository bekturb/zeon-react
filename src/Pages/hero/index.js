import React, { useRef, useState} from 'react';
import '../hero/style.scss'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import ModalWindow from "../../Components/modalWindow/ModalWindow";
import axios from "axios";
import moment from "moment";
import NewModalWindow from "../../Components/newModal/NewModal";





const Hero = () => {

    const [newModalOpen, setNewModalOpen] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)
    const [events, setEvents] = useState([])
    const [change, setChange] = useState({})
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
       console.log(data)
    }

    async function handleDatesSet (data) {
        const response = await axios.get('https://6253ee2319bc53e234758b47.mockapi.io/api/todo-react/v1/dateEvents')
        setEvents(response.data)
    }

    async function handleChange(data){
        setChange(data)
        setNewModalOpen(true)
    }

    async function handleChangeNew(id, newTitle, newStart, newEnd) {
        const response = axios.put(`https://6253ee2319bc53e234758b47.mockapi.io/api/todo-react/v1/dateEvents/${id}`,{title:newTitle,start:newStart,end:newEnd})
            .then(({data}) => {console.log(data)

                setEvents(events.map(el => el.id === id ? {...el, data} : el))}
            )

            .then(() =>{
                setEvents(events.map(el => el.id === id ? {...el, title:newTitle, start:newStart,end:newEnd} : el))
            })

        setEvents(response.data)
    }

    async function handleRemove(id){

        const response = await axios.delete(`https://6253ee2319bc53e234758b47.mockapi.io/api/todo-react/v1/dateEvents/${id}`)

            .then(({data}) =>{
                console.log(data)
                setEvents(events.filter(el => {
                    return el.id !== id
                }))
            })
    }



        return (
        <section>
            <button className='add__event' onClick={() => setModalOpen(true)}>Add Event</button>
            <div style={{position: 'relative', zIndex: 0}}>
                <FullCalendar
                    events={events}
                    ref={calendarRef}
                    plugins={[ dayGridPlugin ]}
                    initialView="dayGridMonth"
                    eventAdd={event => handleEventAdd(event)}
                    datesSet={(date) => handleDatesSet(date)}
                    eventClick={(event) => handleChange(event.event._def)}
                />
            </div>
            <ModalWindow isOpen={modalOpen} onClose={() => setModalOpen(false)} onEventAdded={event => onEventAdded(event)}/>
            <NewModalWindow handleRemove={handleRemove} handleChangeNew={handleChangeNew} change={change} isOpen={newModalOpen} onClose={() => setNewModalOpen(false)} onEventAdded={event => onEventAdded(event)}/>
        </section>
    )
};

export default Hero;