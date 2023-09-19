import { createSlice } from "@reduxjs/toolkit";

const getNotes = () => {
    let localNotes = localStorage.getItem("notes");
    if(localNotes){
        return JSON.parse(localNotes)
    }else{
        return []
    }
}
const getRecoverNotes = () => {
    let localRecoverNotes = localStorage.getItem("recoverNotes");
    if(localRecoverNotes){
        return JSON.parse(localRecoverNotes)
    }else{
        return []
    }
}

export const NotesSlice = createSlice({
  name: "notes",
  initialState: {notes:getNotes(),recoverNotes:getRecoverNotes()},
  reducers: {
    addNotes: (state, { payload }) => {
      state.notes.push(payload);
    },
    deleteNotes: (state, { payload }) => {
      const deleted = state.notes.splice(payload, 1);
      deleted.map(item => state.recoverNotes.push(item))
    },
    changeProperty: (state, { payload }) => {
      state.notes[payload.index][payload.property] =
        !state.notes[payload.index][payload.property];
    },
    editeNote: (state, { payload }) => {
      state.notes[payload.index] = {
        title: payload.title,
        description: payload.description,
        time: payload.time,
      };
    },
    deleteRecoverNotes:(state,{payload}) => {
        state.recoverNotes.splice(payload.key,1)
    },
    clearNotes:(state,action) => {
        return { notes : [], recoverNotes: []}
    },
    searchRecoverNotes:(state,{payload}) => {
        return {...state,recoverNotes:payload}
    }
  },
});

export const { addNotes, deleteNotes, changeProperty, editeNote,deleteRecoverNotes,clearNotes,searchRecoverNotes } =
  NotesSlice.actions;

export default NotesSlice.reducer;
