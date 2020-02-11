import { combineReducers } from "redux";
import { History } from "history";

import { localDataReducer } from './localData'
import { settingsReducer} from './settings'
import { LocalDataState } from '../model/localData'
import { SettingsState } from '../model/settings'

export interface RootState {
  localData: LocalDataState;
  settings: SettingsState;
}

export default (history: History) =>
  combineReducers({
    localData: localDataReducer,
    settings: settingsReducer,
  });
