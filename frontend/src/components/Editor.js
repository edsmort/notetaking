import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

export default function TextEditor({ activeNote, onUpdateNote }) {
    const editorRef = useRef(null);
    const onEditBody = () => {
        if (editorRef.current) {
            onUpdateNote({
                ...activeNote,
                body: editorRef.current.getContent(),
                lastModified: Date.now()
            })
        }
    };

    const onEditTitle = (value) => {
        onUpdateNote({
            ...activeNote,
            title:value,
            lastModified: Date.now()
        })
    };

    if(!activeNote) return <div className="no-active-note">Select a note to begin</div>

    return (
    <div className="app-main">
     <div className="app-main-note-edit">
        <div style={{display:"flex"}}>
            <input 
                type="text" 
                id="title" 
                value={activeNote.title} 
                onChange ={(e) => onEditTitle(e.target.value)} 
                placeHolder="Enter title here"
                autoFocus 
            />
            <button style={{padding:"25px"}}>Save</button>
        </div>
        <Editor
         onInit={(evt, editor) => editorRef.current = editor} onEditorChange ={onEditBody} 
         value={activeNote.body}
         init={{
           menubar: false,
           width:'100%',
           plugins: [
             'advlist autolink lists link image charmap print preview anchor',
             'searchreplace visualblocks code fullscreen',
             'insertdatetime media table paste code help wordcount'
           ],
           toolbar: 'undo redo | formatselect | ' +
           'bold italic backcolor | alignleft aligncenter ' +
           'alignright alignjustify | bullist numlist outdent indent | ' +
           'removeformat | help',
           content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
         }}
        className="text-editor" />
    </div>
    </div>
    )

}
