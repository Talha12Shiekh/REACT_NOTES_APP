import React, { forwardRef } from "react";
import "../../App.css";
import { useSelector } from "react-redux";

const SearchModal = forwardRef(function SearchModal({setReadedNoteText}, ref) {
  const notes = useSelector((state) => state.notesReducer.notes);


  const handleReadNotes = (key) => {
    const findedNote = notes.find((_,index) => index == key);
    setReadedNoteText({
      title:findedNote.title,
      description:findedNote.description,
      time:findedNote.time
    });
    ref.searchModalRef.current.close();
    ref.readModalRef.current.showModal();
  }

  return (
    <dialog
      className="recover_notes_container"
      id="search_notes_dialog"
      ref={ref.searchModalRef}
    >
      <div className="top_text_container">
        <div>
          <h2>Search notes</h2>
        </div>
        <div className="search_modal_cross" onClick={() => ref.searchModalRef.current.close()}>
          <span>&times;</span>
        </div>
      </div>
      <input
        type="text"
        placeholder="Search Your notes"
        id="filter_notes_input"
      />
      <div className="filter_notes">
        {notes.map((note,index) => {
          return (
            <div key={note.key} className="single_recover_note">
              <div>{note.title}</div>
              <div>
                <button onClick={() => handleReadNotes(index)}>
                  READ
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </dialog>
  );
});

export default SearchModal;
