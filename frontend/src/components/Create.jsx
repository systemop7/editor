import EditorJS from '@editorjs/editorjs'
import Header from '@editorjs/header'
import Image from '@editorjs/image'
import axios from 'axios'
import { useState } from "react"

const Create = () => {
    const [title, setTitle] = useState('');
    const [editor, setEditor] = useState(null);
    const initEditor = () => {
        const editor = new EditorJS({
            holder: "editorjs",
            placeholder: "Typing...",
            onReady: () => {
                console.log('EditorJS is ready')
            },
            autofocus: true,
            onChange: async () => {
                const content = await editor.saver.save()
                console.log(content)
            },
            tools: {
                header: {
                    class: Header,
                    inlineToolbar: true
                },
                image: {
                    class: Image, 
                    config: {
                        uploader: {
                            async uploadByFile(file){
                                const formData = new FormData();
                                formData.append("photo", file);
                                const response = await axios.post("http://localhost:5050/api/v1/blog/upload-single", formData, {
                                    headers: {
                                        'Content-Type' : "multipart/form-data"
                                    },
                                    withCredentials: false
                                })
                                if(response.data.success == 1){
                                    return response.data
                                }
                            },
                            async uploadByUrl(url){
                                const response = await axios.post(`http://localhost:5050/api/v1/blog/createByURL`, { url })
                                if(response.data.success == 1){
                                    return response.data
                                }
                            }
                        }
                    },
                    inlineToolbar: true
                }
            }
        })
        setEditor(editor)
    }


    const handleDataSave = async () => {
        if (!editor) {
          console.error('Editor not initialized');
          return;
        }
    
        const savedData = await editor.save();
    
        const response = await fetch('http://localhost:5050/api/v1/blog/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: title, // Insert the title into the request body
            body: savedData,
          }),
        });
    
        const res = await response.json();
        console.log(res.data);
      };



  return (
    <div>
           <button onClick={handleDataSave}>Save</button>
      <input
        type='text'
        placeholder='Title'
        name='title'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
        <div id="editorjs"></div>
        {editor === null && initEditor()}
    </div>
  )
}

export default Create