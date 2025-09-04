export enum ProductsActionTypes {
  FETCH_PRODUCT = "FETCH_PRODUCT",
  FETCH_PRODUCT_SUCCESS = "FETCH_PRODUCT_SUCCESS",
  FETCH_PRODUCT_ERROR = "FETCH_PRODUCT_ERROR",
  PRODUCT_TOGGLE_ACTIVE = 'PRODUCT_TOGGLE_ACTIVE',
}

export interface Product {
  id: number;
  title: string;
  link: string;
  image: string;
  isChecked: boolean;
  user: {
    id: number;
    name: string;
    link: string;
    avatar: string;
  };
}

interface ActionProductFetch {
  type: ProductsActionTypes.FETCH_PRODUCT;
}

interface ActionProductSuccess {
  type: ProductsActionTypes.FETCH_PRODUCT_SUCCESS;
  payload: Product[];
}

interface ActionProductError {
  type: ProductsActionTypes.FETCH_PRODUCT_ERROR;
  payload: string | null;
}

interface ActionProductToggleActive {
  type: ProductsActionTypes.PRODUCT_TOGGLE_ACTIVE,
  payload: Product,
}

export type ProductActions =
  | ActionProductFetch
  | ActionProductSuccess
  | ActionProductError
  | ActionProductToggleActive


  interface ProductStateTypes {
    isError: string | null,
    isLoading: boolean,
    products: Product[],
    checkedProducts: Product[]
  }

const initialState: ProductStateTypes = {
  isError: null,
  isLoading: false,
  products: [],
  checkedProducts: []
};

export const productReducer = (
  state = initialState,
  action: ProductActions
) => {
  switch (action.type) {
    case ProductsActionTypes.FETCH_PRODUCT: {
      return {
        isError: null,
        isLoading: true,
        products: [],
      };
    }
    case ProductsActionTypes.FETCH_PRODUCT_SUCCESS: {
      return {
        isError: null,
        isLoading: false,
        products: action.payload,
      };
    }
    case ProductsActionTypes.FETCH_PRODUCT_ERROR: {
      return {
        isError: action.payload,
        isLoading: false,
        products: [],
      };
    }
    case ProductsActionTypes.PRODUCT_TOGGLE_ACTIVE: {
      const updatedProducts = state.products.map(product =>
        product.id === action.payload.id
          ? { ...product, isChecked: !product.isChecked }
          : product
      );

      const checkedProducts = updatedProducts.filter(product => product.isChecked);

      return {
        ...state,
        products: updatedProducts,
        checkedProducts,
      };
    }
    default: {
      return state;
    }
  }
};
