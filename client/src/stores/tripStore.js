import create from 'zustand';
import {getNextTrips, getTripByCharacteristics, getAllTrips, getTripById as getTripByIdAPI} from '../api/trip';

const useTripStore = create(
  (set, get) => ({
    trips: [],
    nextTrips: [],
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
    getTripById: async (tripId) => {
      return getTripByIdAPI(tripId);
    },
    fetchNextTrips: async () => {
      try {
        if (get().nextTrips.length) return;
        const response = await getNextTrips();
        set((state) => ({
          ...state,
          nextTrips: response.data.data,
          error: null,
        }));
      } catch (error) {
        set((state) => ({
          ...state,
          error: error.message,
        }));
      }
    },
  })
);

useTripStore.subscribe(console.log);

export default useTripStore;
