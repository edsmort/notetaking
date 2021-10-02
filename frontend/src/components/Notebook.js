import Sidebar from './Sidebar';
import TextEditor from './Editor';
import { useState } from 'react';
import uuid from 'react-uuid';

export default function Notebook({ user }) {
    const [notes, setNotes] = useState([]);
    const [activeNote, setActiveNote] = useState(false);

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
            <TextEditor activeNote={getActiveNote()} onUpdateNote={onUpdateNote} />
        </div>
    )
}
