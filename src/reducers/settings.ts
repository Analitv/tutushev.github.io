import { ChangeFilterAction, SETTINGS, SettingsState } from '../model/settings'

const initialState: SettingsState = {
  filter: '',
}

export function settingsReducer(state: SettingsState = initialState, action: ChangeFilterAction ) {
  const { type, payload } = action

  switch(type) {
    case SETTINGS.CHANGE_FILTER : {
      return { ...state, filter: payload }
    }

    default: {
      return state
    }
  }
}
