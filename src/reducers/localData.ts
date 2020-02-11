import {
  LOCAL_DATA_ACTIONS,
  LocalDataState,
  LocalDataAction,
  AddItemAction,
  DeleteItemAction,
  ChangeItemAction,
  ItemToggleAction,
  ChangeListTitleAction,
  ChangeColorListAction,
  AddListAction,
  TodoListItem, DeleteListAction, ReorderItemsInOtherListAction, ReorderItemsInOneListAction
} from '../model/localData'
import { localDataInitialState } from './_initialStates'

export function localDataReducer(state: LocalDataState = localDataInitialState, action: LocalDataAction): LocalDataState {
  switch (action.type) {
    case LOCAL_DATA_ACTIONS.REORDER_ITEMS_IN_ONE_LIST: {
      const { payload: { s_listId, destinationIndex, draggableId, sourceIndex } } = action as ReorderItemsInOneListAction;

      return state.map((v) => {
        if (v.listId !== s_listId) return v

        const itemsWithoutDraggableItem = v.listItems.filter((v) => v.itemId !== draggableId )
        const draggableItem = v.listItems.find((v) => v.itemId === draggableId)

        if (!draggableItem) return v

        itemsWithoutDraggableItem.splice(destinationIndex, 0, draggableItem)
        return {
          ...v,
          listItems: itemsWithoutDraggableItem
        }
      })
    }

    case LOCAL_DATA_ACTIONS.REORDER_ITEMS_IN_OTHER_LIST: {
      const { payload: { s_listId, d_listId, destinationIndex, draggableId, sourceIndex } } = action as ReorderItemsInOtherListAction;

      const sourceList = state.find((v) => v.listId === s_listId)
      if (!sourceList) return state

      const draggableItem = sourceList.listItems.find((v) => v.itemId === draggableId)
      if (!draggableItem) return state

      return state.map((v) => {
        if (v.listId === s_listId) {
          return { ...v, listItems: v.listItems.filter((vv) => vv.itemId !== draggableId)}
        }

        if (v.listId === d_listId) {
          const newListItems = [ ...v.listItems ]
          newListItems.splice(destinationIndex, 0, draggableItem)
          return {
            ...v,
            listItems: newListItems
          }
        }

        return v
      })

    }

    case LOCAL_DATA_ACTIONS.DELETE_LIST: {
      const { payload: { listId } } = action as DeleteListAction;
      return state.filter((v) => v.listId !== listId)
    }

    case LOCAL_DATA_ACTIONS.ADD_LIST: {
      const newList = {
        listId: String(Date.now()),
        backgroundColor: "#FFFFFF",
        textColor: "black",
        title: "New list",
        listItems: []
      }

      return [ newList, ...state ]
    }

    case LOCAL_DATA_ACTIONS.CHANGE_COLOR_LIST: {
      const { payload: { listId, value } } = action as ChangeColorListAction;
      return state.map((v) => {
        return v.listId === listId
          ? { ...v, backgroundColor: value }
          : v
      })
    }

    case LOCAL_DATA_ACTIONS.CHANGE_LIST_TITLE: {
      const { payload: { listId, value } } = action as ChangeListTitleAction;
      return state.map((v) => {
        return v.listId === listId
          ? { ...v, title: value }
          : v
      })
    }

    case LOCAL_DATA_ACTIONS.ITEM_TOGGLE: {
      const { payload: { listId, itemId } } = action as ItemToggleAction;
      return state.map((v) => {
        return v.listId === listId
          ? { ...v, listItems: v.listItems.map((vv) => {
              return vv.itemId === itemId ? { ...vv, isFinished: !vv.isFinished } : vv
            })}
          : v
      })
    }

    case LOCAL_DATA_ACTIONS.DELETE_ITEM: {
      const { payload: { listId, itemId} } = action as DeleteItemAction;
      return state.map((v) => {
        return v.listId === listId
          ? { ...v, listItems: v.listItems.filter((vv) => vv.itemId !== itemId) }
          : v
      })
    }

    case LOCAL_DATA_ACTIONS.CHANGE_ITEM: {
      const { payload: { listId, itemId, value } } = action as ChangeItemAction;
      return state.map((v) => {
        return v.listId === listId
          ? { ...v, listItems: v.listItems.map((vv) => {
              return vv.itemId === itemId ? { ...vv, content: value, } : vv
            })}
          : v
      })
    }

    case LOCAL_DATA_ACTIONS.ADD_ITEM: {
      const { payload } = action as AddItemAction;
      return state.map((v) => {
        if (v.listId !== payload.listId) return v

        const listItems = [
          ...v.listItems,
          {
            itemId: String(Date.now()),
            content: payload.value,
            isFinished: false,
          }
        ]
        return { ...v, listItems }
      })
    }

    default: {
      return state
    }

  }
}