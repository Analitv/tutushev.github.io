import { connect } from 'react-redux'
import { Action, Dispatch } from 'redux'

import { RootState } from '../../reducers'
import {
  addItem,
  changeColorList,
  changeItem,
  changeListTitle, deleteItem, deleteList,
  itemToggle,
  reorderItemsInOneList, reorderItemsInOtherList
} from '../../actions/localData'
import { Function1, Function2, Function3, Function4, Function5 } from '../../utils'
import { KeepSpaceComponent } from './KeepSpace'
import { LocalDataState } from '../../model/localData'
import { SettingsState } from '../../model/settings'

type StateProps = {
  localData: LocalDataState
  globalSettings: SettingsState
}

type DispatchProps = {
  reorderItemsInOneList: Function4<string, number, number, string, void>
  reorderItemsInOtherList: Function5<string, string, number, number, string, void>
  changeListTitle: Function2<string, string, void>
  addItem: Function2<string, string, void>
  deleteList: Function1<string, void>
  changeColorList: Function2<string, string, void>
  deleteItem: Function2<string, string, void>
  itemToggle: Function2<string, string, void>
  changeItem: Function3<string, string, string, void>
}

export type KeepSpaceComponentProps = StateProps & DispatchProps

const mapStateToProps = (state: RootState) => ({
  localData: state.localData,
  globalSettings: state.settings,
})

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  changeColorList: (v: string, vv: string) => {
    dispatch(changeColorList(v, vv));
  },
  itemToggle: (v: string, vv: string) => {
    dispatch(itemToggle(v, vv));
  },
  changeItem: (v: string, vv: string, vvv: string) => {
    dispatch(changeItem(v, vv, vvv));
  },
  changeListTitle: (v: string, vv: string) => {
    dispatch(changeListTitle(v, vv));
  },
  reorderItemsInOneList: (v: string, vv: number, vvv: number, vvvv: string) => {
    dispatch(reorderItemsInOneList(v, vv, vvv, vvvv));
  },
  reorderItemsInOtherList: (v: string, vv: string, vvv: number, vvvv: number, vvvvv: string) => {
    dispatch(reorderItemsInOtherList(v, vv, vvv, vvvv, vvvvv));
  },
  addItem: (v: string, vv: string) => {
    dispatch(addItem(v, vv));
  },
  deleteItem: (v: string, vv: string) => {
    dispatch(deleteItem(v, vv));
  },
  deleteList: (v: string) => {
    dispatch(deleteList(v));
  },
});

export const KeepSpace = connect(
  mapStateToProps,
  mapDispatchToProps
)(KeepSpaceComponent)