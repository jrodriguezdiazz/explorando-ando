import {getLatestReviews} from '../api/reviews';
import create from 'zustand';

const useReviewStore = create((set, get) => ({
  reviews: [],
  error: null,
  fetchLatestReviews: async () => {
    try {
      if (get().reviews.length) return;
      const response = await getLatestReviews();
      console.log({response});
      set({
        reviews: response.data.data,
        error: null,
      });
    } catch (error) {
      set((state) => ({
        ...state,
        error: error.message,
      }));
    }
  },
}));

useReviewStore.subscribe(console.log);

export default useReviewStore;
