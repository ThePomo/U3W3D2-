import { configureStore } from "@reduxjs/toolkit";
import favouriteReducer from "../reducer/reducer";

const store = configureStore({
  reducer: {
    favourites: favouriteReducer,
  },
});

export default store;
