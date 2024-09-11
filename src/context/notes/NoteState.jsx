import { json } from 'react-router-dom';
import NoteContext from './noteContext'
import { useState } from 'react';
const NoteState = (props) => {


  const host = "http://localhost:5000"

  const noteInitial = []

  const getNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZkMmU1NDZiOTc2ZWQyMWRkZWQyMjIyIn0sImlhdCI6MTcyNTE4MDYxMn0.xolByMk6osNq6pQnUTHRwCaECqS87exxYARtX9yBuyA'
      },
    });

    const json = await response.json();
    // console.log(json)
    setNotes(json)
  }


  const [notes, setNotes] = useState(noteInitial)

  // Add Notes
  const addNote = async (title, description, tag) => {

    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZkMmU1NDZiOTc2ZWQyMWRkZWQyMjIyIn0sImlhdCI6MTcyNTE4MDYxMn0.xolByMk6osNq6pQnUTHRwCaECqS87exxYARtX9yBuyA'
      },
      body: JSON.stringify({ title, description, tag })
    });


    // client side
    // const json = await response.json();
    const note=await response.json()
    setNotes(notes.concat(note))
    // console.log(json)

    // const note = {
    //   "_id": "66d440c5c3fea80tfe9d4036",
    //   "user": "66d2e546b976ed21dded2222",
    //   "title": title,
    //   "description": description,
    //   "tag": tag,
    //   "date": "2024-09-08T08:07:45.997Z",
    //   "Update": "2024-09-08T08:07:45.997Z",
    //   "__v": 0

    // }
    // getNotes()
    // setNotes(notes.concat(note))
  }

  // Delete Note
  const delNote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZkMmU1NDZiOTc2ZWQyMWRkZWQyMjIyIn0sImlhdCI6MTcyNTE4MDYxMn0.xolByMk6osNq6pQnUTHRwCaECqS87exxYARtX9yBuyA'
      }
    });
    const json = await response.json();
    console.log(json)
    const newNote = notes.filter((note) => { return note._id !== id })
    setNotes(newNote)
  }

  // Edit Note
  const editNote = async (id, title, description, tag) => {
    // API call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZkMmU1NDZiOTc2ZWQyMWRkZWQyMjIyIn0sImlhdCI6MTcyNTE4MDYxMn0.xolByMk6osNq6pQnUTHRwCaECqS87exxYARtX9yBuyA'
      },
      body: JSON.stringify({ title, description, tag })
    });

    // client side
    const json = response.json();
    // const note=await response.json()
    // setNotes(notes.concat(note))

    
    getNotes();
    // for (let index = 0; index < notes.length; index++) {
    //   const element = notes[index];
    //   if (element._id === id) {
    //     notes[index].title = title
    //     notes[index].description = description
    //     notes[index].tag = tag
    //   }
    //   break

    // }
    // setNotes(notes)
  }

  return (
    <NoteContext.Provider value={{ notes, addNote, delNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;
