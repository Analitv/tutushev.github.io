import { LocalDataAction } from './localData'
import { SettingsAction } from './settings'

export type Action =
  | LocalDataAction
  | SettingsAction