import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import { rootReducer } from "./reducers/rootReducer";
import { rootSaga } from "./saga";

const sagaMiddleWare = createSagaMiddleware();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleWare) =>
    getDefaultMiddleWare({ thunk: false }).concat(sagaMiddleWare),
});

sagaMiddleWare.run(rootSaga);

export type RootState = ReturnType<typeof rootReducer>;
