import create from 'zustand';
import {getTripByCharacteristics} from '../api/trip';

const useTripStore = create((set, get) => ({
  trips: [],
  error: null,
  fetchTripsBySearchBar: async (data) => {
    try {
      if (get().trips.length) return;
      const response = await getTripByCharacteristics(data);
      set({
        trips: response.data.data,
        error: null,
      });
    } catch (error) {
      set((state) => ({
        ...state,
        error: error.message,
      }));
    }
  },
  getTripById: (tripId) => {
    return get().trips.filter(({id}) => id === tripId)[0];
  },
}));

useTripStore.subscribe(console.log);

export default useTripStore;
