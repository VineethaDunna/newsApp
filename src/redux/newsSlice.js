import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

// Async Thunk to Fetch News Data
export const fetchNews = createAsyncThunk('news/fetchNews', async () => {
  const urls = [
    'https://content.guardianapis.com/search?api-key=93db34eb-3dba-4c4f-8c68-4ca0dc5d30f7',
    'https://gnews.io/api/v4/top-headlines?token=345ea6bb2d2ab572b8b4d559b6c9fc8f',
  ];

  const [guardian, gnews] = await Promise.all(urls.map(url => axios.get(url)));

  // Format Guardian Data
  const guardianData = guardian.data.response.results.map((item, index) => ({
    id: `guardian-${index}`,
    title: item.webTitle || 'No Title',
    description: item.description || 'Latest updates',
    imageUrl: 'https://m.media-amazon.com/images/I/31wkyNnzwIL.jpg',
    websiteUrl: item.webUrl,
    publishedDate: item.webPublicationDate,
    source: 'The Guardian',
  }));

  // Format GNews Data
  const gnewsData = gnews.data.articles.map((item, index) => ({
    id: `gnews-${index}`,
    title: item.title,
    description: item.description || 'No description available',
    imageUrl: item.image || 'https://via.placeholder.com/300',
    websiteUrl: item.url,
    publishedDate: item.publishedAt,
    source: item.source.name,
  }));

  // Combine all data
  return [...gnewsData, ...guardianData];
});

const newsSlice = createSlice({
  name: 'news',
  initialState: {
    articles: [],
    status: 'idle', // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {},

  extraReducers: builder => {
    builder
      .addCase(fetchNews.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.articles = action.payload;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default newsSlice.reducer;
