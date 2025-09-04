export enum LoadingActionTypes {
  LOADING_ACTIVE = 'LOADING_ACTIVE',
  LOADING_DISABLE = 'LOADING_DISABLE',
}

interface LoadingStateTypes {
  isLoading: boolean;
}

const initialState: LoadingStateTypes = {
  isLoading: false
}

interface LoadingActiveAction {
  type: LoadingActionTypes.LOADING_ACTIVE
}
interface LoadingDisableAction {
  type: LoadingActionTypes.LOADING_DISABLE
}

export type LoadingAction = LoadingActiveAction | LoadingDisableAction

export const loadingReducer = (
  state = initialState,
  action: LoadingAction,
) => {
  switch(action.type) {
    case LoadingActionTypes.LOADING_ACTIVE: {
      return {
        isLoading: true
      }
    }
    case LoadingActionTypes.LOADING_DISABLE: {
      return {
        isLoading: false
      }
    }
    default: {
      return state;
    }
  }
}
