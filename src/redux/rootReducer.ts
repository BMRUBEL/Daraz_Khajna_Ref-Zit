import { baseApi } from "./api/baseApi";
import receiveReducer from "./slices/receiveSlice";

export const reducer = {
  [baseApi.reducerPath]: baseApi.reducer,
  receive: receiveReducer,
};
