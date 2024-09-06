import NoteContext from './noteContext'
import { useState } from 'react';
const NoteState = (props) => {

    // const s1={
    //     "name":"Kavya",
    //     "age":"20"
    // };
    // const [state,setState]=useState(s1);
    // const update=()=>{
    //     setTimeout(() => {
    //         setState({
    //             "name":"Hunny",
    //             "age":"19",
    //         })
    //     }, 1000);
    // }

    const noteInitial=[
        {
          "_id": "66d440adc3fea80efe9d4032",
          "user": "66d2e546b976ed21dded2222",
          "title": "Test",
          "description": "Me hu giyan",
          "tag": "cheen tapak dam dam",
          "date": "2024-09-01T10:23:41.044Z",
          "__v": 0,
          "Update": "2024-09-04T13:33:03.117Z"
        },
        {
          "_id": "66d440c5c3fea80efe9d4034",
          "user": "66d2e546b976ed21dded2222",
          "title": "Test",
          "description": "Me hu giyan",
          "tag": "cheen tapak dam dam",
          "date": "2024-09-01T10:24:05.018Z",
          "__v": 0,
          "Update": "2024-09-04T13:33:03.117Z"
        },
        {
          "_id": "66d440c5c3fea80efe9d4036",
          "user": "66d2e546b976ed21dded2222",
          "title": "Test7",
          "description": "Me hu giyan",
          "tag": "cheen tapak dam dam",
          "date": "2024-09-01T10:24:05.242Z",
          "__v": 0,
          "Update": "2024-09-04T13:33:03.117Z"
        }
      ]
      const [notes,setNotes]=useState(noteInitial)

      // Add Notes
      const addNote=(title,description,tag)=>{
        const note={
          "_id": "66d440c5c3fea80tfe9d4036",
          "user": "66d2e546b976ed21dded2222",
          "title": `${title} Added`,
          "description": `${description} Added`,
          "tag": "cheen tapak dam dam",
          "date": "2024-09-01T10:24:05.242Z",
          "__v": 0,
          "Update": `${Date.now()}`
        }
        setNotes(notes.concat(note))
      }

      // Delete Note
      const delNote=(id)=>{
        // console.log(id)
        const newNote=notes.filter((note)=>{return note._id!==id})
        setNotes(newNote)
      }

      // Edit Note
      const editNote=(id)=>{
        
      }

    return(
    <NoteContext.Provider value={{notes,addNote,delNote,editNote}}>
        {props.children}
    </NoteContext.Provider>
    )
}

export default NoteState;
