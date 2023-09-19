import React, { forwardRef } from "react";
import "../../App.css";
import { useDispatch, useSelector } from "react-redux";
import { clearNotes } from "./NotesSlice";

const ClearNotes = forwardRef(function ClearNotes(props,ref) {
  const dispatch = useDispatch();
  const notes = useSelector(state => state.notesReducer.notes);
  return (
    <dialog className="clear_notes_modal" ref={ref}>
      <div className="cross_container center">&times;</div>
      <h3>Are you sure ?</h3>
      <div className="clear_closing_cross" onClick={() => ref.current.close()}>&times;</div>
      <div className="confirmation_text">
        Do you really want to delete all notes ? This process cannot be undone
      </div>
      <div className="btns_container">
        <button className="clear_container_cancel_btn" onClick={() => ref.current.close()}>Cancel</button>
        <button disabled={notes.length == 0} className="clear_btn" onClick={() => {dispatch(clearNotes());ref.current.close()}}>Clear</button>
      </div>
    </dialog>
  );
});

export default ClearNotes;
