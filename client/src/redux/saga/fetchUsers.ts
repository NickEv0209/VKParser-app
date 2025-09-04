import { call, put, takeEvery } from "redux-saga/effects";

import { User, UsersActionTypes } from "../reducers/userReducer";

import { getUsers } from "./requests/usersRequests";

function* getUsersSaga() {
  try {
    const response: User[] = yield call(getUsers);
    yield put({
      type: UsersActionTypes.FETCH_USER_SUCCESS,
      payload: response
    });
  } catch (err) {
    yield put({ type: UsersActionTypes.FETCH_USER_ERROR, payload: err });
  }
}

export function* userWatcher() {
  yield takeEvery(UsersActionTypes.FETCH_USER, getUsersSaga)
}
