import userReducer from "./userReducer";
import { baseApi } from "./baseApi";
export const reducer = {
  user: userReducer,

  [baseApi.reducerPath]: baseApi.reducer,
};
