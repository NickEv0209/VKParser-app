import { combineReducers } from "redux";

import { productReducer } from "./productReducer";
import { tabReducer } from "./tabReducer";
import { userReducer } from "./userReducer";
import { searchReducer } from "./searchReducer";
import { modalReducer } from "./modalReducer";
import { settingsReducer } from "./settingsReducer";
import { paginationReducer } from "./paginationReducer";
import { loadingReducer } from "./loadingReducer";

export const rootReducer = combineReducers({
  products: productReducer,
  users: userReducer,
  tab: tabReducer,
  search: searchReducer,
  modal: modalReducer,
  setting: settingsReducer,
  Pagination: paginationReducer,
  loading: loadingReducer,
});
