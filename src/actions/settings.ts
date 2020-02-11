import { ChangeFilterAction, SETTINGS } from '../model/settings'

export function changeFilter(value: string): ChangeFilterAction {
  return {
    type: SETTINGS.CHANGE_FILTER,
    payload: value
  }
}
