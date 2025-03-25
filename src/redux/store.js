import {configureStore} from '@reduxjs/toolkit';
import newsReducer from './newsSlice';
import filterReducer from './filterSlice'; // Optional for filters

export const store = configureStore({
  reducer: {
    news: newsReducer, // Fetch and store news
    filters: filterReducer, // Handle filters (optional)
  },
});
