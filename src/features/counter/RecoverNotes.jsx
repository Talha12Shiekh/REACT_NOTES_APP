import React, { useEffect, useRef, useState } from "react";
import "../../App.css";
import { useDispatch, useSelector } from "react-redux";
import { addNotes, deleteRecoverNotes, searchRecoverNotes } from "./NotesSlice";

const RecoverNotes = () => {
  const RecoverModalRef = useRef(null);
  const [recoverInputValue,setrecoverInputValue] = useState("");
  const recoverNotes = useSelector((state) => state.notesReducer.recoverNotes);
  const dispatch = useDispatch();


  const handleRecoverNotes = (key) => {
    const recoveredNote = recoverNotes.find((_,index) => index == key)
    dispatch(addNotes(recoveredNote));
    dispatch(deleteRecoverNotes(key))
    RecoverModalRef.current.close()
  }

  useEffect(() => {
    localStorage.setItem("recoverNotes",JSON.stringify(recoverNotes));
  },[recoverNotes]);

  const handleFilterRecoverNotes = (e) => {
    setrecoverInputValue(e.target.value);
  }

  return (
    <div className="recover_notes">
      <dialog className="recover_notes_container" ref={RecoverModalRef}>
        <div className="top_text_container">
          <div>
            <h2>Recover notes</h2>
          </div>
          <div
            className="recover_modal_cross"
            onClick={() => RecoverModalRef.current.close()}
          >
            <span>&times;</span>
          </div>
        </div>
        <input type="text" value={recoverInputValue} onChange={handleFilterRecoverNotes} placeholder="Search Your notes" />
        {/* container to map the recover notes */}
        <div className="recover_notes" id="recover_items_container">
          {recoverNotes.length !== 0 && recoverNotes.map((note,index) => {
            return (
              <div key={note.key} className="single_recover_note">
                <div>{note.title}</div>
                <div>
                  <button onClick={() => handleRecoverNotes(index)}>RECOVER</button>
                </div>
              </div>
            );
          })}
        </div>
        {/*  */}
      </dialog>
      <button
        disabled={recoverNotes.length == 0}
        className="recover_btn"
        onClick={() => RecoverModalRef.current.showModal()}
      >
        RECOVER NOTES
      </button>
    </div>
  );
};

export default RecoverNotes;
