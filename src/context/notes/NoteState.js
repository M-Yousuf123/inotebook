import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props)=>{
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
    return (
        <NoteContext.Provider value={{notes, setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;