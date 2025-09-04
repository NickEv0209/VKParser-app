export enum SettingsActionTypes {
  GET_SETTINGS = 'GET_SETTINGS',
  SET_SETTINGS = 'SET_SETTINGS',
}

export interface Settings {
  pageLink: string;
  messagesCount: number;
  headless: boolean;
}

interface ActionSettingsGet {
  type: SettingsActionTypes.GET_SETTINGS;
}

interface ActionSettingsSet {
  type: SettingsActionTypes.SET_SETTINGS;
  payload: Settings;
}

type ActionSettings = ActionSettingsGet | ActionSettingsSet

const savedSettings = localStorage.getItem('parserSettings');

const initialState: Settings = {
  pageLink: savedSettings ? JSON.parse(savedSettings).pageLink : 'https://vk.com/al_im.php?sel=c13',
  messagesCount: savedSettings ? JSON.parse(savedSettings).messagesCount : 10,
  headless: savedSettings ? JSON.parse(savedSettings).headless : false,
}

export const settingsReducer = (
  state = initialState,
  action: ActionSettings,
) => {
  switch(action.type) {
    case SettingsActionTypes.GET_SETTINGS: {
      console.log(state)
      return {
        ...state,
      };

    }
    case SettingsActionTypes.SET_SETTINGS: {
      return {
        pageLink: action.payload.pageLink,
        messagesCount: action.payload.messagesCount,
        headless: action.payload.headless,
      };
    }
    default: {
      return state;
    }
  }
};
