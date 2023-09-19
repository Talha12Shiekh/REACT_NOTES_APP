import React, { forwardRef ,useState,useMemo} from "react";
import "../../App.css";
import { useSelector } from "react-redux";

const SearchModal = forwardRef(function SearchModal({setReadedNoteText}, ref) {
  const notes = useSelector((state) => state.notesReducer.notes);
  const [query,setquery] = useState("");


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

  const filteredNotes = useMemo(() => {
    return notes.filter(note => {
      return note.title.toLowerCase().includes(query.toLowerCase())
    })
  },[notes,query])

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
        value={query}
        onChange={e => setquery(e.target.value)}
      />
      <div className="filter_notes">
        {filteredNotes.length !== 0 ? filteredNotes.map((note,index) => {
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
        }) : <div style={{fontSize:"1rem"}}>No Items matches your search</div>}
      </div>
    </dialog>
  );
});

export default SearchModal;
