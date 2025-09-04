import { all } from "redux-saga/effects";

import { productWatcher } from "./fetchProducts";
import { userWatcher } from "./fetchUsers";

export function* rootSaga() {
  yield all([productWatcher(), userWatcher()]);
}
