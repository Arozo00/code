import { configureStore } from "@reduxjs/toolkit";
import trendReducer from "./Reducer/trendReducer";
import detailReducer from "./Reducer/detailReducer";
import searchReducer from "./Reducer/searchReducer";
import listReducer from "./Reducer/listReducer";
import stateReducer from "./Reducer/stateReducer";

const store = configureStore({
  reducer: {
    // theme: themeReducer,
    trend: trendReducer,
    detail: detailReducer,
    search: searchReducer,
    list: listReducer,
    itemState: stateReducer,
  },
});
export default store;
