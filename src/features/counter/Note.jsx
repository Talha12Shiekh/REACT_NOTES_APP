import image from "../../assets/more.png";
import React, { forwardRef, useEffect, useState } from "react";
import "../../App.css";
import { changeProperty, deleteNotes, editeNote } from "./NotesSlice";
import { useDispatch, useSelector } from "react-redux";


const Note = forwardRef(function Note({title,description,time,index,important,pinned,setReadedNoteText,editNoteInformation,seteditNoteInformation,setnotesInformation},ref){
    const [showSideMenu,setshowSideMenu] = useState(false);
    const dispatch = useDispatch();
    let DateFormatter = new Intl.DateTimeFormat("en-us", {
        month: "long",
        day: "2-digit",
        year: "2-digit",
      });
    const notes = useSelector((state) => state.notesReducer.notes);
    
    useEffect(() => {
      if(editNoteInformation.edited){
      const findedNote = notes.find((_,index) => index == editNoteInformation.id);

      setnotesInformation({
        title:findedNote.title,
        description:findedNote.description,
        time:Date.now()
      })
    }
    },[editNoteInformation.edited])

  return (
    <div className={`note text_note ${important ? "red" : ""} ${pinned ? "pinned" : ""}`}>
      <div className={`note_side_menu ${showSideMenu ? "left" : ""}`}>
        <div className="menu_container">
          <div
            className="edit"
            onClick={() => {
              seteditNoteInformation({
                id:index,
                edited:true
              });
             
              setshowSideMenu(false);
              ref.addModalRef.current.showModal()
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              className="svg"
              viewBox="0 0 512 512"
            >
              <path
                fill="currentColor"
                d="m410.3 231l11.3-11.3l-33.9-33.9l-62.1-62.1l-33.9-33.9l-11.3 11.3l-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2l199.2-199.2l22.6-22.7zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9l-78.2 23l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7l-14.4 14.5l-22.6 22.6l-11.4 11.3l33.9 33.9l62.1 62.1l33.9 33.9l11.3-11.3l22.6-22.6l14.5-14.5c25-25 25-65.5 0-90.5l-39.3-39.4c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"
              ></path>
            </svg>{" "}
            Edit
          </div>
          <div
            className="delete"
            onClick={() => {
              setshowSideMenu(false);
              dispatch(deleteNotes(index))
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              className="svg"
              viewBox="0 0 448 512"
            >
              <path
                fill="currentColor"
                d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64s14.3 32 32 32h384c17.7 0 32-14.3 32-32s-14.3-32-32-32h-96l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32l21.2 339c1.6 25.3 22.6 45 47.9 45h245.8c25.3 0 46.3-19.7 47.9-45L416 128z"
              ></path>
            </svg>{" "}
            Delete
          </div>
          <div
            className="important"
            onClick={() => {
              setshowSideMenu(false);
              dispatch(changeProperty({index,property:"important"}))
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              className="svg"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M2 9h3v12H2a1 1 0 0 1-1-1V10a1 1 0 0 1 1-1Zm5.293-1.293l6.4-6.4a.5.5 0 0 1 .654-.047l.853.64a1.5 1.5 0 0 1 .553 1.57L14.6 8H21a2 2 0 0 1 2 2v2.104a2 2 0 0 1-.15.762l-3.095 7.515a1 1 0 0 1-.925.619H8a1 1 0 0 1-1-1V8.414a1 1 0 0 1 .293-.707Z"
              ></path>
            </svg>
            Imp
          </div>
          <div
            className="pin important"
            onClick={() => {
              setshowSideMenu(false);
              dispatch(changeProperty({index,property:"pinned"}))
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              className="svg"
              viewBox="0 0 24 24"
            >
              <g
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              >
                <path d="M0 0h24v24H0z"></path>
                <path
                  fill="currentColor"
                  d="m15.113 3.21l.094.083l5.5 5.5a1 1 0 0 1-1.175 1.59l-3.172 3.171l-1.424 3.797a1 1 0 0 1-.158.277l-.07.08l-1.5 1.5a1 1 0 0 1-1.32.082l-.095-.083L9 16.415l-3.793 3.792a1 1 0 0 1-1.497-1.32l.083-.094L7.585 15l-2.792-2.793a1 1 0 0 1-.083-1.32l.083-.094l1.5-1.5a1 1 0 0 1 .258-.187l.098-.042l3.796-1.425l3.171-3.17a1 1 0 0 1 1.497-1.26z"
                ></path>
              </g>
            </svg>
            Pin
          </div>
          <div
            className="pin important"
            onClick={() => {
              setshowSideMenu(false);
              setReadedNoteText({title,description,time});
              ref.readModalRef.current.showModal()
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              className="svg"
              viewBox="0 0 1024 1024"
            >
              <path
                fill="currentColor"
                d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448s448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372s372 166.6 372 372s-166.6 372-372 372zm87.5-334.7c34.8-12.8 78.4-49 78.4-119.2c0-71.2-45.5-131.1-144.2-131.1H378c-4.4 0-8 3.6-8 8v410c0 4.4 3.6 8 8 8h54.5c4.4 0 8-3.6 8-8V561.2h88.7l74.6 159.2c1.3 2.8 4.1 4.6 7.2 4.6h62a7.9 7.9 0 0 0 7.1-11.5l-80.6-164.2zM522 505h-81.5V357h83.4c48 0 80.9 25.3 80.9 75.5c0 46.9-29.8 72.5-82.8 72.5z"
              ></path>
            </svg>{" "}
            Read
          </div>
        </div>
      </div>
      <div className="note_text">
        <div className={`title ${important ? "white" : ""}`}>{title}</div>
        <span className={`description ${important ? "white" : ""}`}>{description}</span>
      </div>
      <div className={`note_dates ${important ? "white" : ""}`}>
        <div>{DateFormatter.format(time)}</div>
        <div
          className="option_dotes center"
          onClick={() =>
            setshowSideMenu((prev) => !prev)
          }
        >
          <div className="options">
            {!showSideMenu ? (
              <img
                src={image}
                alt="Loading..."
                style={{ filter: `invert(${important ? 1 : 0})` }}
              />
            ) : (
              <div className="cross">&times;</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

export default Note;
