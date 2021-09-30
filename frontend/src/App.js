import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import SignIn from './components/SignIn';


export default function App() {
  const editorRef = useRef(null);
  const log = () => {
   if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };
  return (
      <SignIn />
  );
}

