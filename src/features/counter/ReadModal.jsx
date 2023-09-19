import React, { forwardRef } from 'react';
import "../../App.css"

const ReadModal = forwardRef(function ReadModal({readedNoteText},ref) {
  let DateFormatter = new Intl.DateTimeFormat("en-us", {
    month: "long",
    day: "2-digit",
    year: "2-digit",
  });
  return (
    <dialog className="content_modal" ref={ref}>
      <div className="top_content_modal">
        <div className="close_content_modal" onClick={() => ref.current.close()}>&times;</div>
      </div>
      <div className="note_dates">{DateFormatter.format(readedNoteText.time)}</div>
      <h1 className="notes_text">{readedNoteText.title}</h1>
      <p className="note_description">{readedNoteText.description}</p>
    </dialog>
  )
})

export default ReadModal