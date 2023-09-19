import { configureStore } from '@reduxjs/toolkit';
import notesReducer from '../features/counter/NotesSlice'

export const store = configureStore({
    reducer:{
        notesReducer,
    }
})