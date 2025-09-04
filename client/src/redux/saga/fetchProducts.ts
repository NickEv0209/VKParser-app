import { call, put, takeEvery, takeLatest } from "redux-saga/effects";

import { Product, ProductsActionTypes } from "../reducers/productReducer";

import { getProducts, } from "./requests/productsRequest";

function* getProductsSaga() {
  try {
    const response: Product[] = yield call(getProducts);
    yield put({
      type: ProductsActionTypes.FETCH_PRODUCT_SUCCESS,
      payload: response,
    });
  } catch (err) {
    yield put({ type: ProductsActionTypes.FETCH_PRODUCT_ERROR, payload: err });
  }
}


interface ToggleProductPayload {
  type: ProductsActionTypes.PRODUCT_TOGGLE_ACTIVE;
  payload: Product;
}

// function* handleProductToggleActive(action: ToggleProductPayload) {
//   try {
//     const { payload: product } = action;
//     yield call(patchProduct, product);

//   } catch (error) {
//     console.error("Ошибка при обновлении состояния продукта:", error);
//   }
// }

function handleProductToggleActive(action: ToggleProductPayload) {
  try {
    const { payload: product } = action;

    // Получаем текущий массив товаров из localStorage
    const products: Product[] = JSON.parse(localStorage.getItem('products') || '[]');

    // Обновляем нужный продукт в массиве
    const updatedProducts = products.map((p) =>
      p.id === product.id ? { ...p, isChecked: !p.isChecked } : p
    );

    // Сохраняем обновлённый массив обратно в localStorage
    localStorage.setItem('products', JSON.stringify(updatedProducts));

  } catch (error) {
    console.error("Ошибка при обновлении состояния продукта:", error);
  }
}

export function* productWatcher() {
  yield takeEvery(ProductsActionTypes.FETCH_PRODUCT, getProductsSaga)
  yield takeLatest(ProductsActionTypes.PRODUCT_TOGGLE_ACTIVE, handleProductToggleActive);
}
