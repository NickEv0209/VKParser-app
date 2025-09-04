export enum TabActionTypes {
  TAB_TOGGLE_ALL = 'TAB_TOGGLE_ALL',
  TAB_TOGGLE_CHECKED = 'TAB_TOGGLE_CHECKED',
  TAB_TOGGLE_ACTIVE = 'TAB_TOGGLE_ACTIVE',
}

interface TabActionAll {
  type: TabActionTypes.TAB_TOGGLE_ALL
}
interface TabActionChecked {
  type: TabActionTypes.TAB_TOGGLE_CHECKED
}
interface TabActionActive {
  type: TabActionTypes.TAB_TOGGLE_ACTIVE
}

export type TabAction = TabActionAll | TabActionChecked | TabActionActive

interface TabState {
  all: boolean,
  checked: boolean,
  active: boolean,
}

const initialState: TabState = {
  all: true,
  checked: false,
  active: false,
}

export const tabReducer = (
  state = initialState,
  action: TabAction,
) => {
  switch(action.type) {
    case TabActionTypes.TAB_TOGGLE_ALL: {
      return {
        all: true,
        checked: false,
        active: false,
      }
    }
    case TabActionTypes.TAB_TOGGLE_CHECKED: {
      return {
        all: false,
        checked: true,
        active: false,
      }
    }
    case TabActionTypes.TAB_TOGGLE_ACTIVE: {
      return {
        all: false,
        checked: false,
        active: true,
      }
    }
    default: return state
  }
}
