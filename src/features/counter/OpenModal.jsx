import React, { forwardRef, useState } from "react";
import "../../App.css";
import { addNotes,editeNote } from "./NotesSlice";
import { nanoid } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";

const OpenModal = forwardRef(function OpenModal({editNoteInformation,seteditNoteInformation,notesInformation,setnotesInformation}, ref) {
  const dispatch = useDispatch();
  
  return (
    <dialog className="modal" ref={ref}>
      <div className="top_text">
        <div className="add_note_text">{editNoteInformation.edited ? "Edit" : "Add"} note</div>
        <div className="center" onClick={() => {
          setnotesInformation({
            title:"",
            description:""
          })
          ref.current.close()
          }}>
          &times;
        </div>
      </div>
      <div className="inputs_container">
        <div>
          <h3>Title</h3>
          <input
            type="text"
            value={notesInformation.title}
            onChange={(e) => setnotesInformation(prev => ({...prev,title:e.target.value}))}
          />
        </div>
        <div>
          <h3>Description</h3>
          <textarea
            value={notesInformation.description}
            onChange={(e) => setnotesInformation(prev => ({...prev,description:e.target.value}))}
          ></textarea>
        </div>
        <div>
          <button
            id="add_btn"
            onClick={() => {
              if(!editNoteInformation.edited){
                dispatch(
                  addNotes({
                    title:notesInformation.title,
                    description:notesInformation.description,
                    key: nanoid,
                    time:Date.now(),
                    important:false,
                    pinned:false
                  })
                );
                seteditNoteInformation({
                  id:null,
                  edited:false
                })
              }else{
                
                dispatch(editeNote({
                  index:editNoteInformation.id,
                  title:notesInformation.title,
                  description:notesInformation.description,
                  time:Date.now()
                }));
                seteditNoteInformation({
                  id:null,
                  edited:false
                })
              }
              setnotesInformation({
                title:"",
                description:""
              })
              ref.current.close();
            }}
          >
            {editNoteInformation.edited ? "Edit" : "Add"} note
          </button>
        </div>
      </div>
    </dialog>
  );
});

export default OpenModal;
