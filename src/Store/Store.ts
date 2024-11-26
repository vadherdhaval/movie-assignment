import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "./Movies/MoviesSlice";

const store = configureStore({
  reducer: {
    MOVIES: moviesReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export default store;