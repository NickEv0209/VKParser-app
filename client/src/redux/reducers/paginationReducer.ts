interface PaginationState {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
}

const initialState: PaginationState = {
  currentPage: 1,
  itemsPerPage: 30,
  totalItems: 0,
};

export enum PaginationActionTypes {
  SET_CURRENT_PAGE = "SET_CURRENT_PAGE",
  SET_TOTAL_ITEMS = "SET_TOTAL_ITEMS",
  SET_ITEMS_PER_PAGE = "SET_ITEMS_PER_PAGE",
  RESET_PAGINATION = "RESET_PAGINATION",
}

interface SetCurrentPageAction {
  type: PaginationActionTypes.SET_CURRENT_PAGE;
  payload: number;
}

interface SetTotalItemsAction {
  type: PaginationActionTypes.SET_TOTAL_ITEMS;
  payload: number;
}

interface SetItemPerPageAction {
  type: PaginationActionTypes.SET_ITEMS_PER_PAGE;
  payload: number;
}

interface ResetPaginationAction {
  type: PaginationActionTypes.RESET_PAGINATION;
}

export type PaginationActions =
  | SetCurrentPageAction
  | SetTotalItemsAction
  | ResetPaginationAction
  | SetItemPerPageAction;

export const paginationReducer = (
  state = initialState,
  action: PaginationActions
): PaginationState => {
  switch (action.type) {
    case PaginationActionTypes.SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };
    case PaginationActionTypes.SET_TOTAL_ITEMS:
      return {
        ...state,
        totalItems: action.payload,
      };
    case PaginationActionTypes.SET_ITEMS_PER_PAGE:
      return {
        ...state,
        itemsPerPage: action.payload,
      };
    case PaginationActionTypes.RESET_PAGINATION:
      return initialState;
    default:
      return state;
  }
};

// Actions
export const setCurrentPage = (page: number): SetCurrentPageAction => ({
  type: PaginationActionTypes.SET_CURRENT_PAGE,
  payload: page,
});

export const setTotalItems = (total: number): SetTotalItemsAction => ({
  type: PaginationActionTypes.SET_TOTAL_ITEMS,
  payload: total,
});

export const resetPagination = (): ResetPaginationAction => ({
  type: PaginationActionTypes.RESET_PAGINATION,
});
