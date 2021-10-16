import Sidebar from './Sidebar';
import TextEditor from './Editor';
import { useState } from 'react';
import uuid from 'react-uuid';
import Axios from 'axios';

export default function Notebook({ user }) {
    const [notes, setNotes] = useState(function () {
        if (user) {
            return user.notes;
        }
        return [];
    });

    const [activeNote, setActiveNote] = useState(false);

    const onSave = () => {
        if (user) { 
            Axios.post('http://localhost:3001/notes', {
                email: user.email,
                notes: notes,
                crossDomain:true
            })
            .then(function (response) {
                setNotes(response.data);
            })
            .catch(function (error) {
                console.log(error);
            })
        }
    }

    const onAddNote = () => {
        const newNote = {
            id:uuid(),
            title:"",
            body:"",
            lastModified: Date.now()
        }
        setNotes([newNote, ...notes]);
    }

    const onDeleteNote = (id) => {
        setNotes(notes.filter((note) => note.id !== id))
    }

    const getActiveNote = () => {
        return notes.find((note) => note.id === activeNote);
    }

    const onUpdateNote = (updatedNote) => {
        const updatedNotes = notes.map((note) => {
            if (note.id === activeNote) {
                return updatedNote;
            }
            return note;
        });

        setNotes(updatedNotes);
    }

    return(
        <div className="Notebook">
            <Sidebar 
                notes={notes} 
                onAddNote={onAddNote} 
                onDeleteNote={onDeleteNote}
                activeNote={activeNote}
                setActiveNote={setActiveNote}
            />
            <TextEditor onSave={onSave} activeNote={getActiveNote()} onUpdateNote={onUpdateNote} />
        </div>
    )
}
