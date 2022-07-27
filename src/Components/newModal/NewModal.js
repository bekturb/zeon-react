
import React, {useState} from 'react';
import Modal from "react-modal";
import Datetime from 'react-datetime';


function NewModalWindow({isOpen, onClose,change,handleChangeNew,handleRemove}) {

    const [newTitle, setNewTitle] = useState('')
    const [newEnd, setNewEnd] = useState(new Date())
    const [newStart, setNewStart] = useState(new Date())
    console.log(change,'sjjsjs')


    const onNewSubmit = (event) => {
        event.preventDefault();

        handleChangeNew(
            change.publicId,
            newTitle,
            newStart,
            newEnd
        )
        onClose()
    }

    return (
        <Modal isOpen={isOpen} onRequestClose={onClose}>
            <form className='modal__wrapper' onSubmit={onNewSubmit} action="">
                <div className='modal__inner'>
                    <input className='input' defaultValue={change ? change.title : null} type="text" placeholder='Title' onChange={e => setNewTitle(e.target.value)}/>

                    <div>
                        <label>Start date</label>
                        <Datetime className='date--time' defaulValue={change ? change.start : newStart} onChange={date => setNewStart(date)}/>
                    </div>
                    <div>
                        <label>End date</label>
                        <Datetime defaulValue={change ? change.end : newStart} onChange={date => setNewEnd(date)}/>
                    </div>

                    <button className='btn'>Add Event</button>
                    <button className='btn' onClick={() => handleRemove(change.publicId)}>delete</button>
                </div>
            </form>
        </Modal>
    );
}

export default NewModalWindow;