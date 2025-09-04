
export enum ModalActionTypes {
  OPEN_MODAL = 'OPEN_MODAL',
  CLOSE_MODAL = 'CLOSE_MODAL',
}

interface Settings {
  pageLink: string;
  messagesCount: number;
  headless: boolean;
}

interface ModalActionOpen {
  type: ModalActionTypes.OPEN_MODAL;
  payload: ModalStateTypes
}
interface ModalActionClose {
  type: ModalActionTypes.CLOSE_MODAL;
}

export type ModalAction = ModalActionOpen | ModalActionClose

interface ModalStateTypes {
  isVisible: boolean;
  title: string;
  text: string;
  btnOk: string;
  btnCancel: string;
  settings: Settings;
}

const initialState: ModalStateTypes = {
  isVisible: false,
  title: '',
  text: '',
  btnOk: '',
  btnCancel: '',
  settings: {
    pageLink: '',
    messagesCount: 1,
    headless: false,
  }
}

export const modalReducer = (
  state = initialState,
  action: ModalAction
) => {
  switch(action.type) {
    case ModalActionTypes.OPEN_MODAL: {
      return {
        ...state,
        isVisible: true,
        title: action.payload.title,
        text: action.payload.text,
        btnOk: action.payload.btnOk,
        btnCancel: action.payload.btnCancel,
        settings: action.payload.settings,
      }
    }
    case ModalActionTypes.CLOSE_MODAL: {
      return {
        ...state,
        isVisible: false,
      }
    }
    default: {
      return state;
    }
  }
}
