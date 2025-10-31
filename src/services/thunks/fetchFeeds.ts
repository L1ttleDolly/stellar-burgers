import { createAsyncThunk } from '@reduxjs/toolkit';
import { getFeedsApi } from '@api';

export const fetchFeeds = createAsyncThunk(
  'feeds/fetchFeeds',
  async function () {
    try {
      return await getFeedsApi();
    } catch (error) {
      throw error;
    }
  }
);
