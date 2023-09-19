import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import image from "../../assets/more.png";
import Note from "./Note";
import OpenModal from "./OpenModal";
import RecoverNotes from "./RecoverNotes";
import ReadModal from "./ReadModal";
import SearchModal from "./SearchModal";
import ClearNotes from "./ClearNotes";

const Notes = () => {
  const notes = useSelector((state) => state.notesReducer.notes);

  const [showModals, setshowModals] = useState({
    addNoteSideMenu: false,
  });

  const [editNoteInformation,seteditNoteInformation] = useState({
    id:null,
    edited:false
  });

  const [notesInformation,setnotesInformation] = useState({
    title:"",
    description:"",
  })

  const addModalRef = useRef(null);
  const searchModalRef = useRef(null);
  const clearNotesRef = useRef(null);
  const readModalRef = useRef(null);

  const [readedNoteText,setReadedNoteText] = useState({
    text:"",
    description:"",
    time:"",
  });

  useEffect(() => {
    localStorage.setItem("notes",JSON.stringify(notes))
  },[notes])

  return (
    <div className="container">
      <div className="note center" style={{ overflow: "hidden" }}>
        <div
          className={`add_note_side_menu ${
            showModals.addNoteSideMenu ? "left" : ""
          }`}
        >
          <div
            className="search center height font_increase"
            onClick={() => searchModalRef.current.showModal()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              style={{ marginRight: "15px" }}
              width="32"
              height="32"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M9.5 16q-2.725 0-4.612-1.888T3 9.5q0-2.725 1.888-4.612T9.5 3q2.725 0 4.612 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l5.6 5.6q.275.275.275.7t-.275.7q-.275.275-.7.275t-.7-.275l-5.6-5.6q-.75.6-1.725.95T9.5 16Zm0-2q1.875 0 3.188-1.313T14 9.5q0-1.875-1.313-3.188T9.5 5Q7.625 5 6.312 6.313T5 9.5q0 1.875 1.313 3.188T9.5 14Z"
              />
            </svg>
            Search Notes
          </div>
          <div
            className="Clear center height font_increase"
            style={{ paddingRight: "25px" }}
            onClick={() => clearNotesRef.current.showModal()}
          >
            <svg
              style={{ marginRight: "20px" }}
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M3 23v-7q0-2.075 1.463-3.538T8 11h1V3q0-.825.588-1.413T11 1h2q.825 0 1.413.588T15 3v8h1q2.075 0 3.538 1.463T21 16v7H3Zm2-2h2v-3q0-.425.288-.713T8 17q.425 0 .713.288T9 18v3h2v-3q0-.425.288-.713T12 17q.425 0 .713.288T13 18v3h2v-3q0-.425.288-.713T16 17q.425 0 .713.288T17 18v3h2v-5q0-1.25-.875-2.125T16 13H8q-1.25 0-2.125.875T5 16v5Zm8-10V3h-2v8h2Z"
              />
            </svg>
            Clear notes
          </div>
        </div>
        <div
          className="add_note center"
          onClick={() => {
            seteditNoteInformation({
              id:null,
              edited:false
            })
            addModalRef.current.showModal()
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 15 15"
          >
            <path
              fill="currentColor"
              fillRule="evenodd"
              d="M8 2.75a.5.5 0 0 0-1 0V7H2.75a.5.5 0 0 0 0 1H7v4.25a.5.5 0 0 0 1 0V8h4.25a.5.5 0 0 0 0-1H8V2.75Z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="add_note_text">Add new note</div>
        <div
          className="search_option_dotes_container"
          onClick={() =>
            setshowModals((prev) => ({
              ...prev,
              addNoteSideMenu: !prev.addNoteSideMenu,
            }))
          }
        >
          {!showModals.addNoteSideMenu ? (
            <img src={image} alt="Loading..." className="add_note_options" />
          ) : (
            <div className="cross">&times;</div>
          )}
        </div>
      </div>
      {/* place to map notes */}
      {notes.map(({key,title,description,time,important,pinned},index) => {
        return (
          <Note
            key={key}
            title={title}
            description={description}
            time={time}
            index={index}
            pinned={pinned}
            important={important}
            setReadedNoteText={setReadedNoteText}
            ref={{readModalRef,addModalRef}}
            setnotesInformation={setnotesInformation}
            seteditNoteInformation={seteditNoteInformation}
            editNoteInformation={editNoteInformation}
          />
        );
      })}

      {/*  */}

      {/* dialog to add note */}
      <OpenModal notesInformation={notesInformation} setnotesInformation={setnotesInformation} editNoteInformation={editNoteInformation} seteditNoteInformation={seteditNoteInformation} ref={addModalRef} />
      {/*  */}

      {/* Recover notes container */}
      <RecoverNotes />
      {/*  */}

      {/* Modal to read the note */}
      <ReadModal ref={readModalRef} readedNoteText={readedNoteText}/>
      {/*  */}
      {/* Modal to search the notes */}
      <SearchModal setReadedNoteText={setReadedNoteText} ref={{searchModalRef,readModalRef}} />
      {/*  */}

      {/* Modal to clear all notes */}
      <ClearNotes ref={clearNotesRef} />
      {/*  */}
    </div>
  );
};

export default Notes;
