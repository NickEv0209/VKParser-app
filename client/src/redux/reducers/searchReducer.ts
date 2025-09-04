export enum SearchActionTypes {
  SET_SEARCH_QUERY = 'SET_SEARCH_QUERY',
  DEFAULT_SEARCH_QUERY = "DEFAULT_SEARCH_QUERY",
}

interface ActionSearchQuery {
  type: SearchActionTypes.SET_SEARCH_QUERY;
  payload: string
}
interface ActionDefaultQuery {
  type: SearchActionTypes.DEFAULT_SEARCH_QUERY;
}

export type SearchAction = ActionSearchQuery | ActionDefaultQuery


interface SearchState {
  query: string;
}

const initialState: SearchState = {
  query: '',
}

export const searchReducer = (
  state = initialState,
  action: SearchAction
) => {
  switch(action.type) {
    case SearchActionTypes.SET_SEARCH_QUERY: {
      return {
        ...state,
        query: action.payload,
      };
    }
    case SearchActionTypes.DEFAULT_SEARCH_QUERY: {
      return {
        query: '',
      }
    }
    default: {
      return state
    }
  }
}
