export type LocalDataState = ReadonlyArray<TodoList>

export type TodoList = {
  listId: string
  backgroundColor: string
  textColor: string
  title: string
  listItems: ReadonlyArray<TodoListItem>
}

export type TodoListItem = {
  itemId: string
  content: string
  isFinished: boolean
}

export enum LOCAL_DATA_ACTIONS {
  REORDER_ITEMS_IN_ONE_LIST = 'REORDER_ITEMS_IN_ONE_LIST',
  REORDER_ITEMS_IN_OTHER_LIST = 'REORDER_ITEMS_IN_OTHER_LIST',
  DELETE_LIST = 'DELETE_LIST',
  ADD_LIST = 'ADD_LIST',
  CHANGE_COLOR_LIST = 'CHANGE_COLOR_LIST',
  CHANGE_LIST_TITLE = 'CHANGE_LIST_TITLE',
  ITEM_TOGGLE = 'ITEM_TOGGLE',
  DELETE_ITEM = 'DELETE_ITEM',
  CHANGE_ITEM = 'CHANGE_ITEM',
  ADD_ITEM = 'ADD_ITEM',
}

export type DeleteItemAction =  {
  type: LOCAL_DATA_ACTIONS.DELETE_ITEM,
  payload: {
    listId: string
    itemId: string
  }
}

export type ItemToggleAction =  {
  type: LOCAL_DATA_ACTIONS.ITEM_TOGGLE
  payload: {
    listId: string
    itemId: string
  }
}

export type ChangeItemAction =  {
  type: LOCAL_DATA_ACTIONS.CHANGE_ITEM
  payload: {
    listId: string
    itemId: string
    value: string
  }
}

export type ChangeListTitleAction = {
  type: LOCAL_DATA_ACTIONS.CHANGE_LIST_TITLE
  payload: {
    listId: string
    value: string
  }
}

export type ReorderItemsInOneListAction = {
  type: LOCAL_DATA_ACTIONS.REORDER_ITEMS_IN_ONE_LIST
  payload: {
    s_listId: string
    sourceIndex: number
    destinationIndex: number
    draggableId: string
  }
}

export type ReorderItemsInOtherListAction = {
  type: LOCAL_DATA_ACTIONS.REORDER_ITEMS_IN_OTHER_LIST
  payload: {
    s_listId: string
    d_listId: string
    sourceIndex: number
    destinationIndex: number
    draggableId: string
  }
}

export type AddItemAction = {
  type: LOCAL_DATA_ACTIONS.ADD_ITEM
  payload: {
    listId: string
    value: string
  }
}

export type DeleteListAction = {
  type: LOCAL_DATA_ACTIONS.DELETE_LIST
  payload: {
    listId: string
  }
}

export type AddListAction = {
  type: LOCAL_DATA_ACTIONS.ADD_LIST
  payload: {}
}

export type ChangeColorListAction = {
  type: LOCAL_DATA_ACTIONS.CHANGE_COLOR_LIST
  payload: {
    listId: string
    value: string
  }
}

export type LocalDataAction = DeleteItemAction
  | ItemToggleAction
  | ChangeItemAction
  | ChangeListTitleAction
  | ReorderItemsInOneListAction
  | ReorderItemsInOtherListAction
  | AddItemAction
  | DeleteListAction
  | AddListAction
  | ChangeColorListAction