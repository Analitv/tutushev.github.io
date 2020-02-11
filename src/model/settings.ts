export type SettingsState = {
  filter: string
}

export enum SETTINGS {
  CHANGE_FILTER = 'changeFilter'
}

export type ChangeFilterAction = {
  type: SETTINGS.CHANGE_FILTER
  payload: string
}

export type SettingsAction = ChangeFilterAction