import { createAsyncThunk } from '@reduxjs/toolkit';
import { getFeedsApi } from '@api';

export const fetchFeeds = createAsyncThunk(
  'feeds/fetchFeeds',
  async function () {
    return await getFeedsApi();
  }
);
