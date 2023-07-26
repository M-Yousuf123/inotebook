import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000"
  const notesInitial = [
    {
      "_id": "64b90f65bceb698d8943f5e7",
      "user": "64b520ecd0de7f585d105221",
      "title": "MY Title",
      "description": "Please wake up early",
      "tag": "personal",
      "date": "2023-07-20T10:41:41.054Z",
      "__v": 0
    },
    {
      "_id": "64b91849320b6d3aab86677f1",
      "user": "64b520ecd0de7f585d105221",
      "title": "MY Title",
      "description": "Please wake up early",
      "tag": "personal",
      "date": "2023-07-20T11:19:37.102Z",
      "__v": 0
    },
    {
      "_id": "64b90f65bceb698d8943f5e72",
      "user": "64b520ecd0de7f585d105221",
      "title": "MY Title",
      "description": "Please wake up early",
      "tag": "personal",
      "date": "2023-07-20T10:41:41.054Z",
      "__v": 0
    },
    {
      "_id": "64b91849320b6d3aab86677f3",
      "user": "64b520ecd0de7f585d105221",
      "title": "MY Title",
      "description": "Please wake up early",
      "tag": "personal",
      "date": "2023-07-20T11:19:37.102Z",
      "__v": 0
    },
    {
      "_id": "64b90f65bceb698d8943f5e74",
      "user": "64b520ecd0de7f585d105221",
      "title": "MY Title",
      "description": "Please wake up early",
      "tag": "personal",
      "date": "2023-07-20T10:41:41.054Z",
      "__v": 0
    },
    {
      "_id": "64b91849320b6d3aab86677f5",
      "user": "64b520ecd0de7f585d105221",
      "title": "MY Title",
      "description": "Please wake up early",
      "tag": "personal",
      "date": "2023-07-20T11:19:37.102Z",
      "__v": 0
    },
  ]
  const [notes, setNotes] = useState(notesInitial)

  //Get all Notes
  const getNotes = async () => {
       //API call
       const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET", // *GET, POST, PUT, DELETE, etc.t
        headers: {
          "Content-Type": "application/json",
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRiNTIwZWNkMGRlN2Y1ODVkMTA1MjIxIn0sImlhdCI6MTY4OTc2NjQxOH0.Lz0DRptk4ayHkerOlP-DoSxLKJJRTQDZfEy2wqlN3DM"
        }
      });
      const json = await response.json();
      setNotes(json)
  }
  //Add a Note
  const addNote = async (title, description, tag) => {
       //API call
       const response = await fetch(`${host}/api/notes/addnote`, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.t
        headers: {
          "Content-Type": "application/json",
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRiNTIwZWNkMGRlN2Y1ODVkMTA1MjIxIn0sImlhdCI6MTY4OTc2NjQxOH0.Lz0DRptk4ayHkerOlP-DoSxLKJJRTQDZfEy2wqlN3DM"
        },
        body: JSON.stringify({title, description, tag}),
      });
      // Logic to edit in client
      const note = await response.json();
    setNotes(notes.concat(note))
  }
  //Delete a Note
  const deleteNote = async (id) => {
        //API call
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
          method: "DELETE", // *GET, POST, PUT, DELETE, etc.t
          headers: {
            "Content-Type": "application/json",
            "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRiNTIwZWNkMGRlN2Y1ODVkMTA1MjIxIn0sImlhdCI6MTY4OTc2NjQxOH0.Lz0DRptk4ayHkerOlP-DoSxLKJJRTQDZfEy2wqlN3DM"
          }
        });
        const json = await response.json();
    let newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
  }
  //Edit a Note
  const editNote = async (id, title, description, tag) => {
    //API call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.t
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRiNTIwZWNkMGRlN2Y1ODVkMTA1MjIxIn0sImlhdCI6MTY4OTc2NjQxOH0.Lz0DRptk4ayHkerOlP-DoSxLKJJRTQDZfEy2wqlN3DM"
      },
      body: JSON.stringify({title, description, tag}),
    });
    const json = await response.json();
    console.log(json);
    // Logic to edit in client
    let newNotes = JSON.parse(JSON.stringify(notes))
    for (let index = 0; index < newNotes.length; index++) {
      if (newNotes[index]._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  }
  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes}}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;