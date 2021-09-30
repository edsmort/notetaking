import Sidebar from './Sidebar';
import TextEditor from './Editor';
import { useState } from 'react';
import uuid from 'react-uuid';

export default function Notebook() {
    const [notes, setNotes] = useState([]);
    const [activeNote, setActiveNote] = useState(false);

    const onAddNote = () => {
        const newNote = {
            id:uuid(),
            title:"Untitled note",
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

    return(
        <div className="Notebook">
            <Sidebar 
                notes={notes} 
                onAddNote={onAddNote} 
                onDeleteNote={onDeleteNote}
                activeNote={activeNote}
                setActiveNote={setActiveNote}
            />
            <TextEditor activeNote={getActiveNote()} />
        </div>
    )
}
